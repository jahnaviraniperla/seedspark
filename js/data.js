/**
 * AgriDirect - LocalStorage Data Store & Initializer
 * Preloaded with realistic Indian farming data, verified farmers, produce catalogs, and orders.
 */

const DEFAULT_FARMERS = [
  {
    id: "farmer_1",
    name: "Ramesh Reddy",
    farmName: "Sri Lakshmi Natural Farms",
    phone: "+91 98480 12345",
    whatsapp: "919848012345",
    village: "Tenali",
    district: "Guntur, Andhra Pradesh",
    farmingType: "100% Organic & ZBNF",
    experienceYears: 14,
    avatar: "🌾",
    bio: "Passionate about Zero Budget Natural Farming (ZBNF). Growing heirloom native crops without chemicals for 14 years."
  },
  {
    id: "farmer_2",
    name: "Suresh Patil",
    farmName: "Sahyadri Agro Orchards",
    phone: "+91 94220 54321",
    whatsapp: "919422054321",
    village: "Niphad",
    district: "Nashik, Maharashtra",
    farmingType: "Direct Orchard Harvest",
    experienceYears: 18,
    avatar: "🚜",
    bio: "Third-generation onion and grape farmer. Eliminating wholesale mandi cartels to bring freshest harvest straight to kitchens."
  },
  {
    id: "farmer_3",
    name: "Rajesh Sharma",
    farmName: "Himalayan Apple Valley",
    phone: "+91 98160 98765",
    whatsapp: "919816098765",
    village: "Kotgarh",
    district: "Shimla, Himachal Pradesh",
    farmingType: "Natural Mountain Farming",
    experienceYears: 12,
    avatar: "🍎",
    bio: "High altitude pesticide-free apple orchards. Harvesting naturally tree-ripened royal delicious and golden apples."
  },
  {
    id: "farmer_4",
    name: "Kavitha Rao",
    farmName: "Kakatiya Organic Greens",
    phone: "+91 99890 11223",
    whatsapp: "919989011223",
    village: "Hanamkonda",
    district: "Warangal, Telangana",
    farmingType: "Certified Organic & Vermicompost",
    experienceYears: 9,
    avatar: "👩‍🌾",
    bio: "Women-led organic cooperative farm cultivating fresh daily leafy vegetables, tomatoes, and organic pulses."
  },
  {
    id: "farmer_5",
    name: "Mahesh Gowda",
    farmName: "Kaveri Basin Heritage Grains",
    phone: "+91 94480 33445",
    whatsapp: "919448033445",
    village: "Pandavapura",
    district: "Mandya, Karnataka",
    farmingType: "Desi Heritage Seeds",
    experienceYears: 20,
    avatar: "🌱",
    bio: "Preserving ancient unpolished rice varieties, organic pulses, and raw forest honey."
  }
];

