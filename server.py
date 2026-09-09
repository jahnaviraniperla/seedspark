"""
AgriDirect Application & AI Assistant Backend Server
Serves static assets and provides secure API endpoints for AgriDirect AI Assistant.
Zero external dependencies (uses standard Python 3.14 libraries).
"""

import os
import sys
import json
import time
import re
import urllib.parse
from collections import defaultdict
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Ensure UTF-8 output encoding for Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Add current directory to path so api.ai_provider can be imported
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from api.ai_provider import AIProviderManager

PORT = int(os.environ.get("PORT", 8000))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

ai_manager = AIProviderManager()

# Rate limiting: 30 requests per 60 seconds per IP
RATE_LIMIT_WINDOW = 60.0
RATE_LIMIT_MAX_REQUESTS = 30
_rate_limit_records = defaultdict(list)


def is_rate_limited(client_ip: str) -> bool:
    """Returns True if the client IP has exceeded the allowed request threshold."""
    now = time.time()
    window_start = now - RATE_LIMIT_WINDOW
    timestamps = [t for t in _rate_limit_records[client_ip] if t > window_start]
    if len(timestamps) >= RATE_LIMIT_MAX_REQUESTS:
        _rate_limit_records[client_ip] = timestamps
        return True
    timestamps.append(now)
    _rate_limit_records[client_ip] = timestamps
    return False


def clean_str(val, max_len=50) -> str:
    """Sanitize strings by stripping HTML/control characters and truncating."""
    if not isinstance(val, str):
        return ""
    cleaned = re.sub(r'[\x00-\x1f\x7f<>]', '', val).strip()
    return cleaned[:max_len]


class AgriDirectServerHandler(SimpleHTTPRequestHandler):
    """Custom HTTP handler serving static files and AgriDirect AI endpoints."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def _is_origin_allowed(self, origin: str) -> bool:
        """Validate whether the Origin header comes from an authorized host."""
        if not origin:
            return True
        try:
            parsed = urllib.parse.urlparse(origin)
            host = (parsed.hostname or "").lower()
            server_host = (self.headers.get("Host", "").split(":")[0] or "").lower()
            return host in ("localhost", "127.0.0.1", "::1", server_host)
        except Exception:
            return False

    def _set_cors_headers(self):
        """Set origin-validated CORS headers. Never outputs permissive wildcard *."""
        origin = self.headers.get("Origin")
        if origin and self._is_origin_allowed(origin):
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def do_OPTIONS(self):
        """Preflight handler with strict origin verification."""
        origin = self.headers.get("Origin")
        if origin and not self._is_origin_allowed(origin):
            self.send_error(403, "Forbidden Origin")
            return
        self.send_response(204)
        self._set_cors_headers()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # Health check endpoint
        if parsed.path == "/api/health":
            health_data = {
                "status": "healthy",
                "app": "AgriDirect",
                "ai_assistant": "active",
                "ai_configured": ai_manager.is_ai_configured(),
                "provider": ai_manager.get_provider_name(),
                "supported_languages_count": 23
            }
            health_bytes = json.dumps(health_data).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(health_bytes)))
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(health_bytes)
            return

        # Default static file handling
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # AI Chat endpoint
        if parsed.path == "/api/chat":
            client_ip = self.client_address[0] if self.client_address else "127.0.0.1"

            # 1. IP-based Rate Limiting Protection
            if is_rate_limited(client_ip):
                self._send_json_error(
                    429,
                    "Rate limit exceeded. Please wait a moment before sending another message.",
                    extra_headers={"Retry-After": "60"}
                )
                return

            try:
                # 2. Request payload safety limit (max 64 KB)
                content_length = int(self.headers.get("Content-Length", 0))
                if content_length > 65536:
                    self._send_json_error(413, "Request payload exceeds safety limits (max 64KB).")
                    return

                raw_body = self.rfile.read(content_length).decode("utf-8")
                try:
                    data = json.loads(raw_body) if raw_body else {}
                except json.JSONDecodeError:
                    self._send_json_error(400, "Invalid JSON payload.")
                    return

                # 3. Input Validation and Sanitization
                raw_message = data.get("message", "")
                if not isinstance(raw_message, str) or not raw_message.strip():
                    self._send_json_error(400, "Message cannot be empty.")
                    return

                # Strip dangerous control characters and enforce 1000 char maximum
                user_message = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', raw_message).strip()[:1000]
                if not user_message:
                    self._send_json_error(400, "Message contains only invalid control characters.")
                    return

                # Validate language code
                language = data.get("language", "en")
                if not isinstance(language, str) or not re.match(r'^[a-z]{2,5}$', language):
                    language = "en"

                # Sanitize page context
                page_context = clean_str(data.get("pageContext", ""), 40)

                # 4. Strict User Context Sanitization & Authorization
                # Enforce strict role enumeration (farmer / consumer) and scrub sensitive fields
                user_context = None
                raw_ctx = data.get("userContext")
                if isinstance(raw_ctx, dict):
                    raw_role = str(raw_ctx.get("role", "consumer")).lower()
                    validated_role = "farmer" if raw_role == "farmer" else "consumer"
                    user_context = {
                        "id": clean_str(raw_ctx.get("id"), 30),
                        "name": clean_str(raw_ctx.get("name"), 50),
                        "role": validated_role,
                        "farmName": clean_str(raw_ctx.get("farmName"), 60),
                        "location": clean_str(raw_ctx.get("location"), 60)
                    }

                # 5. Sanitize conversation history
                history = []
                raw_history = data.get("history", [])
                if isinstance(raw_history, list):
                    for h in raw_history[-6:]:
                        if isinstance(h, dict) and "role" in h and "content" in h:
                            role = "user" if h.get("role") == "user" else "assistant"
                            content = clean_str(h.get("content", ""), 500)
                            history.append({"role": role, "content": content})

                # 6. Generate AI response via provider manager
                reply = ai_manager.generate(
                    user_query=user_message,
                    language_code=language,
                    page_context=page_context,
                    user_context=user_context,
                    history=history
                )

                res_payload = {
                    "success": True,
                    "response": reply,
                    "language": language,
                    "provider": ai_manager.get_provider_name()
                }
                res_bytes = json.dumps(res_payload, ensure_ascii=False).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(res_bytes)))
                self._set_cors_headers()
                self.end_headers()
                self.wfile.write(res_bytes)

            except Exception:
                # Do NOT expose internal traceback, keys, or stack details to the client
                self._send_json_error(500, "AgriDirect AI is temporarily unavailable. Please try again.")
            return

        self._send_json_error(404, "Endpoint not found.")

    def _send_json_error(self, code: int, message: str, extra_headers: dict = None):
        """Send safe JSON error payload without leaking internal information."""
        err_bytes = json.dumps({"success": False, "error": message}, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(err_bytes)))
        self._set_cors_headers()
        if extra_headers:
            for k, v in extra_headers.items():
                self.send_header(k, v)
        self.end_headers()
        self.wfile.write(err_bytes)


def run_server(port=PORT):
    server_address = ("", port)
    httpd = HTTPServer(server_address, AgriDirectServerHandler)
    print(f"==================================================")
    print(f"  [AgriDirect Server & AI Assistant Running]")
    print(f"  URL: http://localhost:{port}/")
    print(f"  AI Provider: {ai_manager.get_provider_name()}")
    print(f"  AI Key Configured: {ai_manager.is_ai_configured()}")
    print(f"==================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping AgriDirect Server.")
        httpd.server_close()


if __name__ == "__main__":
    run_server()
