/**
 * AgriDirect - Products & Marketplace Controller
 * Handles product rendering, search, category filtering, price filters, and sorting.
 */

const AgriProducts = {
  activeCategory: 'all',
  searchQuery: '',
  maxPrice: 1000,
  organicOnly: false,
  selectedLocation: 'all',
  sortBy: 'featured',

  // Initialize marketplace page
  initMarketplace() {
    this.renderCategoryPills();
    this.setupFilterListeners();
    this.renderProducts();
  },

  // Setup UI listeners on marketplace page
  setupFilterListeners() {
    const searchInput = document.getElementById('marketplaceSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.renderProducts();
      });
    }

    const priceSlider = document.getElementById('priceRangeSlider');
    const priceDisplay = document.getElementById('priceRangeDisplay');
    if (priceSlider && priceDisplay) {
      priceSlider.addEventListener('input', (e) => {
        this.maxPrice = parseInt(e.target.value, 10);
        priceDisplay.textContent = `₹${this.maxPrice}`;
        this.renderProducts();
      });
    }

    const organicCheckbox = document.getElementById('filterOrganicCheckbox');
    if (organicCheckbox) {
      organicCheckbox.addEventListener('change', (e) => {
        this.organicOnly = e.target.checked;
        this.renderProducts();
      });
    }

    const locationSelect = document.getElementById('filterLocationSelect');
    if (locationSelect) {
      locationSelect.addEventListener('change', (e) => {
        this.selectedLocation = e.target.value;
        this.renderProducts();
      });
    }

    const sortSelect = document.getElementById('sortBySelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.renderProducts();
      });
    }

    // Re-render when language changes
    window.addEventListener('languageChanged', () => {
      this.renderCategoryPills();
      this.renderProducts();
    });
  },

  // Render Category selection buttons
  renderCategoryPills() {
    const container = document.getElementById('categoryPillsContainer');
    if (!container) return;

    container.innerHTML = DEFAULT_CATEGORIES.map(cat => `
      <button class="category-tile ${this.activeCategory === cat.id ? 'active' : ''}" 
              onclick="AgriProducts.setCategory('${cat.id}')">
        <span class="category-icon">${cat.icon}</span>
        <span class="category-name">${t(cat.nameKey)}</span>
      </button>
    `).join('');
  },

  setCategory(catId) {
    this.activeCategory = catId;
    this.renderCategoryPills();
    this.renderProducts();
  },

  // Filter and Sort Products
  getFilteredProducts() {
    let list = AgriData.getProducts();

    // Category
    if (this.activeCategory && this.activeCategory !== 'all') {
      list = list.filter(p => p.category === this.activeCategory);
    }

    // Search Query
    if (this.searchQuery) {
      list = list.filter(p => 
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.description.toLowerCase().includes(this.searchQuery) ||
        p.location.toLowerCase().includes(this.searchQuery) ||
        p.farmerName.toLowerCase().includes(this.searchQuery)
      );
    }

    // Max Price
    if (this.maxPrice < 1000) {
      list = list.filter(p => p.farmerPrice <= this.maxPrice);
    }

    // Organic Filter
    if (this.organicOnly) {
      list = list.filter(p => p.isOrganic === true);
    }

    // Location Filter
    if (this.selectedLocation && this.selectedLocation !== 'all') {
      list = list.filter(p => p.location.toLowerCase().includes(this.selectedLocation.toLowerCase()));
    }

    // Sorting
    if (this.sortBy === 'price_asc') {
      list.sort((a, b) => a.farmerPrice - b.farmerPrice);
    } else if (this.sortBy === 'price_desc') {
      list.sort((a, b) => b.farmerPrice - a.farmerPrice);
    } else if (this.sortBy === 'freshness') {
      list.sort((a, b) => new Date(b.harvestDate) - new Date(a.harvestDate));
    }

    return list;
  },

  // Generate HTML for a single product card
  createProductCardHtml(product) {
    const savings = Math.max(0, product.marketPrice - product.farmerPrice);
    const savingsPercent = Math.round((savings / product.marketPrice) * 100);
    const displayName = getProductName(product);

    return `
      <div class="product-card">
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${displayName}" class="product-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'">
          <div class="product-tags">
            ${product.isOrganic ? `<span class="badge badge-organic">🌱 ${t('organic_badge')}</span>` : ''}
            <span class="badge badge-verified">✓ ${t('verified_farmer')}</span>
          </div>
          ${savings > 0 ? `
            <div class="product-savings-pill">
              🔥 ${t('compare_you_save')} ${savingsPercent}%
            </div>
          ` : ''}
        </div>

        <div class="product-body">
          <span class="product-category-sub">${t(`cat_${product.category}`) || product.category}</span>
          <h3 class="product-title">
            <a href="product-detail.html?id=${product.id}">${displayName}</a>
          </h3>

          <div class="product-location">
            <span>📍</span> <span>${product.location}</span>
          </div>

          <div class="farmer-mini-info">
            <div class="farmer-avatar-sm">${product.farmerName.charAt(0)}</div>
            <div>
              <strong>${product.farmerName}</strong>
              <div style="font-size:0.75rem; color:var(--text-muted);">${t('harvested_on')}: ${product.harvestDate}</div>
            </div>
          </div>

          <div class="product-price-box">
            <div class="price-main-row">
              <span class="price-current">₹${product.farmerPrice}</span>
              <span class="price-market">₹${product.marketPrice}</span>
              <span class="price-unit">/ ${product.unit}</span>
            </div>
            <div class="middleman-diff-text">
              ✨ ${t('compare_you_save')} ₹${savings}/${product.unit} (${savingsPercent}% ${t('stat_savings')})
            </div>
          </div>

          <div class="product-actions">
            <a href="product-detail.html?id=${product.id}" class="btn btn-secondary btn-sm">
              ${t('btn_view_details')}
            </a>
            <button class="btn btn-primary btn-sm" onclick="AgriProducts.handleAddToCart('${product.id}', 1)">
              🛒 + ${t('btn_add_cart')}
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Render product grid
  renderProducts() {
    const container = document.getElementById('productsGridContainer');
    if (!container) return;

    const list = this.getFilteredProducts();
    const countDisplay = document.getElementById('productsCountDisplay');
    if (countDisplay) {
      countDisplay.textContent = `${list.length} ${t('market_title')}`;
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: white; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🌾</div>
          <h3 style="color: var(--primary-dark); margin-bottom: 0.5rem;">No crops found</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Try adjusting your search query, price slider, or category filters.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(p => this.createProductCardHtml(p)).join('');
  },

  // Add to cart helper with feedback
  handleAddToCart(productId, qty = 1) {
    const success = AgriData.addToCart(productId, qty);
    if (success) {
      const product = AgriData.getProductById(productId);
      AgriApp.showToast(`Added ${product ? getProductName(product) : 'item'} to your cart! 🛒`, 'success');
    }
  },

  // Render Product Detail Page
  renderProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id') || 'prod_1';
    const product = AgriData.getProductById(productId);

    const container = document.getElementById('productDetailContainer');
    if (!container) return;

    if (!product) {
      container.innerHTML = `
        <div style="text-align:center; padding:4rem;">
          <h2>Products Not Found</h2>
          <a href="marketplace.html" class="btn btn-primary" style="margin-top:1rem;">Back to Marketplace</a>
        </div>
      `;
      return;
    }

    const farmer = AgriData.getFarmerById(product.farmerId);
    const savings = Math.max(0, product.marketPrice - product.farmerPrice);
    const savingsPercent = Math.round((savings / product.marketPrice) * 100);
    const farmerProfitBoost = Math.round(((product.farmerPrice - (product.farmerPrice * 0.6)) / (product.farmerPrice * 0.6)) * 100);
    const displayName = getProductName(product);

    const whatsappText = encodeURIComponent(`Hello ${farmer.name}, I found your listing "${displayName}" on AgriDirect and would like to order.`);

    container.innerHTML = `
      <div class="product-detail-layout">
        <!-- Image & Badges -->
        <div class="product-detail-gallery">
          <img src="${product.image}" alt="${displayName}" class="gallery-main-img" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'">
          
          <div style="display:flex; gap:0.5rem; margin-top:1rem; flex-wrap:wrap;">
            ${product.isOrganic ? `<span class="badge badge-organic" style="font-size:0.85rem; padding:0.4rem 0.8rem;">🌱 100% Certified Organic</span>` : ''}
            <span class="badge badge-verified" style="font-size:0.85rem; padding:0.4rem 0.8rem;">✓ Verified Local Farmer</span>
            <span class="badge badge-direct" style="font-size:0.85rem; padding:0.4rem 0.8rem;">🌾 Zero Middlemen</span>
          </div>

          <!-- Farmer Profile Box -->
          <div class="farmer-contact-card">
            <div class="farmer-card-head">
              <div class="farmer-card-avatar">${farmer.avatar || '👨‍🌾'}</div>
              <div>
                <h4 style="font-size:1.1rem; color:var(--primary-dark); font-weight:800;">${farmer.name}</h4>
                <div style="font-size:0.85rem; color:var(--text-muted);">🏡 ${farmer.farmName}</div>
                <div style="font-size:0.82rem; color:var(--primary); font-weight:600;">📍 ${farmer.village}, ${farmer.district}</div>
              </div>
            </div>
            <p style="font-size:0.88rem; color:var(--text-main); margin-bottom:1rem; line-height:1.5;">"${farmer.bio}"</p>
            
            <div style="font-size:0.85rem; background:white; padding:0.75rem; border-radius:8px; border:1px solid #d8f3dc; margin-bottom:1rem;">
              <div>📞 <strong>Phone:</strong> ${farmer.phone}</div>
              <div>🌱 <strong>Farming Style:</strong> ${farmer.farmingType}</div>
              <div>⏳ <strong>Experience:</strong> ${farmer.experienceYears} Years in Farming</div>
            </div>

            <div class="farmer-contact-actions">
              <a href="tel:${farmer.phone.replace(/\s+/g, '')}" class="btn btn-secondary btn-sm" style="font-weight:700;">
                📞 ${t('btn_call_farmer')}
              </a>
              <a href="https://wa.me/${farmer.whatsapp}?text=${whatsappText}" target="_blank" class="btn btn-whatsapp btn-sm">
                💬 ${t('btn_whatsapp_farmer')}
              </a>
            </div>
          </div>
        </div>

        <!-- Product Information & Pricing Breakdown -->
        <div class="product-detail-info">
          <div style="font-size:0.85rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; letter-spacing:1px; margin-bottom:0.4rem;">
            ${t(`cat_${product.category}`) || product.category}
          </div>
          <h1 style="font-size:2rem; font-weight:800; color:var(--primary-dark); margin-bottom:0.75rem;">${displayName}</h1>
          
          <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; font-size:0.9rem; color:var(--text-muted);">
            <span>⭐ <strong>${product.rating}</strong> (${product.reviewsCount} customer reviews)</span>
            <span>•</span>
            <span>📍 ${product.location}</span>
          </div>

          <!-- Price Transparency Breakdown -->
          <div class="detail-price-card">
            <div style="font-size:0.9rem; font-weight:800; color:var(--primary-dark); margin-bottom:0.75rem; text-transform:uppercase; letter-spacing:0.5px;">
              📊 ${t('prod_price_breakdown')}
            </div>
            
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.75rem;">
              <div>
                <span style="font-size:2.2rem; font-weight:800; color:var(--primary-dark);">₹${product.farmerPrice}</span>
                <span style="color:var(--text-muted); font-size:1rem;">/ ${product.unit}</span>
              </div>
              <div style="text-align:right;">
                <div style="text-decoration:line-through; color:var(--text-light); font-size:1.1rem; font-weight:600;">Mandi Price: ₹${product.marketPrice}/${product.unit}</div>
                <div style="color:var(--success); font-weight:800; font-size:0.95rem;">You Save ₹${savings}/${product.unit} (${savingsPercent}%)</div>
              </div>
            </div>

            <div style="background:white; padding:0.85rem; border-radius:8px; font-size:0.85rem; border:1px solid var(--border-color); display:flex; flex-direction:column; gap:0.4rem;">
              <div style="display:flex; justify-content:space-between; color:#166534; font-weight:700;">
                <span>🌾 Farmer Direct Income (100%):</span>
                <span>₹${product.farmerPrice}/${product.unit}</span>
              </div>
              <div style="display:flex; justify-content:space-between; color:#991b1b; text-decoration:line-through;">
                <span>🚫 Middleman Cartel Commission:</span>
                <span>₹${savings}/${product.unit}</span>
              </div>
            </div>

            <div style="margin-top:0.75rem; font-size:0.85rem; color:var(--primary-dark); font-weight:600;">
              ✨ ${t('prod_direct_impact', { amount: product.farmerPrice })}
            </div>
          </div>

          <!-- Produce Specs -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:1.5rem 0;">
            <div style="background:var(--bg-subtle); padding:0.85rem; border-radius:8px;">
              <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700;">${t('prod_harvest_date')}</div>
              <div style="font-weight:700; color:var(--primary-dark);">${product.harvestDate}</div>
            </div>
            <div style="background:var(--bg-subtle); padding:0.85rem; border-radius:8px;">
              <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700;">${t('prod_shelf_life')}</div>
              <div style="font-weight:700; color:var(--primary-dark);">${product.shelfLifeDays} Days</div>
            </div>
            <div style="background:var(--bg-subtle); padding:0.85rem; border-radius:8px;">
              <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700;">${t('prod_min_order')}</div>
              <div style="font-weight:700; color:var(--primary-dark);">${product.minOrder} ${product.unit}</div>
            </div>
            <div style="background:var(--bg-subtle); padding:0.85rem; border-radius:8px;">
              <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700;">${t('in_stock')}</div>
              <div style="font-weight:700; color:var(--success);">${product.stock} ${product.unit} available</div>
            </div>
          </div>

          <!-- Description -->
          <div style="margin-bottom:1.5rem;">
            <h4 style="font-size:1rem; font-weight:700; color:var(--primary-dark); margin-bottom:0.5rem;">${t('prod_description')}</h4>
            <p style="color:var(--text-main); font-size:0.95rem; line-height:1.6;">${product.description}</p>
            <p style="color:var(--text-muted); font-size:0.88rem; margin-top:0.5rem;"><strong>Farming Practice:</strong> ${product.farmingMethod}</p>
          </div>

          <!-- Purchase Controls -->
          <div style="display:flex; gap:1rem; align-items:center; flex-wrap:wrap; margin-top:2rem; padding-top:1.5rem; border-top:1px solid var(--border-color);">
            <div style="display:flex; align-items:center; border:1.5px solid var(--border-color); border-radius:8px; overflow:hidden; background:white;">
              <button style="padding:0.6rem 1rem; border:none; background:var(--bg-subtle); cursor:pointer; font-weight:800; font-size:1.1rem;" onclick="AgriProducts.adjustDetailQty(-1, ${product.minOrder})">-</button>
              <span id="detailQtyVal" style="padding:0.6rem 1.25rem; font-weight:800; min-width:40px; text-align:center;">${product.minOrder}</span>
              <button style="padding:0.6rem 1rem; border:none; background:var(--bg-subtle); cursor:pointer; font-weight:800; font-size:1.1rem;" onclick="AgriProducts.adjustDetailQty(1, ${product.minOrder})">+</button>
            </div>

            <button class="btn btn-secondary btn-lg" onclick="AgriProducts.addDetailToCart('${product.id}')" style="flex:1;">
              🛒 ${t('btn_add_cart')}
            </button>

            <button class="btn btn-primary btn-lg" onclick="AgriProducts.buyNow('${product.id}')" style="flex:1;">
              ⚡ ${t('btn_buy_now')}
            </button>
          </div>
        </div>
      </div>
    `;
  },

  detailQuantity: 1,

  adjustDetailQty(delta, minOrder = 1) {
    const qtySpan = document.getElementById('detailQtyVal');
    if (!qtySpan) return;
    let current = parseInt(qtySpan.textContent, 10) || minOrder;
    current += delta;
    if (current < minOrder) current = minOrder;
    qtySpan.textContent = current;
    this.detailQuantity = current;
  },

  addDetailToCart(productId) {
    const qtySpan = document.getElementById('detailQtyVal');
    const qty = qtySpan ? parseInt(qtySpan.textContent, 10) : 1;
    this.handleAddToCart(productId, qty);
  },

  buyNow(productId) {
    const qtySpan = document.getElementById('detailQtyVal');
    const qty = qtySpan ? parseInt(qtySpan.textContent, 10) : 1;
    AgriData.addToCart(productId, qty);
    window.location.href = 'cart.html';
  }
};