const DEFAULT_PRODUCTS = [
  {
    id: "prod_1",
    name: "Fresh Tomatoes",
    category: "vegetables",
    farmerId: "farmer_1",
    farmerName: "Ramesh Reddy",
    location: "Guntur, Andhra Pradesh",
    farmerPrice: 24,
    marketPrice: 45,
    unit: "kg",
    minOrder: 2,
    stock: 450,
    harvestDate: "2026-08-26",
    shelfLifeDays: 7,
    isOrganic: true,
    rating: 4.9,
    reviewsCount: 38,
    image: "https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg",
    description: "Sun-ripened, naturally sweet heirloom country tomatoes harvested early this morning. Packed with natural lycopene and free from artificial ripening chemicals.",
    farmingMethod: "Natural Jeevamrutha manure, zero chemical pesticides"
  },
  {
    id: "prod_2",
    name: "Red Onions",
    category: "vegetables",
    farmerId: "farmer_2",
    farmerName: "Suresh Patil",
    location: "Nashik, Maharashtra",
    farmerPrice: 28,
    marketPrice: 50,
    unit: "kg",
    minOrder: 5,
    stock: 1200,
    harvestDate: "2026-08-25",
    shelfLifeDays: 30,
    isOrganic: false,
    rating: 4.8,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80",
    description: "Authentic premium Nashik quality medium-to-large size red onions with thick dry skin for extended shelf life. Straight from harvest fields.",
    farmingMethod: "Drip irrigated, sun-cured naturally on farm beds"
  },
  {
    id: "prod_3",
    name: "Delicious Apples",
    category: "fruits",
    farmerId: "farmer_3",
    farmerName: "Rajesh Sharma",
    location: "Shimla, Himachal Pradesh",
    farmerPrice: 130,
    marketPrice: 220,
    unit: "kg",
    minOrder: 2,
    stock: 350,
    harvestDate: "2026-08-24",
    shelfLifeDays: 20,
    isOrganic: true,
    rating: 5.0,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    description: "Crisp, deeply aromatic red apples harvested at 7,500 ft altitude. No wax coating, no cold storage gas treatments. Pure mountain crunch.",
    farmingMethod: "Rainfed mountain orchard, cow dung compost"
  },
  {
    id: "prod_4",
    name: "Aged Sona Masoori Rice (సోనా మసూరి బియ్యం - 12 Months Old)",
    category: "grains",
    farmerId: "farmer_1",
    farmerName: "Ramesh Reddy",
    location: "Tenali, Guntur",
    farmerPrice: 56,
    marketPrice: 85,
    unit: "kg",
    minOrder: 10,
    stock: 2500,
    harvestDate: "2026-08-10",
    shelfLifeDays: 365,
    isOrganic: true,
    rating: 4.9,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    description: "Single origin 12-month aged premium slender grain Sona Masoori raw rice. Cooks fluffy, light on stomach, and holds exquisite natural aroma.",
    farmingMethod: "Krishna river canal irrigation, organic neem cake pest control"
  },
  {
    id: "prod_5",
    name: "Desi Unpolished Toor Dal (నాటు కందిపప్పు)",
    category: "pulses",
    farmerId: "farmer_4",
    farmerName: "Kavitha Rao",
    location: "Warangal, Telangana",
    farmerPrice: 135,
    marketPrice: 195,
    unit: "kg",
    minOrder: 1,
    stock: 600,
    harvestDate: "2026-08-18",
    shelfLifeDays: 180,
    isOrganic: true,
    rating: 4.8,
    reviewsCount: 41,
    image: "https://aramiyarkai.com/admin/uploads/products/toor-dal_U-171.webp",
    description: "Traditional stone-milled unpolished yellow pigeon peas (Toor dal). Retains natural protein layer and cooks into rich golden sambar and dal fry.",
    farmingMethod: "Rainfed dryland organic farming, hand sorted"
  },
  {
    id: "prod_6",
    name: "Guntur Red Chilli",
    category: "spices",
    farmerId: "farmer_1",
    farmerName: "Ramesh Reddy",
    location: "Guntur, Andhra Pradesh",
    farmerPrice: 190,
    marketPrice: 320,
    unit: "kg",
    minOrder: 1,
    stock: 400,
    harvestDate: "2026-08-20",
    shelfLifeDays: 240,
    isOrganic: true,
    rating: 4.9,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80",
    description: "World famous fiery Guntur Teja red chillies dried in natural tropical sunlight. Intense red color (ASTA value) and sharp punch for pickles and masalas.",
    farmingMethod: "Sun dried on clean cotton mats, non-chemical curing"
  },
  {
    id: "prod_7",
    name: "Pure Cow Desi Ghee",
    category: "dairy",
    farmerId: "farmer_5",
    farmerName: "Mahesh Gowda",
    location: "Mandya, Karnataka",
    farmerPrice: 850,
    marketPrice: 1400,
    unit: "liter",
    minOrder: 1,
    stock: 80,
    harvestDate: "2026-08-26",
    shelfLifeDays: 180,
    isOrganic: true,
    rating: 5.0,
    reviewsCount: 77,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7NAyvPLrk1wIxJd5ZHnT5w8YUtgH7Ad81Tvl351eKaFyGEvPxPHg64A&s=10",
    description: "Prepared from grass-fed indigenous Gir cow curd churned with wooden bilona and slow-cooked over firewood. Rich granular texture and soothing aroma.",
    farmingMethod: "Cruelty-free traditional gaushala, open pasture grazing"
  },
  {
    id: "prod_8",
    name: "Fresh Organic Green Palak Spinach (తాజా పాలకూర)",
    category: "vegetables",
    farmerId: "farmer_4",
    farmerName: "Kavitha Rao",
    location: "Warangal, Telangana",
    farmerPrice: 18,
    marketPrice: 35,
    unit: "bunch",
    minOrder: 3,
    stock: 200,
    harvestDate: "2026-08-27",
    shelfLifeDays: 3,
    isOrganic: true,
    rating: 4.7,
    reviewsCount: 24,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    description: "Tender leafy spinach harvested at sunrise today. Loaded with iron, washed in fresh borewell water, zero chemical residue.",
    farmingMethod: "Vermicompost enriched soil, harvested within 6 hours"
  },
  {
    id: "prod_9",
    name: "Tree-Ripened Golden Papaya (బొప్పాయి పండు)",
    category: "fruits",
    farmerId: "farmer_2",
    farmerName: "Suresh Patil",
    location: "Nashik, Maharashtra",
    farmerPrice: 32,
    marketPrice: 60,
    unit: "kg",
    minOrder: 2,
    stock: 280,
    harvestDate: "2026-08-26",
    shelfLifeDays: 5,
    isOrganic: true,
    rating: 4.8,
    reviewsCount: 31,
    image: "https://cdn.jwplayer.com/v2/media/8wwjD9bR/poster.jpg?width=1280",
    description: "Sweet, juicy Red Lady variety papayas ripened naturally under tree foliage without calcium carbide or chemical gas treatments.",
    farmingMethod: "Bio-fertilizers, organic mulch"
  },
  {
    id: "prod_10",
    name: "Raw Turmeric",
    category: "spices",
    farmerId: "farmer_1",
    farmerName: "Ramesh Reddy",
    location: "Tenali, Guntur",
    farmerPrice: 210,
    marketPrice: 350,
    unit: "kg",
    minOrder: 1,
    stock: 180,
    harvestDate: "2026-08-15",
    shelfLifeDays: 365,
    isOrganic: true,
    rating: 5.0,
    reviewsCount: 49,
    image: "https://cdn.shopaccino.com/rootz/products/picture2-351439520275241_m.jpg?v=686",
    description: "Pure heirloom turmeric with over 5.8% natural curcumin content. Solar dried and finely ground without any lead chromate or artificial coloring.",
    farmingMethod: "Traditional natural farming, steam boiled and solar dried"
  },
  {
    id: "prod_11",
    name: "Whole Wheat Grain",
    category: "grains",
    farmerId: "farmer_5",
    farmerName: "Mahesh Gowda",
    location: "Mandya, Karnataka",
    farmerPrice: 42,
    marketPrice: 68,
    unit: "kg",
    minOrder: 10,
    stock: 1800,
    harvestDate: "2026-08-12",
    shelfLifeDays: 365,
    isOrganic: false,
    rating: 4.8,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    description: "Golden heavy-kernel Sharbati wheat grown in rich black cotton soil. Makes soft, fluffy rotis that stay moist for hours.",
    farmingMethod: "Naturally dry-cured, stone cleaned"
  },
  {
    id: "prod_12",
    name: "Green Moong Dal - Whole Desi (ఆకుపచ్చ పెసలు)",
    category: "pulses",
    farmerId: "farmer_4",
    farmerName: "Kavitha Rao",
    location: "Warangal, Telangana",
    farmerPrice: 120,
    marketPrice: 175,
    unit: "kg",
    minOrder: 2,
    stock: 500,
    harvestDate: "2026-08-22",
    shelfLifeDays: 180,
    isOrganic: true,
    rating: 4.9,
    reviewsCount: 36,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWK8YAEuLRb1yefJKpMj7iOtRrkgbQuZiv1z7wWZdAJpHBnl_wMttS7a6U&s=10",
    description: "High-sprouting rate whole green gram (moong). Perfect for healthy raw salad sprouts, pesarattu dosas, and nourishing khichdi.",
    farmingMethod: "Intercropped with organic millets, chemical-free"
  }
];

