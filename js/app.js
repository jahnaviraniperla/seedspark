/**
 * AgriDirect - Global Application Utilities & Header Controller
 */

const AgriApp = {
  init() {
    this.renderHeader();
    this.updateCartBadge();
    this.setupEventListeners();
    this.setupToastContainer();
  },

  // Setup toast notifications container
  setupToastContainer() {
    if (!document.getElementById('toastContainer')) {
      const container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
  },

  // Show Toast Message
  showToast(message, type = 'success', duration = 3500) {
    this.setupToastContainer();
    const container = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    
    let icon = '✅';
    if (type === 'error') icon = '⚠️';
    if (type === 'info') icon = 'ℹ️';

    toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // Update Cart Badge Counter
  updateCartBadge() {
    const summary = AgriData.getCartSummary();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
      b.textContent = summary.uniqueItemCount;
      b.style.display = summary.uniqueItemCount > 0 ? 'flex' : 'none';
    });
  },

  // Update Header UI based on User Login Status
  renderHeader() {
    const user = AgriAuth.getCurrentUser();
    const userMenuContainer = document.getElementById('headerUserMenu');
    
    if (userMenuContainer) {
      if (user) {
        const isFarmer = user.role === 'farmer';
        userMenuContainer.innerHTML = `
          <div class="user-profile-menu">
            <button class="user-badge-btn" id="userMenuBtn" onclick="AgriApp.toggleUserDropdown()">
              <span class="user-avatar-mini">${user.name.charAt(0).toUpperCase()}</span>
              <span>${user.name.split(' ')[0]} (${isFarmer ? '🌾 Farmer' : '🛒 Buyer'})</span>
              <span>▾</span>
            </button>
            <div id="userDropdownPanel" style="display:none; position:absolute; right:0; top:110%; background:white; border-radius:10px; box-shadow:0 10px 25px rgba(0,0,0,0.15); border:1px solid #e2e8e0; min-width:200px; z-index:1100; padding:0.5rem 0;">
              ${isFarmer ? `
                <a href="farmer-dashboard.html" class="nav-link" style="padding:0.6rem 1rem; display:block;">🌾 <span data-i18n="nav_dashboard">${t('nav_dashboard')}</span></a>
              ` : `
                <a href="orders.html" class="nav-link" style="padding:0.6rem 1rem; display:block;">📦 <span data-i18n="nav_my_orders">${t('nav_my_orders')}</span></a>
              `}
              <div style="height:1px; background:#eef2ec; margin:0.3rem 0;"></div>
              <a href="javascript:void(0)" onclick="AgriAuth.logout()" class="nav-link" style="padding:0.6rem 1rem; display:block; color:#d90429;">🚪 <span data-i18n="nav_logout">${t('nav_logout')}</span></a>
            </div>
          </div>
        `;
      } else {
        userMenuContainer.innerHTML = `
          <a href="auth.html" class="btn btn-sm btn-primary">
            <span>👤</span> <span data-i18n="nav_login">${t('nav_login')}</span>
          </a>
        `;
      }
    }
  },

  toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdownPanel');
    if (dropdown) {
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
  },

  // Setup Global Listeners
  setupEventListeners() {
    // Language dropdown change
    const langSelect = document.getElementById('globalLanguageSelect');
    if (langSelect) {
      langSelect.value = currentLang;
      langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
      });
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileToggle && mainNav) {
      mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('show-mobile-nav');
      });
    }

    // Close user dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const userBtn = document.getElementById('userMenuBtn');
      const userPanel = document.getElementById('userDropdownPanel');
      if (userBtn && userPanel && !userBtn.contains(e.target) && !userPanel.contains(e.target)) {
        userPanel.style.display = 'none';
      }
    });

    // Listen for cart changes
    window.addEventListener('cartUpdated', () => {
      this.updateCartBadge();
    });

    // Listen for auth changes
    window.addEventListener('authChanged', () => {
      this.renderHeader();
    });

    // Listen for language changes
    window.addEventListener('languageChanged', () => {
      this.renderHeader();
    });
  }
};

// Initialize App on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  AgriApp.init();
});
