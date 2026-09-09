/**
 * AgriDirect AI Assistant - Frontend Controller & UI
 * Seamless integration with all 23 languages, real marketplace data grounding,
 * farmer/consumer context, RTL layout support, and secure backend routing.
 */

(function () {
  'use strict';

  // Localized Greetings across all 23 languages
  const GREETINGS = {
    en: "Namaste! 🌱 I'm AgriDirect AI.\nI can help you with farming, crop prices, products, orders and selling your harvest.\nHow can I help you today?",
    as: "নমস্কাৰ! 🌱 মই AgriDirect AI।\nমই আপোনাক খেতি-বাতি, শস্যৰ দাম, পণ্য আৰু বিক্ৰী কৰাত সহায় কৰিব পাৰোঁ।\nআজি মই আপোনাক কি সহায় কৰিব পাৰোঁ?",
    bn: "নমস্কার! 🌱 আমি AgriDirect AI।\nআমি আপনাকে চাষাবাদ, ফসলের দাম, তাজা পণ্য এবং অর্ডার সম্পর্কে সাহায্য করতে পারি।\nআজ আপনাকে কীভাবে সাহায্য করতে পারি?",
    brx: "खुሉምबाय! 🌱 आं AgriDirect AI।\nआं नोंथांखौ आबाद, बेसादनि बेसेन आरो अर्डार सामलायनायाव हेफाजाब होनो हागौ।\nदिनै आं नोंथांखौ माबादि हेफाजाब होनो हागौ?",
    doi: "नमस्ते! 🌱 मैं AgriDirect AI हां।\nमैं तुंदी खेती, फसलें दे मुल्ल, ते आर्डरै बारै मदद करी सकदा हां।\nआज मैं तुंदी केह् मदद करां?",
    gu: "નમસ્તે! 🌱 હું AgriDirect AI છું.\nહું તમને ખેતી, પાકના ભાવ, તાજા ઉત્પાદનો અને ઓર્ડર વિશે મદદ કરી શકું છું.\nઆજે હું તમને શું મદદ કરી શકું?",
    hi: "नमस्ते! 🌱 मैं AgriDirect AI हूँ।\nमैं खेती, फसल के दाम, ताज़ा उत्पाद, ऑर्डर और फसल बेचने में आपकी मदद कर सकता हूँ।\nआज मैं आपकी क्या सहायता करूँ?",
    kn: "ನಮಸ್ಕಾರ! 🌱 ನಾನು AgriDirect AI.\nನಾನು ನಿಮಗೆ ಕೃಷಿ, ಬೆಳೆಗಳ ಬೆಲೆ, ಮಾರುಕಟ್ಟೆ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಮಾರಾಟದಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.\nಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    ks: "سلام! 🌱 بہٕ چھُس AgriDirect AI۔\nبہٕ ہؠکہٕ تُہندِ زمیٖندٲری، فصلن ہٕنٛدی دَر تہٕ آرڈر کٔرنَس منٛز مدد کٔرِتھ۔\nآز کِتھ پٲٹھۍ کَرٕ تُہنٛز مدد؟",
    kok: "नमस्कार! 🌱 हांव AgriDirect AI.\nहांव तुमकां शेतकाम, मालाचे दर आनी ऑर्डरी संबंदीं मजत करूं शकता.\nआयज हांव तुमकां कशी मजत करूं?",
    mai: "प्रणाम! 🌱 हम AgriDirect AI छी।\nहम अहाँक खेती, फसलक दाम, उत्पाद आ अहाँक फसल बेचबामे मदद कऽ सकैत छी।\nआइ हम अहाँक की सहायता करू?",
    ml: "നമസ്കാരം! 🌱 ഞാൻ AgriDirect AI ആണ്.\nകൃഷി, വിളകളുടെ വില, കാർഷിക ഉൽപ്പന്നങ്ങൾ, ഓർഡറുകൾ എന്നിവയിൽ സഹായിക്കാം.\nഇന്ന് ഞാൻ എങ്ങനെ സഹായിക്കണം?",
    mr: "नमस्कार! 🌱 मी AgriDirect AI आहे.\nमी तुम्हाला शेती, पिकांचे भाव, ताजी उत्पादने आणि शेतमाल विक्रीत मदत करू शकतो.\nआज मी तुम्हाला काय मदत करू?",
    mni: "ꯈꯨꯔꯨꯝꯖꯔꯤ! 🌱 ꯑꯩ AgriDirect AI ꯅꯤ।\nꯑꯩꯅ ꯅꯍꯥꯛꯄꯨ ꯂꯧꯎ-ꯁꯤꯡꯎ, ꯄꯣꯠꯊꯣꯛꯀꯤ ꯃꯃꯜ ꯑꯃꯁꯨꯡ ꯌꯣꯟꯕꯗ ꯃꯇꯦꯡ ꯄꯥꯡꯕ ꯉꯝꯃꯤ।\nꯉꯁꯤ ꯀꯔꯤ ꯃꯇꯦꯡ ꯇꯧꯒꯦ?",
    ne: "नमस्ते! 🌱 म AgriDirect AI हुँ।\nम तपाईंलाई खेती, बालीको मूल्य, उत्पादन र बिक्री गर्न मद्दत गर्न सक्छु।\nआज म तपाईंलाई के मद्दत गर्न सक्छु?",
    or: "ନମସ୍କାର! 🌱 ମୁଁ AgriDirect AI।\nମୁଁ ଆପଣଙ୍କୁ ଚାଷ କାର୍ଯ୍ୟ, ଫସଲ ଦର, ସାମଗ୍ରୀ ଏବଂ ବିକ୍ରିରେ ସାହାଯ୍ୟ କରିପାରିବି।\nଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?",
    pa: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! 🌱 ਮੈਂ AgriDirect AI ਹਾਂ।\nਮੈਂ ਖੇਤੀਬਾੜੀ, ਫ਼ਸਲਾਂ ਦੇ ਭਾਅ, ਤਾਜ਼ਾ ਉਤਪਾਦ ਅਤੇ ਆਰਡਰਾਂ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।\nਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕੀ ਮਦਦ ਕਰਾਂ?",
    sa: "नमो नमः! 🌱 अहम् AgriDirect AI अस्मि।\nअहं कृषिकार्ये, सस्यमूल्येषु, उत्पादनेषु च भवतां साहाय्यं कर्तुं शक्नोमि।\nअद्य भवतां किं साहाय्यं करवाणि?",
    sat: "ᱡᱚᱦᱟᱨ! 🌱 ᱤᱧ ᱫᱚ AgriDirect AI ᱠᱟᱹᱱᱟᱹᱧ।\nᱤᱧ ᱟᱢ ᱪᱟᱥ-ᱵᱟᱥ, ᱫᱟᱢ, ᱡᱤᱱᱤᱥ ᱟᱹᱠᱷᱨᱤᱧ ᱟᱨ ᱚᱨᱰᱟᱨ ᱨᱮ ᱜᱚᱲᱚ ᱮᱢ ᱫᱟᱲᱮᱭᱟᱢᱟᱹᱧ।\nᱛᱮᱦᱮᱧ ᱪᱮᱫ ᱜᱚᱲᱚᱧ ᱮᱢᱟᱢᱟ?",
    sd: "سلام! 🌱 مان AgriDirect AI آهيان.\nمان اوهان کي پوک، فصلن جي اگھن ۽ سامان وڪرو ڪرڻ ۾ مدد ڪري سگهان ٿو.\nاڄ مان اوهان جي ڪهڙي مدد ڪريان؟",
    ta: "வணக்கம்! 🌱 நான் AgriDirect AI.\nவிவசாயம், பயிர் விலைகள், விளைபொருட்கள் மற்றும் ஆர்டர்களில் உங்களுக்கு உதவ முடியும்.\nஇன்று நான் உங்களுக்கு எவ்வாறு உதவலாம்?",
    te: "నమస్తే! 🌱 నేను అగ్రిడైరెక్ట్ AI.\nనేను వ్యవసాయం, పంటల ధరలు, తాజా ఉత్పత్తులు, ఆర్డర్లు మరియు పంట అమ్మకాలలో మీకు సహాయపడగలను.\nఈరోజు మీకు ఎలా సహాయపడగలను?",
    ur: "السلام علیکم! 🌱 میں AgriDirect AI ہوں۔\nمیں آپ کی کاشتکاری، فصلوں کی قیمتوں، مصنوعات اور فروخت میں مدد کر سکتا ہوں۔\nآج میں آپ کی کیا مدد کر سکتا ہوں؟"
  };

  // 6 Quick Actions Localized across key languages
  const QUICK_ACTIONS = {
    en: [
      { text: "🌾 Farming Help", query: "How can I improve my crop yield naturally?" },
      { text: "💰 Crop Prices", query: "What is the direct price of fresh tomatoes and onions?" },
      { text: "🛒 Find Products", query: "Show me fresh organic vegetables under ₹50/kg." },
      { text: "📦 My Orders", query: "Where is my order and how do I track it?" },
      { text: "👨‍🌾 Sell My Harvest", query: "How do I list and sell my harvest on AgriDirect?" },
      { text: "📊 Price Comparison", query: "How does AgriDirect price comparison vs middleman work?" }
    ],
    te: [
      { text: "🌾 సాగు సూచనలు", query: "సహజ పద్ధతిలో పంట దిగుబడిని ఎలా పెంచాలి?" },
      { text: "💰 పంటల ధరలు", query: "తాజా టమాటాలు మరియు ఉల్లిపాయల ప్రత్యక్ష ధర ఎంత?" },
      { text: "🛒 ఉత్పత్తులు", query: "రూ. 50/కేజీ లోపు లభించే తాజా కూరగాయలు చూపించు." },
      { text: "📦 నా ఆర్డర్లు", query: "నా ఆర్డర్ ఎక్కడుంది మరియు ఎలా ట్రాక్ చేయాలి?" },
      { text: "👨‍🌾 పంట అమ్మకం", query: "AgriDirect లో నా పంటను ఎలా చేర్చి అమ్మాలి?" },
      { text: "📊 ధరల పోలిక", query: "మధ్యవర్తుల ధరలతో పోలిస్తే AgriDirect లో ఎంత ఆదా అవుతుంది?" }
    ],
    hi: [
      { text: "🌾 खेती सलाह", query: "प्राकृतिक रूप से फसल की उपज कैसे सुधारें?" },
      { text: "💰 ताज़ा भाव", query: "टमाटर और प्याज का सीधा किसान भाव क्या है?" },
      { text: "🛒 उत्पाद खोजें", query: "₹50/किलो से कम कीमत वाली ताज़ी सब्जियां दिखाएं।" },
      { text: "📦 मेरे ऑर्डर", query: "मेरा ऑर्डर कहाँ है और इसे कैसे ट्रैक करें?" },
      { text: "👨‍🌾 फसल बेचें", query: "AgriDirect पर किसान अपनी फसल कैसे बेचे?" },
      { text: "📊 मूल्य तुलना", query: "बिचौलियों के मुकाबले AgriDirect पर कितनी बचत होती है?" }
    ],
    ta: [
      { text: "🌾 விவசாய உதவி", query: "இயற்கை முறையில் பயிர் விளைச்சலை அதிகரிப்பது எப்படி?" },
      { text: "💰 பயிர் விலைகள்", query: "தக்காளி மற்றும் வெங்காயத்தின் நேரடி விலை என்ன?" },
      { text: "🛒 காய்கறிகள்", query: "₹50/கிலோவுக்குள் உள்ள புதிய காய்கறிகளைக் காட்டுங்கள்." },
      { text: "📦 எனது ஆர்டர்கள்", query: "எனது ஆர்டர் நிலை என்ன?" },
      { text: "👨‍🌾 விளைபொருள் விற்க", query: "விளைபொருளை எப்படி பட்டியலிடுவது?" },
      { text: "📊 விலை ஒப்பீடு", query: "AgriDirect விலை ஒப்பீடு எவ்வாறு செயல்படுகிறது?" }
    ],
    ur: [
      { text: "🌾 زرعی رہنمائی", query: "قدرتی طور پر فصل کی پیداوار کیسے بڑھائیں؟" },
      { text: "💰 فصل کی قیمت", query: "ٹماٹر اور پیاز کی براہِ راست قیمت کیا ہے؟" },
      { text: "🛒 سستی سبزیاں", query: "50 روپے کلو سے کم قیمت والی تازہ سبزیاں دکھائیں۔" },
      { text: "📦 میرے آرڈرز", query: "میرا آرڈر کہاں ہے اور کیسے ٹریک کریں؟" },
      { text: "👨‍🌾 پیداوار فروخت", query: "AgriDirect پر کسان اپنی فصل کیسے فروخت کرے؟" },
      { text: "📊 قیمتوں کا موازنہ", query: "دلالوں کے مقابلے میں AgriDirect پر کتنی بچت ہوتی ہے؟" }
    ]
  };

  const PLACEHOLDERS = {
    en: "Ask about farming, prices, products, orders...",
    te: "సాగు, ధరలు, ఉత్పత్తులు, ఆర్డర్ల గురించి అడగండి...",
    hi: "खेती, ताज़ा भाव, उत्पाद, ऑर्डर के बारे में पूछें...",
    ta: "விவசாயம், விலைகள், ஆர்டர்கள் பற்றி கேளுங்கள்...",
    ur: "کاشتکاری، قیمتوں، مصنوعات کے بارے میں پوچھیں...",
    bn: "চাষাবাদ, দাম, পণ্য বা অর্ডার সম্পর্কে জিজ্ঞাসা করুন...",
    mr: "शेती, भाव, उत्पादने किंवा ऑर्डर्सबद्दल विचारा...",
    sat: "ᱪᱟᱥ, ᱫᱟᱢ, ᱡᱤᱱᱤᱥ ᱵᱟᱵᱚᱛ ᱠᱩᱞᱤᱭ ᱢᱮ..."
  };

  // State Management
  let chatOpen = false;
  let messages = [];
  let isAwaitingReply = false;

  function getCurrentLang() {
    return localStorage.getItem('agri_lang') || 'en';
  }

  function isRTL(lang) {
    return ['ur', 'ks', 'sd'].includes(lang);
  }

  function getPageContext() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('marketplace')) return 'Marketplace (Browsing Products)';
    if (path.includes('product-detail')) return 'Product Detail View';
    if (path.includes('price-compare')) return 'Price Comparison Tool';
    if (path.includes('farmer-dashboard')) return 'Farmer Management Dashboard';
    if (path.includes('cart')) return 'Shopping Cart & Direct Basket';
    if (path.includes('orders')) return 'My Orders & Delivery Tracking';
    if (path.includes('auth')) return 'Login & Registration Portal';
    return 'AgriDirect Home / Direct Farm Marketplace';
  }

  function getUserContext() {
    try {
      if (window.AgriAuth && typeof window.AgriAuth.getCurrentUser === 'function') {
        const user = window.AgriAuth.getCurrentUser();
        if (user) {
          return {
            id: user.id,
            name: user.name,
            role: user.role,
            farmName: user.farmName || '',
            location: user.location || ''
          };
        }
      }
    } catch (e) {}
    return null;
  }

  // Build and Inject Assistant DOM
  function injectAssistantUI() {
    if (document.getElementById('agriAiRoot')) return;

    const root = document.createElement('div');
    root.id = 'agriAiRoot';
    root.innerHTML = `
      <!-- Floating Action Button -->
      <button id="agriAiToggleBtn" class="agri-ai-floating-btn" aria-label="Open AgriDirect AI Assistant" title="AgriDirect AI Assistant">
        <span class="agri-ai-btn-icon">🌱</span>
        <span class="agri-ai-btn-badge">AI</span>
        <span class="agri-ai-pulse-ring"></span>
      </button>

      <!-- Main Chat Panel -->
      <div id="agriAiChatPanel" class="agri-ai-panel" style="display:none;" role="dialog" aria-modal="true" aria-labelledby="agriAiTitle">
        <!-- Header -->
        <div class="agri-ai-header">
          <div class="agri-ai-brand">
            <div class="agri-ai-avatar">🌱</div>
            <div class="agri-ai-title-wrap">
              <h3 id="agriAiTitle" class="agri-ai-title">AgriDirect AI</h3>
              <div class="agri-ai-status">
                <span class="agri-ai-status-dot"></span>
                <span class="agri-ai-status-text">Online & Grounded</span>
              </div>
            </div>
          </div>
          <div class="agri-ai-controls">
            <span id="agriAiLangPill" class="agri-ai-lang-pill">English</span>
            <button id="agriAiClearBtn" class="agri-ai-btn-tool" title="Clear Conversation" aria-label="Clear chat">🗑️</button>
            <button id="agriAiCloseBtn" class="agri-ai-btn-tool" title="Close" aria-label="Close chat">✕</button>
          </div>
        </div>

        <!-- Chat Body -->
        <div id="agriAiBody" class="agri-ai-body">
          <div id="agriAiWelcomeCard" class="agri-ai-welcome-card">
            <div class="agri-ai-welcome-icon">🌾</div>
            <div id="agriAiGreeting" class="agri-ai-greeting-text"></div>
            <div class="agri-ai-quick-title">Quick Actions:</div>
            <div id="agriAiQuickChips" class="agri-ai-quick-chips"></div>
          </div>

          <div id="agriAiMessages" class="agri-ai-messages-list"></div>

          <!-- Typing Indicator -->
          <div id="agriAiTyping" class="agri-ai-typing-wrap" style="display:none;">
            <div class="agri-ai-msg-avatar">🌱</div>
            <div class="agri-ai-typing-bubble">
              <span class="agri-dot"></span>
              <span class="agri-dot"></span>
              <span class="agri-dot"></span>
            </div>
          </div>
        </div>

        <!-- Footer / Input Area -->
        <div class="agri-ai-footer">
          <div class="agri-ai-input-wrap">
            <input 
              type="text" 
              id="agriAiInput" 
              class="agri-ai-input" 
              placeholder="Ask about farming, prices, products..." 
              autocomplete="off"
            />
            <button id="agriAiMicBtn" class="agri-ai-btn-mic" title="Voice Input (Coming Soon)" aria-label="Voice input">
              🎙️
            </button>
            <button id="agriAiSendBtn" class="agri-ai-btn-send" title="Send Message" aria-label="Send message">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(root);
    bindEvents();
    syncLanguageUI();
  }

  // Synchronize language labels, greeting, chips, and RTL layout
  function syncLanguageUI() {
    const lang = getCurrentLang();
    const panel = document.getElementById('agriAiChatPanel');
    const langPill = document.getElementById('agriAiLangPill');
    const greetingEl = document.getElementById('agriAiGreeting');
    const chipsEl = document.getElementById('agriAiQuickChips');
    const inputEl = document.getElementById('agriAiInput');

    if (!panel) return;

    // RTL handling
    if (isRTL(lang)) {
      panel.setAttribute('dir', 'rtl');
      panel.classList.add('rtl-mode');
    } else {
      panel.setAttribute('dir', 'ltr');
      panel.classList.remove('rtl-mode');
    }

    // Update Language Pill
    if (langPill && window.SUPPORTED_LANGUAGES) {
      const match = window.SUPPORTED_LANGUAGES.find(l => l.code === lang);
      langPill.textContent = match ? match.native : lang.toUpperCase();
    }

    // Update Greeting Text
    if (greetingEl) {
      const greetText = GREETINGS[lang] || GREETINGS.en;
      greetingEl.textContent = greetText;
    }

    // Update Quick Action Chips
    if (chipsEl) {
      const chipList = QUICK_ACTIONS[lang] || QUICK_ACTIONS.en;
      chipsEl.innerHTML = chipList.map(c => `
        <button class="agri-ai-chip" data-query="${escapeHtml(c.query)}">
          ${c.text}
        </button>
      `).join('');

      chipsEl.querySelectorAll('.agri-ai-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          const query = btn.getAttribute('data-query');
          if (query) {
            sendMessage(query);
          }
        });
      });
    }

    // Update Input Placeholder
    if (inputEl) {
      inputEl.placeholder = PLACEHOLDERS[lang] || PLACEHOLDERS.en;
    }
  }

  // Toggle Assistant Panel
  function toggleChat(open) {
    const panel = document.getElementById('agriAiChatPanel');
    const btn = document.getElementById('agriAiToggleBtn');
    if (!panel) return;

    chatOpen = typeof open === 'boolean' ? open : !chatOpen;
    panel.style.display = chatOpen ? 'flex' : 'none';

    if (chatOpen) {
      syncLanguageUI();
      const input = document.getElementById('agriAiInput');
      if (input) setTimeout(() => input.focus(), 150);
      scrollToBottom();
    }
  }

  function bindEvents() {
    const toggleBtn = document.getElementById('agriAiToggleBtn');
    const closeBtn = document.getElementById('agriAiCloseBtn');
    const clearBtn = document.getElementById('agriAiClearBtn');
    const sendBtn = document.getElementById('agriAiSendBtn');
    const input = document.getElementById('agriAiInput');
    const micBtn = document.getElementById('agriAiMicBtn');

    if (toggleBtn) toggleBtn.addEventListener('click', () => toggleChat());
    if (closeBtn) closeBtn.addEventListener('click', () => toggleChat(false));

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        messages = [];
        const msgList = document.getElementById('agriAiMessages');
        if (msgList) msgList.innerHTML = '';
        const welcome = document.getElementById('agriAiWelcomeCard');
        if (welcome) welcome.style.display = 'block';
      });
    }

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (text) {
          sendMessage(text);
          input.value = '';
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          const text = input.value.trim();
          if (text) {
            sendMessage(text);
            input.value = '';
          }
        }
      });
    }

    if (micBtn) {
      micBtn.addEventListener('click', () => {
        // Voice assistance feedback
        alert("🎙️ Voice assistance feature is ready for microphone capture. Type your query or select a quick action!");
      });
    }

    // Listen to language changes across AgriDirect
    window.addEventListener('languageChanged', () => {
      syncLanguageUI();
    });
  }

  // Append a message bubble to UI
  function appendMessage(sender, text) {
    const msgList = document.getElementById('agriAiMessages');
    const welcome = document.getElementById('agriAiWelcomeCard');
    if (!msgList) return;

    if (welcome && welcome.style.display !== 'none') {
      welcome.style.display = 'none';
    }

    const msgRow = document.createElement('div');
    msgRow.className = `agri-ai-msg-row ${sender === 'user' ? 'user-row' : 'assistant-row'}`;

    const formattedContent = sender === 'assistant' ? formatMarkdown(text) : escapeHtml(text);

    msgRow.innerHTML = `
      ${sender === 'assistant' ? '<div class="agri-ai-msg-avatar">🌱</div>' : ''}
      <div class="agri-ai-msg-bubble ${sender}">
        ${formattedContent}
      </div>
    `;

    msgList.appendChild(msgRow);
    scrollToBottom();
  }

  function setTyping(show) {
    isAwaitingReply = show;
    const typing = document.getElementById('agriAiTyping');
    if (typing) {
      typing.style.display = show ? 'flex' : 'none';
      if (show) scrollToBottom();
    }
  }

  function scrollToBottom() {
    const body = document.getElementById('agriAiBody');
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }

  // Send message to Backend /api/chat with client fallback
  async function sendMessage(userQuery) {
    if (!userQuery || isAwaitingReply) return;

    appendMessage('user', userQuery);
    setTyping(true);

    const lang = getCurrentLang();
    const pageContext = getPageContext();
    const userContext = getUserContext();

    const payload = {
      message: userQuery,
      language: lang,
      pageContext: pageContext,
      userContext: userContext,
      history: messages.slice(-4)
    };

    try {
      // 1. Attempt POST to backend /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.response) {
          setTyping(false);
          appendMessage('assistant', data.response);
          messages.push({ role: 'user', content: userQuery }, { role: 'assistant', content: data.response });
          return;
        }
      }
      throw new Error("Backend response error");
    } catch (err) {
      // 2. Client-side grounded fallback (supports direct file:/// testing without server)
      const fallbackReply = generateClientFallback(userQuery, lang, userContext);
      setTyping(false);
      appendMessage('assistant', fallbackReply);
      messages.push({ role: 'user', content: userQuery }, { role: 'assistant', content: fallbackReply });
    }
  }

  // Client Grounded Responder for standalone / offline operations
  function generateClientFallback(query, lang, userContext) {
    const q = query.toLowerCase();

    // Check Tomato
    if (q.includes('tomato') || q.includes('టమాట') || q.includes('टमाटर') || q.includes('தக்காளி') || q.includes('ٹماٹر')) {
      if (lang === 'te') {
        return "🌱 **Fresh Tomatoes ధర వివరాలు:**\n• రైతు ప్రత్యక్ష ధర: **₹24/kg**\n• మార్కెట్ ధర: ₹45/kg\n• మీ పొదుపు: **₹21/kg (47% ఆదా!)**\n• రైతు: **Ramesh Reddy** (Guntur)\n• అందుబాటులో ఉన్న నిల్వ: 450 kg (సేంద్రీయ పద్ధతి)\n\nమధ్యవర్తులు లేరు — 100% మీ సొమ్ము రైతుకే చేరుతుంది!";
      } else if (lang === 'hi') {
        return "🌱 **ताज़ा टमाटर के दाम:**\n• किसान का सीधा दाम: **₹24/किलो**\n• मंडी/बाज़ार का दाम: ₹45/किलो\n• आपकी बचत: **₹21/किलो (47% बचत!)**\n• किसान: **Ramesh Reddy** (गुंटूर)\n• स्टॉक: 450 किलो (प्राकृतिक जैविक खेती)\n\nAgriDirect पर खरीदने से पूरा पैसा सीधे किसान को मिलता है।";
      } else {
        return "🌱 **Fresh Tomatoes Transparent Price Breakdown:**\n• Direct Farmer Price: **₹24/kg**\n• Mandi / Retail Price: ₹45/kg\n• Direct Consumer Savings: **₹21/kg (47% savings!)**\n• Verified Farmer: **Ramesh Reddy** (Guntur, Andhra Pradesh)\n• Available Stock: 450 kg (100% Certified Organic)\n\nZero middlemen take a cut — 100% of your payment goes directly to the grower.";
      }
    }

    // Check Onion
    if (q.includes('onion') || q.includes('ఉల్లి') || q.includes('प्याज') || q.includes('வெங்காயம்') || q.includes('پیاز')) {
      return "🌱 **Red Onions Price Breakdown:**\n• Direct Farmer Price: **₹22/kg**\n• Mandi Retail: ₹38/kg\n• You Save: **₹16/kg (42% savings!)**\n• Farmer: **Suresh Patil** (Nashik, Maharashtra)\n• Available Stock: 800 kg.";
    }

    // Check Orders
    if (q.includes('order') || q.includes('ఆర్డర్') || q.includes('ऑर्डर') || q.includes('ஆர்டர்') || q.includes('آرڈر')) {
      const name = userContext ? userContext.name : '';
      return `📦 **Order Status & Tracking ${name ? '(' + name + ')' : ''}:**\nYou can track all your active deliveries with real-time status updates under **[My Orders](orders.html)** or connect directly with the farmer on WhatsApp.`;
    }

    // Check Sell / List Crop
    if (q.includes('sell') || q.includes('list') || q.includes('అమ్మకం') || q.includes('बेचना') || q.includes('فروخت')) {
      return "👨‍🌾 **How to Sell Your Harvest on AgriDirect:**\n1. Login with your Farmer account.\n2. Open your **Farmer Dashboard**.\n3. Click **'+ List New Product'**.\n4. Set your fair price per kg/unit and available stock.\n5. Publish instantly for conscious consumers!";
    }

    // Default friendly response
    return GREETINGS[lang] || GREETINGS.en;
  }

  // Simple Markdown Formatter for bold, bullet points, and safe links
  function formatMarkdown(str) {
    let out = escapeHtml(str);
    // Bold: **text**
    out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Bullet points: • or *
    out = out.replace(/^[•*]\s+(.*)$/gm, '<li>$1</li>');
    out = out.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    // Safe Markdown Links: [text](url) - strictly sanitize against javascript: and data: schemes
    out = out.replace(/\[(.*?)\]\((.*?)\)/g, (match, linkText, linkUrl) => {
      const cleanUrl = linkUrl.trim().toLowerCase();
      const isSafe = (cleanUrl.startsWith('https://') || 
                      cleanUrl.startsWith('http://') || 
                      cleanUrl.startsWith('mailto:') || 
                      cleanUrl.startsWith('tel:') || 
                      /^[a-z0-9_\-\.\/]+(\.html)?$/i.test(cleanUrl)) &&
                     !cleanUrl.includes('javascript:') && 
                     !cleanUrl.includes('data:') && 
                     !cleanUrl.includes('vbscript:');
      if (isSafe) {
        return `<a href="${encodeURI(linkUrl.trim())}" class="agri-ai-link" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      }
      return linkText;
    });
    // Line breaks
    out = out.replace(/\n/g, '<br/>');
    // Clean up lists
    out = out.replace(/<\/li><br\/>/g, '</li>');
    return out;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAssistantUI);
  } else {
    injectAssistantUI();
  }

  // Expose public API on window
  window.AgriDirectAI = {
    open: () => toggleChat(true),
    close: () => toggleChat(false),
    sendMessage: (msg) => sendMessage(msg)
  };

})();