const DEFAULT_ORDERS = [
  {
    id: "ORD-98421",
    date: "2026-08-27",
    customerName: "Ananya Sharma",
    customerPhone: "+91 98765 43210",
    deliveryAddress: "Flat 402, Green Meadows Apt, Madhapur, Hyderabad, 500081",
    farmerId: "farmer_1",
    farmerName: "Ramesh Reddy",
    items: [
      { productId: "prod_1", name: "Farm Fresh Country Tomatoes", price: 24, quantity: 5, unit: "kg" },
      { productId: "prod_4", name: "Aged Sona Masoori Rice (10kg)", price: 56, quantity: 10, unit: "kg" }
    ],
    itemSubtotal: 680,
    middlemanSavings: 395,
    deliveryFee: 40,
    totalAmount: 720,
    paymentMethod: "UPI / Direct Farmer Transfer",
    status: "dispatched", // pending, confirmed, dispatched, delivered
    timeline: [
      { step: "Order Placed", time: "Aug 27, 09:30 AM", done: true },
      { step: "Farmer Confirmed & Packed", time: "Aug 27, 11:15 AM", done: true },
      { step: "Dispatched from Farm", time: "Aug 27, 02:00 PM", done: true },
      { step: "Delivered Fresh", time: "Expected Aug 28", done: false }
    ]
  },
  {
    id: "ORD-98319",
    date: "2026-08-26",
    customerName: "Venkata Rao",
    customerPhone: "+91 94401 22334",
    deliveryAddress: "H.No 12-4-88, Benz Circle, Vijayawada, 520010",
    farmerId: "farmer_4",
    farmerName: "Kavitha Rao",
    items: [
      { productId: "prod_5", name: "Desi Unpolished Toor Dal", price: 135, quantity: 3, unit: "kg" },
      { productId: "prod_8", name: "Fresh Organic Green Palak", price: 18, quantity: 4, unit: "bunch" }
    ],
    itemSubtotal: 477,
    middlemanSavings: 248,
    deliveryFee: 30,
    totalAmount: 507,
    paymentMethod: "Cash on Delivery",
    status: "delivered",
    timeline: [
      { step: "Order Placed", time: "Aug 26, 08:00 AM", done: true },
      { step: "Farmer Confirmed & Packed", time: "Aug 26, 09:45 AM", done: true },
      { step: "Dispatched from Farm", time: "Aug 26, 12:30 PM", done: true },
      { step: "Delivered Fresh", time: "Aug 26, 06:15 PM", done: true }
    ]
  }
];

