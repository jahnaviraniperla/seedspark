/**
 * AgriDirect - Shopping Cart & Direct Checkout Module
 */

const AgriCart = {
  initCartPage() {
    this.renderCart();
    this.setupCheckoutModal();

    window.addEventListener('languageChanged', () => {
      this.renderCart();
    });
  },

  renderCart() {
    const container = document.getElementById('cartItemsContainer');
    const summaryContainer = document.getElementById('cartSummaryContainer');
    if (!container) return;

    const cart = AgriData.getCart();
    const summary = AgriData.getCartSummary();

    if (cart.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:4rem 1rem; background:white; border-radius:16px; border:1px dashed #cbd5e1;">
          <div style="font-size:3.5rem; margin-bottom:1rem;">🛒</div>
          <h3 style="color:var(--primary-dark); margin-bottom:0.5rem;" data-i18n="cart_empty">${t('cart_empty')}</h3>
          <p style="color:var(--text-muted); margin-bottom:1.5rem;">Explore farm-fresh organic crops directly from verified growers.</p>
          <a href="marketplace.html" class="btn btn-primary btn-lg">🌾 ${t('hero_cta_buy')}</a>
        </div>
      `;
      if (summaryContainer) {
        summaryContainer.style.display = 'none';
      }
      return;
    }

    if (summaryContainer) {
      summaryContainer.style.display = 'block';
    }

    // Render items list
    container.innerHTML = cart.map(item => {
      const itemSavings = (item.marketPrice - item.farmerPrice) * item.quantity;
      const itemTotal = item.farmerPrice * item.quantity;
      const displayName = getProductName(item.productId, item.name);

      return `
        <div class="cart-item-card" style="background:white; border-radius:12px; border:1px solid var(--border-color); padding:1.25rem; margin-bottom:1rem; display:grid; grid-template-columns:90px 1fr auto auto; gap:1.25rem; align-items:center; box-shadow:var(--shadow-sm);">
          <img src="${item.image}" alt="${displayName}" style="width:90px; height:80px; object-fit:cover; border-radius:8px;" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'">
          
          <div>
            <h4 style="font-size:1.1rem; color:var(--primary-dark); margin-bottom:0.25rem;">
              <a href="product-detail.html?id=${item.productId}">${displayName}</a>
            </h4>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.35rem;">
              🧑‍🌾 Farmer: <strong>${item.farmerName}</strong>
            </div>
            <div style="display:flex; gap:0.5rem; align-items:baseline;">
              <span style="font-weight:800; color:var(--primary-dark); font-size:1.15rem;">₹${item.farmerPrice}</span>
              <span style="font-size:0.85rem; color:var(--text-light); text-decoration:line-through;">Mandi: ₹${item.marketPrice}</span>
              <span style="font-size:0.8rem; color:var(--text-muted);">/ ${item.unit}</span>
            </div>
            ${itemSavings > 0 ? `
              <div style="font-size:0.8rem; color:var(--success); font-weight:700; margin-top:0.2rem;">
                Saved ₹${itemSavings} by buying direct!
              </div>
            ` : ''}
          </div>

          <!-- Quantity Controls -->
          <div style="display:flex; align-items:center; border:1px solid var(--border-color); border-radius:8px; overflow:hidden;">
            <button style="padding:0.4rem 0.8rem; border:none; background:var(--bg-subtle); cursor:pointer; font-weight:800;" onclick="AgriCart.changeQuantity('${item.productId}', -1)">-</button>
            <span style="padding:0.4rem 0.8rem; font-weight:800; min-width:30px; text-align:center;">${item.quantity}</span>
            <button style="padding:0.4rem 0.8rem; border:none; background:var(--bg-subtle); cursor:pointer; font-weight:800;" onclick="AgriCart.changeQuantity('${item.productId}', 1)">+</button>
          </div>

          <!-- Total & Remove -->
          <div style="text-align:right;">
            <div style="font-size:1.25rem; font-weight:800; color:var(--primary-dark); margin-bottom:0.35rem;">
              ₹${itemTotal}
            </div>
            <button onclick="AgriCart.removeItem('${item.productId}')" style="background:none; border:none; color:var(--danger); font-size:0.82rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:0.2rem; margin-left:auto;">
              🗑️ Remove
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Render Order Summary
    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <div style="background:white; border-radius:16px; border:1px solid var(--border-color); padding:1.75rem; box-shadow:var(--shadow-sm); position:sticky; top:90px;">
          <h3 style="font-size:1.2rem; font-weight:800; color:var(--primary-dark); margin-bottom:1.25rem; padding-bottom:0.75rem; border-bottom:1px solid var(--border-color);">
            🧺 Price Summary
          </h3>

          <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem; font-size:0.95rem;">
            <span style="color:var(--text-muted);">${t('cart_subtotal')} (${summary.itemCount} items)</span>
            <span style="font-weight:700;">₹${summary.subtotal}</span>
          </div>

          <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem; font-size:0.95rem;">
            <span style="color:var(--text-muted);">${t('cart_delivery_charge')}</span>
            <span style="font-weight:700; color:#166534;">₹${summary.delivery} (Direct Farm Logistic)</span>
          </div>

          <!-- Middleman Savings Banner -->
          <div style="background:#fef9c3; border:1.5px dashed #ca8a04; border-radius:8px; padding:0.85rem; margin:1rem 0; font-size:0.88rem; color:#854d0e;">
            <div style="font-weight:800; font-size:0.95rem; margin-bottom:0.25rem;">
              🎉 ${t('cart_middleman_savings')}
            </div>
            <div>You are saving <strong>₹${summary.savings}</strong> directly compared to local market retail!</div>
          </div>

          <div style="display:flex; justify-content:space-between; margin:1.25rem 0 1.5rem; padding-top:1rem; border-top:2px dashed var(--border-color); font-size:1.35rem; font-weight:800; color:var(--primary-dark);">
            <span>${t('cart_total')}</span>
            <span>₹${summary.finalTotal}</span>
          </div>

          <button class="btn btn-primary btn-lg btn-full" onclick="AgriCart.openCheckoutModal()">
            ⚡ ${t('btn_proceed_checkout')}
          </button>
        </div>
      `;
    }
  },

  changeQuantity(productId, delta) {
    const cart = AgriData.getCart();
    const item = cart.find(i => i.productId === productId);
    if (item) {
      const newQty = item.quantity + delta;
      AgriData.updateCartQuantity(productId, newQty);
      this.renderCart();
    }
  },

  removeItem(productId) {
    AgriData.removeFromCart(productId);
    AgriApp.showToast('Item removed from cart', 'info');
    this.renderCart();
  },

  // Setup Checkout Modal
  setupCheckoutModal() {
    const user = AgriAuth.getCurrentUser();
    const nameInput = document.getElementById('checkoutNameInput');
    const phoneInput = document.getElementById('checkoutPhoneInput');
    const locationInput = document.getElementById('checkoutAddressInput');

    if (user) {
      if (nameInput && !nameInput.value) nameInput.value = user.name || '';
      if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '';
      if (locationInput && !locationInput.value) locationInput.value = user.location || '';
    }
  },

  openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      this.setupCheckoutModal();
      modal.classList.add('open');
    }
  },

  closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.remove('open');
    }
  },

  // Submit Order
  handlePlaceOrder(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('checkoutNameInput').value.trim();
    const phone = document.getElementById('checkoutPhoneInput').value.trim();
    const address = document.getElementById('checkoutAddressInput').value.trim();
    const city = document.getElementById('checkoutCityInput').value.trim();
    const pincode = document.getElementById('checkoutPincodeInput').value.trim();
    const paymentRadio = document.querySelector('input[name="paymentMethod"]:checked');
    const paymentMethod = paymentRadio ? paymentRadio.value : 'Cash on Delivery';

    if (!name || !phone || !address || !city) {
      AgriApp.showToast('Please fill in all required delivery fields.', 'error');
      return;
    }

    const cart = AgriData.getCart();
    if (cart.length === 0) {
      AgriApp.showToast('Your cart is empty.', 'error');
      return;
    }

    const summary = AgriData.getCartSummary();
    const firstFarmer = cart[0];

    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      customerName: name,
      customerPhone: phone,
      deliveryAddress: `${address}, ${city} - ${pincode}`,
      farmerId: firstFarmer.farmerId,
      farmerName: firstFarmer.farmerName,
      items: cart.map(i => ({
        productId: i.productId,
        name: i.name,
        price: i.farmerPrice,
        quantity: i.quantity,
        unit: i.unit
      })),
      itemSubtotal: summary.subtotal,
      middlemanSavings: summary.savings,
      deliveryFee: summary.delivery,
      totalAmount: summary.finalTotal,
      paymentMethod: paymentMethod,
      status: 'pending',
      timeline: [
        { step: "Order Placed", time: "Just now", done: true },
        { step: "Farmer Confirmed & Packing", time: "Pending", done: false },
        { step: "Dispatched from Farm", time: "Pending", done: false },
        { step: "Delivered Fresh", time: "Pending", done: false }
      ]
    };

    AgriData.createOrder(newOrder);
    AgriData.clearCart();
    this.closeCheckoutModal();

    AgriApp.showToast(`Order #${newOrder.id} placed successfully! 🎉`, 'success', 4000);

    setTimeout(() => {
      window.location.href = `orders.html?newOrderId=${newOrder.id}`;
    }, 800);
  }
};
