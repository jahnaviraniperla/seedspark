/**
 * AgriDirect - Internationalization (i18n) Module
 * Supported Languages: English (en), Telugu (te), Hindi (hi)
 */

const translations = {
  en: {
    // Top Bar & Branding
    "topbar_mission": "🌾 Fair Prices for Farmers. Fresh Produce for Families. Zero Middlemen.",
    "brand_tagline": "Direct Farm-to-Fork Marketplace",
    
    // Navigation
    "nav_home": "Home",
    "nav_marketplace": "Marketplace",
    "nav_price_compare": "Price Compare",
    "nav_dashboard": "Farmer Dashboard",
    "nav_my_orders": "My Orders",
    "nav_cart": "Cart",
    "nav_login": "Login / Register",
    "nav_logout": "Logout",
    
    // Hero Section
    "hero_title": "Direct from the Farm to Your Table. No Middlemen.",
    "hero_desc": "Connecting hardworking farmers directly with conscious consumers. Farmers get up to 40% higher income, and consumers enjoy fresh harvest at 30% lower prices.",
    "hero_cta_buy": "Shop Fresh Produce",
    "hero_cta_sell": "Sell Your Harvest (Farmer)",
    "stat_farmers": "Active Farmers",
    "stat_savings": "Consumer Savings",
    "stat_orders": "Direct Deliveries",
    
    // Problem vs Solution
    "problem_badge": "The Supply Chain Crisis",
    "problem_title": "Why Middlemen Hurt Both Farmers & Consumers",
    "problem_desc": "In the traditional mandi system, a crop changes hands 4 to 6 times before reaching your kitchen. Intermediaries eat the lion's share of profits.",
    "trad_chain_title": "Traditional Exploitative Chain",
    "trad_step_1": "Farmer earns only ₹15/kg (struggles to cover costs)",
    "trad_step_2": "Village agent takes 10% commission",
    "trad_step_3": "Wholesale Mandi trader marks up 30%",
    "trad_step_4": "Transport & City distributor adds 25%",
    "trad_step_5": "Local Retailer sells at ₹50/kg to Consumer",
    
    "agri_chain_title": "AgriDirect Fair-Trade Model",
    "agri_step_1": "Farmer sets fair price: Earns ₹30/kg (+100% gain!)",
    "agri_step_2": "Direct connection & direct buyer contact",
    "agri_step_3": "Consumer pays only ₹35/kg (Saves 30%!)",
    "agri_step_4": "100% Fresh Harvest delivered straight from field",
    
    // Price Comparison Widget
    "compare_widget_title": "Live Price Comparison vs Middlemen",
    "compare_farmer_gets": "Farmer Receives",
    "compare_market_price": "Mandi Retail Price",
    "compare_direct_price": "AgriDirect Price",
    "compare_you_save": "Consumer Saves",
    "compare_farmer_bonus": "Farmer Gains Extra",
    
    // Categories
    "cat_all": "All Categories",
    "cat_vegetables": "Vegetables",
    "cat_fruits": "Fresh Fruits",
    "cat_grains": "Grains & Rice",
    "cat_pulses": "Pulses & Dals",
    "cat_spices": "Spices & Herbs",
    "cat_dairy": "Organic & Dairy",
    
    // Marketplace & Filters
    "market_title": "Fresh Harvest Marketplace",
    "market_subtitle": "Directly harvested by verified local farmers",
    "search_placeholder": "Search crops, vegetables, fruits, pulses...",
    "filter_category": "Categories",
    "filter_location": "Filter by District / State",
    "filter_farming_type": "Farming Type",
    "filter_organic_only": "100% Certified Organic Only",
    "filter_price_max": "Max Price per Kg/Unit",
    "sort_by": "Sort By",
    "sort_featured": "Featured",
    "sort_price_asc": "Price: Low to High",
    "sort_price_desc": "Price: High to Low",
    "sort_freshness": "Freshest Harvest",
    
    // Product Card
    "harvested_on": "Harvested",
    "farmer_label": "Farmer",
    "middleman_retail": "Market Price",
    "direct_price": "Direct Price",
    "btn_view_details": "View Details",
    "btn_add_cart": "Add to Cart",
    "btn_buy_now": "Buy Now",
    "btn_call_farmer": "Call Farmer",
    "btn_whatsapp_farmer": "WhatsApp Farmer",
    "organic_badge": "Organic",
    "verified_farmer": "Verified Farmer",
    "in_stock": "In Stock",
    
    // Product Details Page
    "prod_detail_title": "Produce Details",
    "prod_farmer_story": "Farmer Profile & Farm Details",
    "prod_shelf_life": "Shelf Life",
    "prod_min_order": "Min Order",
    "prod_harvest_date": "Harvest Date",
    "prod_location": "Farm Location",
    "prod_description": "About this Crop",
    "prod_quantity": "Quantity (Units/Kg)",
    "prod_price_breakdown": "Transparent Price Breakdown",
    "prod_direct_impact": "By purchasing this, ₹{amount} goes 100% directly to the farmer without agent cuts.",
    
    // Cart & Checkout
    "cart_title": "Your Direct Farm Basket",
    "cart_empty": "Your cart is empty. Support a farmer by adding fresh produce!",
    "cart_subtotal": "Item Subtotal",
    "cart_middleman_savings": "Total Savings vs Mandi Middlemen",
    "cart_delivery_charge": "Direct Delivery / Logistics",
    "cart_total": "Total Amount",
    "btn_proceed_checkout": "Proceed to Direct Checkout",
    "checkout_title": "Direct Farm Delivery Details",
    "checkout_name": "Full Name",
    "checkout_phone": "Mobile Number",
    "checkout_address": "Delivery Address",
    "checkout_city": "City / Town",
    "checkout_pincode": "PIN Code",
    "payment_method": "Payment Method",
    "pay_cod": "Cash on Delivery",
    "pay_upi": "UPI / Direct Farmer QR (GPay, PhonePe, Paytm)",
    "btn_place_order": "Confirm & Place Direct Order",
    
    // Orders
    "orders_title": "My Farm Orders",
    "order_id": "Order #",
    "order_date": "Order Date",
    "order_status": "Status",
    "status_pending": "Pending Farmer Confirmation",
    "status_confirmed": "Confirmed & Packing",
    "status_dispatched": "Dispatched from Farm",
    "status_delivered": "Delivered Fresh",
    "status_cancelled": "Cancelled",
    
    // Farmer Dashboard
    "dash_title": "Farmer Management Portal",
    "dash_subtitle": "Manage your fresh crops, direct prices, and customer orders",
    "dash_stat_sales": "Total Produce Sales",
    "dash_stat_active": "Active Crop Listings",
    "dash_stat_orders": "Orders Received",
    "dash_stat_delivered": "Completed Deliveries",
    "btn_add_product": "+ List New Produce",
    "my_products": "My Crop Inventory",
    "incoming_orders": "Direct Orders from Consumers",
    "table_crop": "Crop Name",
    "table_category": "Category",
    "table_direct_price": "Your Selling Price",
    "table_market_price": "Mandi Retail Price",
    "table_stock": "Available Stock",
    "table_status": "Status",
    "table_actions": "Actions",
    
    // Add Product Modal
    "modal_add_title": "List Fresh Farm Produce",
    "modal_crop_name": "Crop / Produce Name",
    "modal_category": "Category",
    "modal_unit": "Unit (Kg, Quintal, Dozen, Liter)",
    "modal_farmer_price": "Your Direct Price (₹ per unit)",
    "modal_market_price": "Typical Retail Market Price (₹)",
    "modal_stock": "Total Available Quantity",
    "modal_harvest_date": "Harvest / Available Date",
    "modal_location": "Farm Location / District",
    "modal_image": "Produce Image URL or Preset",
    "modal_organic": "Is this produce 100% Organic?",
    "modal_desc": "Description / Farming Details",
    "btn_save_produce": "Publish Produce Listing",
    
    // Auth
    "auth_farmer_tab": "Farmer Portal",
    "auth_consumer_tab": "Consumer / Buyer",
    "auth_login_title": "Welcome Back to AgriDirect",
    "auth_register_title": "Create an Account",
    "auth_role_farmer": "I am a Farmer (Selling Produce)",
    "auth_role_consumer": "I am a Consumer (Buying Fresh)",
    "auth_name": "Full Name",
    "auth_farm_name": "Farm Name (Optional for farmers)",
    "auth_phone": "Mobile Number",
    "auth_location": "Village / District / City",
    "auth_email": "Email Address (Optional)",
    "auth_password": "Password",
    "btn_login": "Login",
    "btn_register": "Register Account",
    "auth_switch_to_register": "Don't have an account? Register here",
    "auth_switch_to_login": "Already registered? Login here",
    "quick_demo_login": "Quick Demo Login (One-click):",
    
    // Footer
    "footer_mission": "AgriDirect empowers Indian farmers by connecting them directly with household consumers, eliminating predatory intermediaries, and restoring dignity and fair profits to agriculture.",
    "footer_links": "Quick Links",
    "footer_contact": "Support & Helpline",
    "footer_rights": "All Rights Reserved. Empowering Farmers Across India."
  },

  te: {
    // Top Bar & Branding
    "topbar_mission": "🌾 రైతులకు గిట్టుబాటు ధర. వినియోగదారులకు తాజా పంట. దళారులు లేని మార్కెట్.",
    "brand_tagline": "రైతు నుండి నేరుగా మీ ఇంటికి",
    
    // Navigation
    "nav_home": "హోమ్",
    "nav_marketplace": "మార్కెట్ ప్లేస్",
    "nav_price_compare": "ధరల పోలిక",
    "nav_dashboard": "రైతు డ్యాష్‌బోర్డ్",
    "nav_my_orders": "నా ఆర్డర్లు",
    "nav_cart": "షాపింగ్ కార్ట్",
    "nav_login": "లాగిన్ / రిజిస్టర్",
    "nav_logout": "లాగౌట్",
    
    // Hero Section
    "hero_title": "పొలం నుండి నేరుగా మీ వంటగదికి. దళారులు లేరు.",
    "hero_desc": "కష్టపడే రైతులను నేరుగా వినియోగదారులతో కలుపుతున్నాము. రైతులకు 40% ఎక్కువ ఆదాయం, వినియోగదారులకు 30% తక్కువ ధరకే తాజా పంట.",
    "hero_cta_buy": "తాజా పంట కొనండి",
    "hero_cta_sell": "పంట అమ్మండి (రైతు)",
    "stat_farmers": "చేరిన రైతులు",
    "stat_savings": "వినియోగదారుల పొదుపు",
    "stat_orders": "డైరెక్ట్ డెలివరీలు",
    
    // Problem vs Solution
    "problem_badge": "మార్కెట్ సమస్య",
    "problem_title": "మధ్యవర్తులు/దళారులు రైతులకు, ప్రజలకు ఎందుకు నష్టం కలిగిస్తున్నారు?",
    "problem_desc": "సాధారణ మార్కెట్లలో పంట మీ చేతికి చేరేలోపు 4 నుండి 6 మంది దళారులు మారుతుంది. ఎక్కువ లాభం దళారులే తింటున్నారు.",
    "trad_chain_title": "సాధారణ దళారీల విధానం",
    "trad_step_1": "రైతుకు దక్కేది కిలోకు కేవలం ₹15 మాత్రమే",
    "trad_step_2": "గ్రామ దళారీ 10% కమీషన్ తీసుకుంటాడు",
    "trad_step_3": "హోల్‌సేల్ మండి వ్యాపారి 30% పెంచుతాడు",
    "trad_step_4": "రవాణా, సిటీ డిస్ట్రిబ్యూటర్ 25% కలుపుతాడు",
    "trad_step_5": "చివరికి వినియోగదారుడు ₹50/కిలో చెల్లిస్తాడు",
    
    "agri_chain_title": "అగ్రిడైరెక్ట్ న్యాయమైన విధానం",
    "agri_step_1": "రైతే ధర నిర్ణయిస్తాడు: కిలోకు ₹30 సంపాదిస్తాడు (+100% లాభం!)",
    "agri_step_2": "రైతుతో నేరుగా ఫోన్ / వాట్సాప్ సంభాషణ",
    "agri_step_3": "వినియోగదారుడు కేవలం ₹35 చెల్లిస్తాడు (30% ఆదా!)",
    "agri_step_4": "పొలం నుండి కోసిన తాజా నాణ్యమైన పంట",
    
    // Price Comparison Widget
    "compare_widget_title": "దళారీ మార్కెట్ vs అగ్రిడైరెక్ట్ ధరల పోలిక",
    "compare_farmer_gets": "రైతుకు వచ్చేది",
    "compare_market_price": "బహిరంగ మార్కెట్ ధర",
    "compare_direct_price": "రైతు డైరెక్ట్ ధర",
    "compare_you_save": "మీకు ఆదా అయ్యేది",
    "compare_farmer_bonus": "రైతుకు అదనపు లాభం",
    
    // Categories
    "cat_all": "అన్ని రకాలు",
    "cat_vegetables": "కూరగాయలు",
    "cat_fruits": "తాజా పండ్లు",
    "cat_grains": "వరి & ధాన్యాలు",
    "cat_pulses": "పప్పు దినుసులు",
    "cat_spices": "మసాలా దినుసులు",
    "cat_dairy": "ఆర్గానిక్ & పాల ఉత్పత్తులు",
    
    // Marketplace & Filters
    "market_title": "తాజా పంటల మార్కెట్",
    "market_subtitle": "స్థానిక రైతులు స్వయంగా పండించిన ఉత్పత్తులు",
    "search_placeholder": "కూరగాయలు, పండ్లు, బియ్యం, పప్పులు వెతకండి...",
    "filter_category": "విభాగాలు",
    "filter_location": "జిల్లా / ప్రాంతం వారీగా",
    "filter_farming_type": "సాగు పద్ధతి",
    "filter_organic_only": "100% ప్రకృతి / సేంద్రీయ వ్యవసాయం",
    "filter_price_max": "గరిష్ట ధర (కిలోకు)",
    "sort_by": "క్రమబద్ధీకరించండి",
    "sort_featured": "ప్రధానమైనవి",
    "sort_price_asc": "ధర: తక్కువ నుండి ఎక్కువ",
    "sort_price_desc": "ధర: ఎక్కువ నుండి తక్కువ",
    "sort_freshness": "తాజా కోత",
    
    // Product Card
    "harvested_on": "కోత తేదీ",
    "farmer_label": "రైతు",
    "middleman_retail": "బజారు ధర",
    "direct_price": "రైతు ధర",
    "btn_view_details": "వివరాలు చూడండి",
    "btn_add_cart": "కార్ట్‌కు జోడించు",
    "btn_buy_now": "ఇప్పుడే కొనండి",
    "btn_call_farmer": "రైతుకు కాల్ చేయండి",
    "btn_whatsapp_farmer": "వాట్సాప్‌లో మాట్లాడండి",
    "organic_badge": "సేంద్రీయ",
    "verified_farmer": "ధృవీకరించబడిన రైతు",
    "in_stock": "లభ్యత ఉంది",
    
    // Product Details Page
    "prod_detail_title": "ఉత్పత్తి వివరాలు",
    "prod_farmer_story": "రైతు వివరాలు & పొలం చిరునామా",
    "prod_shelf_life": "నిల్వ కాలం",
    "prod_min_order": "కనిష్ట ఆర్డర్",
    "prod_harvest_date": "పంట కోత తేదీ",
    "prod_location": "పొలం ఉన్న ప్రాంతం",
    "prod_description": "ఈ పంట గురించి",
    "prod_quantity": "పరిమాణం (కిలోలు/యూనిట్లు)",
    "prod_price_breakdown": "ధరల పారదర్శక విభజన",
    "prod_direct_impact": "ఈ కొనుగోలు ద్వారా ₹{amount} మొత్తం దళారుల ప్రమేయం లేకుండా నేరుగా రైతుకే చేరుతుంది.",
    
    // Cart & Checkout
    "cart_title": "మీ తాజా పంటల బుట్ట",
    "cart_empty": "మీ కార్ట్ ఖాళీగా ఉంది. రైతులకు మద్దతుగా తాజా పంటలను ఎంచుకోండి!",
    "cart_subtotal": "మొత్తం విలువ",
    "cart_middleman_savings": "దళారీల ధర కంటే మీరు ఆదా చేసిన మొత్తం",
    "cart_delivery_charge": "డైరెక్ట్ రవాణా ఛార్జీ",
    "cart_total": "చెల్లించాల్సిన మొత్తం",
    "btn_proceed_checkout": "ఆర్డర్ చేయడానికి ముందుకు సాగండి",
    "checkout_title": "డెలివరీ వివరాలు",
    "checkout_name": "పూర్తి పేరు",
    "checkout_phone": "మొబైల్ నంబర్",
    "checkout_address": "ఇంటి చిరునామా",
    "checkout_city": "ఊరు / నగరం",
    "checkout_pincode": "పిన్ కోడ్",
    "payment_method": "చెల్లింపు పద్ధతి",
    "pay_cod": "క్యాష్ ఆన్ డెలివరీ (వస్తువు అందినప్పుడు)",
    "pay_upi": "యూపీఐ / రైతు క్యూఆర్ కోడ్ (GPay, PhonePe)",
    "btn_place_order": "ఆర్డర్ నిర్ధారించండి",
    
    // Orders
    "orders_title": "నా ఆర్డర్లు",
    "order_id": "ఆర్డర్ సంఖ్య #",
    "order_date": "ఆర్డర్ చేసిన తేదీ",
    "order_status": "స్థితి",
    "status_pending": "రైతు ఆమోదం కోసం వేచి ఉంది",
    "status_confirmed": "రైతు నిర్ధారించారు (ప్యాకింగ్ జరుగుతోంది)",
    "status_dispatched": "పొలం నుండి బయలుదేరింది",
    "status_delivered": "డెలివరీ పూర్తయింది",
    "status_cancelled": "రద్దు చేయబడింది",
    
    // Farmer Dashboard
    "dash_title": "రైతు నిర్వహణ విభాగం",
    "dash_subtitle": "మీ పంటలు, ధరలు మరియు ఆర్డర్లను ఇక్కడి నుండే నిర్వహించండి",
    "dash_stat_sales": "మొత్తం అమ్మకాలు",
    "dash_stat_active": "అమ్మకానికి ఉన్న పంటలు",
    "dash_stat_orders": "వచ్చిన ఆర్డర్లు",
    "dash_stat_delivered": "పూర్తయిన డెలివరీలు",
    "btn_add_product": "+ కొత్త పంటను చేర్చండి",
    "my_products": "నా పంటల జాబితా",
    "incoming_orders": "వినియోగదారుల నుండి వచ్చిన ఆర్డర్లు",
    "table_crop": "పంట పేరు",
    "table_category": "వర్గం",
    "table_direct_price": "మీరు నిర్ణయించిన ధర",
    "table_market_price": "బహిరంగ మార్కెట్ ధర",
    "table_stock": "నిల్వ ఉన్న పరిమాణం",
    "table_status": "స్థితి",
    "table_actions": "చర్యలు",
    
    // Add Product Modal
    "modal_add_title": "అమ్మకానికి కొత్త పంట వివరాలు",
    "modal_crop_name": "పంట / ఉత్పత్తి పేరు",
    "modal_category": "వర్గం",
    "modal_unit": "కొలత (కిలో, క్వింటాల్, డజను, లీటరు)",
    "modal_farmer_price": "మీ డైరెక్ట్ ధర (₹ ఒక యూనిట్‌కు)",
    "modal_market_price": "బహిరంగ మార్కెట్లో సాధారణ ధర (₹)",
    "modal_stock": "మొత్తం లభ్యత పరిమాణం",
    "modal_harvest_date": "పంట కోత తేదీ",
    "modal_location": "పొలం ఉన్న ఊరు / జిల్లా",
    "modal_image": "పంట ఫోటో లేదా ఇమేజ్ లింక్",
    "modal_organic": "ఇది 100% సేంద్రీయ / ఆర్గానిక్ పంటేనా?",
    "modal_desc": "పంట వివరాలు & సాగు పద్ధతి",
    "btn_save_produce": "పంటను లిస్ట్ చేయండి",
    
    // Auth
    "auth_farmer_tab": "రైతు లాగిన్ / రిజిస్టర్",
    "auth_consumer_tab": "వినియోగదారుల విభాగం",
    "auth_login_title": "అగ్రిడైరెక్ట్‌కు తిరిగి స్వాగతం",
    "auth_register_title": "కొత్త ఖాతాను సృష్టించండి",
    "auth_role_farmer": "నేను రైతును (పంట అమ్మడానికి)",
    "auth_role_consumer": "నేను వినియోగదారుడిని (కొనుగోలు చేయడానికి)",
    "auth_name": "పూర్తి పేరు",
    "auth_farm_name": "పొలం / ఫార్మ్ పేరు (రైతులకు ఐచ్ఛికం)",
    "auth_phone": "మొబైల్ నంబర్",
    "auth_location": "గ్రామం / మండలం / జిల్లా",
    "auth_email": "ఈమెయిల్ (ఐచ్ఛికం)",
    "auth_password": "పాస్‌వర్డ్",
    "btn_login": "లాగిన్ అవ్వండి",
    "btn_register": "నమోదు చేసుకోండి",
    "auth_switch_to_register": "ఖాతా లేదా? ఇక్కడ నమోదు చేసుకోండి",
    "auth_switch_to_login": "ఖాతా ఉందా? ఇక్కడ లాగిన్ అవ్వండి",
    "quick_demo_login": "డెమో లాగిన్ (ఒకే క్లిక్‌తో):",
    
    // Footer
    "footer_mission": "అగ్రిడైరెక్ట్ భారతీయ రైతులను నేరుగా కుటుంబాలతో కలుపుతూ, దళారుల దోపిడీని అరికట్టి వ్యవసాయానికి తగిన గౌరవం, లాభాలను చేకూరుస్తుంది.",
    "footer_links": "ముఖ్యమైన లింకులు",
    "footer_contact": "రైతు సహాయవాణి",
    "footer_rights": "సర్వహక్కులు ప్రత్యేకించబడినవి. భారతీయ రైతులకు అండగా."
  },

  hi: {
    // Top Bar & Branding
    "topbar_mission": "🌾 किसानों को सही दाम। परिवारों को शुद्ध फसल। बिचौलिया मुक्त बाजार।",
    "brand_tagline": "सीधे खेत से आपकी रसोई तक",
    
    // Navigation
    "nav_home": "होम",
    "nav_marketplace": "बाजार",
    "nav_price_compare": "कीमत तुलना",
    "nav_dashboard": "किसान डैशबोर्ड",
    "nav_my_orders": "मेरे ऑर्डर",
    "nav_cart": "कार्ट",
    "nav_login": "लॉग इन / रजिस्टर",
    "nav_logout": "लॉग आउट",
    
    // Hero Section
    "hero_title": "सीधे खेत से आपकी थाली तक। कोई बिचौलिया नहीं।",
    "hero_desc": "मेहनती किसानों को सीधे जागरूक उपभोक्ताओं से जोड़ना। किसानों को 40% अधिक आय और ग्राहकों को 30% कम कीमत पर ताजी फसल।",
    "hero_cta_buy": "ताजी फसल खरीदें",
    "hero_cta_sell": "फसल बेचें (किसान)",
    "stat_farmers": "सक्रिय किसान",
    "stat_savings": "उपभोक्ता बचत",
    "stat_orders": "डायरेक्ट डिलीवरी",
    
    // Problem vs Solution
    "problem_badge": "मंडी संकट और बिचौलिये",
    "problem_title": "बिचौलिये किसानों और उपभोक्ताओं दोनों को कैसे नुकसान पहुंचाते हैं?",
    "problem_desc": "पारंपरिक मंडी व्यवस्था में फसल आपकी रसोई तक पहुंचने से पहले 4 से 6 हाथों से गुजरती है। मुनाफे का बड़ा हिस्सा दलाल खा जाते हैं।",
    "trad_chain_title": "पारंपरिक बिचौलिया शोषण चक्र",
    "trad_step_1": "किसान को मिलता है मात्र ₹15/किलो",
    "trad_step_2": "गांव का आढ़ती लेता है 10% कमीशन",
    "trad_step_3": "थोक मंडी व्यापारी 30% कीमत बढ़ाता है",
    "trad_step_4": "ट्रांसपोर्ट और सिटी डिस्ट्रीब्यूटर 25% जोड़ता है",
    "trad_step_5": "खुदरा दुकानदार ₹50/किलो में ग्राहक को बेचता है",
    
    "agri_chain_title": "AgriDirect पारदर्शी मॉडल",
    "agri_step_1": "किसान खुद दाम तय करता है: ₹30/किलो पाता है (+100% मुनाफा!)",
    "agri_step_2": "किसान और ग्राहक के बीच सीधा फोन/व्हाट्सएप संपर्क",
    "agri_step_3": "उपभोक्ता को सिर्फ ₹35/किलो मिलता है (30% बचत!)",
    "agri_step_4": "खेत से सीधे तोड़ी गई 100% शुद्ध ताजी फसल",
    
    // Price Comparison Widget
    "compare_widget_title": "मंडी बाजार बनाम AgriDirect मूल्य तुलना",
    "compare_farmer_gets": "किसान को मिलता है",
    "compare_market_price": "मंडी खुदरा मूल्य",
    "compare_direct_price": "AgriDirect सीधा मूल्य",
    "compare_you_save": "ग्राहक की सीधी बचत",
    "compare_farmer_bonus": "किसान का अतिरिक्त लाभ",
    
    // Categories
    "cat_all": "सभी श्रेणियां",
    "cat_vegetables": "सब्जियां",
    "cat_fruits": "ताजे फल",
    "cat_grains": "अनाज और चावल",
    "cat_pulses": "दालें",
    "cat_spices": "मसाले और जड़ी-बूटियां",
    "cat_dairy": "जैविक व डेयरी उत्पाद",
    
    // Marketplace & Filters
    "market_title": "ताजा फसल बाजार",
    "market_subtitle": "सत्यापित स्थानीय किसानों द्वारा सीधे उत्पादित",
    "search_placeholder": "सब्जियां, फल, अनाज, दालें खोजें...",
    "filter_category": "श्रेणियां",
    "filter_location": "जिला / राज्य के अनुसार",
    "filter_farming_type": "खेती का प्रकार",
    "filter_organic_only": "100% प्रमाणित जैविक (Organic)",
    "filter_price_max": "अधिकतम मूल्य (प्रति किलो)",
    "sort_by": "क्रमबद्ध करें",
    "sort_featured": "विशेष",
    "sort_price_asc": "कीमत: कम से ज्यादा",
    "sort_price_desc": "कीमत: ज्यादा से कम",
    "sort_freshness": "ताजा कटाई",
    
    // Product Card
    "harvested_on": "कटाई की तिथि",
    "farmer_label": "किसान",
    "middleman_retail": "बाजार भाव",
    "direct_price": "सीधा भाव",
    "btn_view_details": "विवरण देखें",
    "btn_add_cart": "कार्ट में जोड़ें",
    "btn_buy_now": "अभी खरीदें",
    "btn_call_farmer": "किसान को कॉल करें",
    "btn_whatsapp_farmer": "व्हाट्सएप करें",
    "organic_badge": "जैविक",
    "verified_farmer": "सत्यापित किसान",
    "in_stock": "उपलब्ध है",
    
    // Product Details Page
    "prod_detail_title": "उत्पाद विवरण",
    "prod_farmer_story": "किसान प्रोफाइल और खेत का विवरण",
    "prod_shelf_life": "शेल्फ लाइफ",
    "prod_min_order": "न्यूनतम ऑर्डर",
    "prod_harvest_date": "कटाई की तिथि",
    "prod_location": "खेत का स्थान",
    "prod_description": "इस फसल के बारे में",
    "prod_quantity": "मात्रा (किलो/इकाई)",
    "prod_price_breakdown": "पारदर्शी मूल्य विभाजन",
    "prod_direct_impact": "इस खरीद से ₹{amount} बिना किसी दलाल के 100% सीधे किसान के बैंक खाते में जाते हैं।",
    
    // Cart & Checkout
    "cart_title": "आपकी ताजी टोकरी",
    "cart_empty": "आपकी कार्ट खाली है। किसान का समर्थन करने के लिए उत्पाद जोड़ें!",
    "cart_subtotal": "कुल मूल्य",
    "cart_middleman_savings": "मंडी के मुकाबले आपकी कुल बचत",
    "cart_delivery_charge": "सीधा परिवहन / डिलीवरी शुल्क",
    "cart_total": "देय कुल राशि",
    "btn_proceed_checkout": "सीधे ऑर्डर के लिए आगे बढ़ें",
    "checkout_title": "डिलीवरी का पता",
    "checkout_name": "पूरा नाम",
    "checkout_phone": "मोबाइल नंबर",
    "checkout_address": "घर का पता",
    "checkout_city": "शहर / कस्बा",
    "checkout_pincode": "पिन कोड",
    "payment_method": "भुगतान विधि",
    "pay_cod": "कैश ऑन डिलीवरी (सामान मिलने पर)",
    "pay_upi": "UPI / किसान QR कोड (GPay, PhonePe, Paytm)",
    "btn_place_order": "ऑर्डर कन्फर्म करें",
    
    // Orders
    "orders_title": "मेरे ऑर्डर",
    "order_id": "ऑर्डर संख्या #",
    "order_date": "ऑर्डर की तारीख",
    "order_status": "स्थिति",
    "status_pending": "किसान की पुष्टि की प्रतीक्षा",
    "status_confirmed": "किसान द्वारा स्वीकृत (पैकिंग जारी)",
    "status_dispatched": "खेत से रवाना",
    "status_delivered": "सफलतापूर्वक डिलीवर",
    "status_cancelled": "रद्द किया गया",
    
    // Farmer Dashboard
    "dash_title": "किसान प्रबंधन पोर्टल",
    "dash_subtitle": "अपनी फसलें, उचित मूल्य और ग्राहकों के ऑर्डर यहीं से प्रबंधित करें",
    "dash_stat_sales": "कुल फसल बिक्री",
    "dash_stat_active": "बिक्री के लिए तैयार फसलें",
    "dash_stat_orders": "प्राप्त ऑर्डर",
    "dash_stat_delivered": "पूरी हुई डिलीवरी",
    "btn_add_product": "+ नई फसल जोड़ें",
    "my_products": "मेरी फसल सूची",
    "incoming_orders": "ग्राहकों से प्राप्त सीधे ऑर्डर",
    "table_crop": "फसल का नाम",
    "table_category": "श्रेणी",
    "table_direct_price": "आपका तय मूल्य",
    "table_market_price": "मंडी खुदरा मूल्य",
    "table_stock": "उपलब्ध मात्रा",
    "table_status": "स्थिति",
    "table_actions": "कार्रवाई",
    
    // Add Product Modal
    "modal_add_title": "खेत की नई फसल सूचीबद्ध करें",
    "modal_crop_name": "फसल / उत्पाद का नाम",
    "modal_category": "श्रेणी",
    "modal_unit": "इकाई (किलो, क्विंटल, दर्जन, लीटर)",
    "modal_farmer_price": "आपका सीधा दाम (₹ प्रति इकाई)",
    "modal_market_price": "बाजार का अनुमानित खुदरा भाव (₹)",
    "modal_stock": "कुल उपलब्ध मात्रा",
    "modal_harvest_date": "फसल कटाई की तिथि",
    "modal_location": "खेत का गांव / जिला",
    "modal_image": "फसल की तस्वीर या URL",
    "modal_organic": "क्या यह 100% जैविक (Organic) है?",
    "modal_desc": "फसल का विवरण और खेती का तरीका",
    "btn_save_produce": "फसल प्रकाशित करें",
    
    // Auth
    "auth_farmer_tab": "किसान पोर्टल",
    "auth_consumer_tab": "उपभोक्ता / खरीदार",
    "auth_login_title": "AgriDirect में आपका स्वागत है",
    "auth_register_title": "नया खाता बनाएं",
    "auth_role_farmer": "मैं एक किसान हूँ (फसल बेचने के लिए)",
    "auth_role_consumer": "मैं एक उपभोक्ता हूँ (शुद्ध उपज खरीदने के लिए)",
    "auth_name": "पूरा नाम",
    "auth_farm_name": "खेत / फार्म का नाम (किसानों के लिए)",
    "auth_phone": "मोबाइल नंबर",
    "auth_location": "गांव / कस्बा / जिला",
    "auth_email": "ईमेल (वैकल्पिक)",
    "auth_password": "पासवर्ड",
    "btn_login": "लॉग इन करें",
    "btn_register": "खाता बनाएं",
    "auth_switch_to_register": "खाता नहीं है? यहाँ रजिस्टर करें",
    "auth_switch_to_login": "पहले से पंजीकृत हैं? लॉग इन करें",
    "quick_demo_login": "डेमो लॉग इन (एक क्लिक में):",
    
    // Footer
    "footer_mission": "AgriDirect भारतीय किसानों को सीधे शहरी परिवारों से जोड़ता है, बिचौलियों के शोषण को समाप्त करता है और कृषि को सम्मान और उचित लाभ दिलाता है।",
    "footer_links": "महत्वपूर्ण लिंक",
    "footer_contact": "किसान हेल्पलाइन",
    "footer_rights": "सर्वाधिकार सुरक्षित। भारतीय किसानों के समर्थन में।"
  }
};

// Current Active Language state
let currentLang = localStorage.getItem('agri_lang') || 'en';

/**
 * Get translated text for given key
 */
function t(key, params = {}) {
  const langObj = translations[currentLang] || translations.en;
  let text = langObj[key] || translations.en[key] || key;
  
  // Replace parameters like {amount}
  for (const [pKey, pVal] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), pVal);
  }
  return text;
}

/**
 * Update all DOM elements with data-i18n attributes
 */
function updatePageLanguage() {
  // Update text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  // Update HTML content if specified
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (key) {
      el.innerHTML = t(key);
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.setAttribute('placeholder', t(key));
    }
  });

  // Update titles
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.setAttribute('title', t(key));
    }
  });

  // Update language selector dropdown if exists
  const langSelect = document.getElementById('globalLanguageSelect');
  if (langSelect && langSelect.value !== currentLang) {
    langSelect.value = currentLang;
  }
}

/**
 * Set current language and refresh DOM
 */
function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('agri_lang', lang);
    updatePageLanguage();
    document.documentElement.lang = lang;
    
    // Dispatch custom event so pages can re-render dynamic elements
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = currentLang;
  updatePageLanguage();
});