const DEFAULT_CATEGORIES = [
  { id: "all", nameKey: "cat_all", icon: "🌱" },
  { id: "vegetables", nameKey: "cat_vegetables", icon: "🍅" },
  { id: "fruits", nameKey: "cat_fruits", icon: "🍎" },
  { id: "grains", nameKey: "cat_grains", icon: "🌾" },
  { id: "pulses", nameKey: "cat_pulses", icon: "🥣" },
  { id: "spices", nameKey: "cat_spices", icon: "🌶️" },
  { id: "dairy", nameKey: "cat_dairy", icon: "🥛" }
];

/**
 * Data Storage Manager for AgriDirect
 */
const AgriData = {
  init() {
    if (!localStorage.getItem('agri_farmers')) {
      localStorage.setItem('agri_farmers', JSON.stringify(DEFAULT_FARMERS));
    }
    if (!localStorage.getItem('agri_products')) {
      localStorage.setItem('agri_products', JSON.stringify(DEFAULT_PRODUCTS));
    } else {
      try {
        const storedProducts = JSON.parse(localStorage.getItem('agri_products') || '[]');
        const updated = storedProducts.map(p => {
          const def = DEFAULT_PRODUCTS.find(dp => dp.id === p.id);
          return def ? { ...p, name: def.name, image: def.image } : p;
        });
        localStorage.setItem('agri_products', JSON.stringify(updated));
      } catch (e) {}
    }
    if (!localStorage.getItem('agri_orders')) {
      localStorage.setItem('agri_orders', JSON.stringify(DEFAULT_ORDERS));
    }
    if (!localStorage.getItem('agri_cart')) {
      localStorage.setItem('agri_cart', JSON.stringify([]));
    }
  },

  // Farmers
  getFarmers() {
    return JSON.parse(localStorage.getItem('agri_farmers') || '[]');
  },

  getFarmerById(id) {
    const farmers = this.getFarmers();
    return farmers.find(f => f.id === id) || farmers[0];
  },

  // Products
  getProducts() {
    return JSON.parse(localStorage.getItem('agri_products') || '[]');
  },

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  },

  addProduct(product) {
    const products = this.getProducts();
    products.unshift(product);
    localStorage.setItem('agri_products', JSON.stringify(products));
    return product;
  },

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      localStorage.setItem('agri_products', JSON.stringify(products));
      return products[index];
    }
    return null;
  },

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem('agri_products', JSON.stringify(products));
    return true;
  },

  // Orders
  getOrders() {
    return JSON.parse(localStorage.getItem('agri_orders') || '[]');
  },

  getOrderById(id) {
    const orders = this.getOrders();
    return orders.find(o => o.id === id);
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    orders.unshift(orderData);
    localStorage.setItem('agri_orders', JSON.stringify(orders));
    return orderData;
  },

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      
      // Update timeline
      if (newStatus === 'confirmed') {
        order.timeline[1].done = true;
        order.timeline[1].time = "Just now";
      } else if (newStatus === 'dispatched') {
        order.timeline[1].done = true;
        order.timeline[2].done = true;
        order.timeline[2].time = "Just now";
      } else if (newStatus === 'delivered') {
        order.timeline.forEach(t => t.done = true);
        order.timeline[3].time = "Delivered just now";
      }
      
      localStorage.setItem('agri_orders', JSON.stringify(orders));
      return order;
    }
    return null;
  },

  // Cart
  getCart() {
    return JSON.parse(localStorage.getItem('agri_cart') || '[]');
  },

  saveCart(cart) {
    localStorage.setItem('agri_cart', JSON.stringify(cart));
    // Trigger cart updated event
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
  },

  addToCart(productId, quantity = 1) {
    const product = this.getProductById(productId);
    if (!product) return false;

    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.productId === productId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        farmerName: product.farmerName,
        farmerId: product.farmerId,
        farmerPrice: product.farmerPrice,
        marketPrice: product.marketPrice,
        unit: product.unit,
        image: product.image,
        quantity: quantity,
        minOrder: product.minOrder || 1
      });
    }

    this.saveCart(cart);
    return true;
  },

  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.productId !== productId);
    this.saveCart(cart);
  },

  updateCartQuantity(productId, newQty) {
    const cart = this.getCart();
    const item = cart.find(i => i.productId === productId);
    if (item) {
      if (newQty <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = newQty;
        this.saveCart(cart);
      }
    }
  },

  clearCart() {
    this.saveCart([]);
  },

  // Compute Cart Savings & Subtotals
  getCartSummary() {
    const cart = this.getCart();
    let subtotal = 0;
    let marketEquivalentTotal = 0;
    let itemCount = 0;

    cart.forEach(item => {
      subtotal += item.farmerPrice * item.quantity;
      marketEquivalentTotal += item.marketPrice * item.quantity;
      itemCount += item.quantity;
    });

    const savings = Math.max(0, marketEquivalentTotal - subtotal);
    const delivery = subtotal > 0 ? 30 : 0;
    const finalTotal = subtotal + delivery;

    return {
      subtotal,
      marketEquivalentTotal,
      savings,
      delivery,
      finalTotal,
      itemCount,
      uniqueItemCount: cart.length
    };
  }
};

// Initialize default seed data immediately
AgriData.init();
