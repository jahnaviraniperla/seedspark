/**
 * AgriDirect - Order Tracking & History Controller
 */

const AgriOrders = {
  initOrdersPage() {
    this.renderOrders();

    window.addEventListener('languageChanged', () => {
      this.renderOrders();
    });
  },

  renderOrders() {
    const container = document.getElementById('ordersListContainer');
    if (!container) return;

    const orders = AgriData.getOrders();
    const urlParams = new URLSearchParams(window.location.search);
    const highlightId = urlParams.get('newOrderId');

    if (orders.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:4rem 1rem; background:white; border-radius:16px; border:1px dashed #cbd5e1;">
          <div style="font-size:3.5rem; margin-bottom:1rem;">📦</div>
          <h3 style="color:var(--primary-dark); margin-bottom:0.5rem;" data-i18n="orders_title">${t('orders_title')}</h3>
          <p style="color:var(--text-muted); margin-bottom:1.5rem;">You haven't placed any direct farm orders yet.</p>
          <a href="marketplace.html" class="btn btn-primary btn-lg">🌾 Shop Fresh Crops</a>
        </div>
      `;
      return;
    }

    container.innerHTML = orders.map(order => {
      const isHighlighted = order.id === highlightId;
      const farmer = AgriData.getFarmerById(order.farmerId);

      // Determine step statuses
      const statusMap = { 'pending': 1, 'confirmed': 2, 'dispatched': 3, 'delivered': 4 };
      const currentStepIdx = statusMap[order.status] || 1;

      return `
        <div class="order-card" style="${isHighlighted ? 'border:2px solid var(--primary); box-shadow:0 10px 25px rgba(45,106,79,0.15);' : ''}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; padding-bottom:1rem; border-bottom:1px solid var(--border-color);">
            <div>
              <div style="font-size:0.85rem; color:var(--text-muted);">${t('order_date')}: <strong>${order.date}</strong></div>
              <h3 style="font-size:1.3rem; color:var(--primary-dark); font-weight:800;">${t('order_id')} ${order.id}</h3>
            </div>

            <div style="display:flex; gap:0.5rem; align-items:center;">
              <span class="badge badge-status ${order.status}" style="font-size:0.9rem; padding:0.4rem 0.9rem;">
                ${t(`status_${order.status}`) || order.status}
              </span>
              <button class="btn btn-secondary btn-sm" onclick="AgriOrders.printInvoice('${order.id}')">
                🧾 Receipt / Invoice
              </button>
            </div>
          </div>

          <!-- Order Tracking Stepper -->
          <div class="order-stepper">
            <div class="step-node ${currentStepIdx >= 1 ? (currentStepIdx > 1 ? 'completed' : 'active') : ''}">
              <div class="step-circle">${currentStepIdx > 1 ? '✓' : '1'}</div>
              <div class="step-label">Placed</div>
            </div>
            <div class="step-node ${currentStepIdx >= 2 ? (currentStepIdx > 2 ? 'completed' : 'active') : ''}">
              <div class="step-circle">${currentStepIdx > 2 ? '✓' : '2'}</div>
              <div class="step-label">Confirmed & Packed</div>
            </div>
            <div class="step-node ${currentStepIdx >= 3 ? (currentStepIdx > 3 ? 'completed' : 'active') : ''}">
              <div class="step-circle">${currentStepIdx > 3 ? '✓' : '3'}</div>
              <div class="step-label">Dispatched from Farm</div>
            </div>
            <div class="step-node ${currentStepIdx >= 4 ? 'completed' : ''}">
              <div class="step-circle">${currentStepIdx >= 4 ? '✓' : '4'}</div>
              <div class="step-label">Delivered Fresh</div>
            </div>
          </div>

          <!-- Order Items Grid -->
          <div style="background:var(--bg-subtle); border-radius:12px; padding:1.25rem; margin:1.25rem 0;">
            <h4 style="font-size:0.95rem; font-weight:700; color:var(--text-main); margin-bottom:0.75rem;">Produce Items:</h4>
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              ${order.items.map(item => `
                <div style="display:flex; justify-content:space-between; font-size:0.92rem;">
                  <span>🌾 <strong>${item.name}</strong> × ${item.quantity} ${item.unit}</span>
                  <span style="font-weight:700;">₹${item.price * item.quantity}</span>
                </div>
              `).join('')}
            </div>

            <div style="display:flex; justify-content:space-between; margin-top:1rem; padding-top:0.75rem; border-top:1px dashed var(--border-color); font-size:0.9rem;">
              <span>Delivery / Direct Freight:</span>
              <span style="font-weight:700;">₹${order.deliveryFee}</span>
            </div>

            <div style="display:flex; justify-content:space-between; margin-top:0.5rem; font-size:1.15rem; font-weight:800; color:var(--primary-dark);">
              <span>${t('cart_total')}:</span>
              <span>₹${order.totalAmount}</span>
            </div>
          </div>

          <!-- Farmer Details & Direct Contact on Order -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; padding-top:0.75rem;">
            <div style="font-size:0.88rem;">
              <div>🧑‍🌾 <strong>Farmer:</strong> ${order.farmerName} (${farmer ? farmer.district : 'Verified Producer'})</div>
              <div style="color:var(--text-muted);">📍 <strong>Delivery Address:</strong> ${order.deliveryAddress}</div>
              <div style="color:var(--success); font-weight:700; margin-top:0.25rem;">
                ✨ Middleman Markup Eliminated: You Saved ₹${order.middlemanSavings}!
              </div>
            </div>

            ${farmer ? `
              <div style="display:flex; gap:0.5rem;">
                <a href="tel:${farmer.phone.replace(/\s+/g, '')}" class="btn btn-secondary btn-sm">
                  📞 Call Farmer
                </a>
                <a href="https://wa.me/${farmer.whatsapp}?text=Regarding%20Order%20${order.id}" target="_blank" class="btn btn-whatsapp btn-sm">
                  💬 WhatsApp
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  },

  // Print / Display Invoice Modal
  printInvoice(orderId) {
    const order = AgriData.getOrderById(orderId);
    if (!order) return;

    const modal = document.getElementById('invoiceModal');
    const content = document.getElementById('invoiceModalContent');

    if (modal && content) {
      content.innerHTML = `
        <div style="padding:1.5rem; font-family:var(--font-family);" id="printableReceipt">
          <div style="display:flex; justify-content:space-between; border-bottom:2px solid var(--primary); padding-bottom:1rem; margin-bottom:1.5rem;">
            <div>
              <h2 style="color:var(--primary-dark); font-weight:800;">AgriDirect</h2>
              <div style="font-size:0.85rem; color:var(--text-muted);">Direct Farm-to-Fork Receipt</div>
            </div>
            <div style="text-align:right;">
              <div style="font-weight:700; color:var(--primary);">INVOICE: ${order.id}</div>
              <div style="font-size:0.85rem; color:var(--text-muted);">Date: ${order.date}</div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.5rem; font-size:0.9rem;">
            <div>
              <div style="font-weight:700; color:var(--primary-dark);">Delivered To:</div>
              <div>${order.customerName}</div>
              <div>${order.customerPhone}</div>
              <div style="color:var(--text-muted); font-size:0.85rem;">${order.deliveryAddress}</div>
            </div>
            <div>
              <div style="font-weight:700; color:var(--primary-dark);">Sourced Directly From:</div>
              <div>${order.farmerName}</div>
              <div style="color:var(--text-muted); font-size:0.85rem;">Zero Middleman Farm Direct Network</div>
              <div style="color:var(--text-muted); font-size:0.85rem;">Payment: ${order.paymentMethod}</div>
            </div>
          </div>

          <table style="width:100%; border-collapse:collapse; margin-bottom:1.5rem; font-size:0.9rem;">
            <thead>
              <tr style="background:var(--bg-subtle); text-align:left;">
                <th style="padding:0.6rem; border-bottom:1px solid #ddd;">Crop / Item</th>
                <th style="padding:0.6rem; border-bottom:1px solid #ddd;">Qty</th>
                <th style="padding:0.6rem; border-bottom:1px solid #ddd;">Farmer Rate</th>
                <th style="padding:0.6rem; border-bottom:1px solid #ddd; text-align:right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(i => `
                <tr>
                  <td style="padding:0.6rem; border-bottom:1px solid #eee;">${i.name}</td>
                  <td style="padding:0.6rem; border-bottom:1px solid #eee;">${i.quantity} ${i.unit}</td>
                  <td style="padding:0.6rem; border-bottom:1px solid #eee;">₹${i.price}</td>
                  <td style="padding:0.6rem; border-bottom:1px solid #eee; text-align:right;">₹${i.price * i.quantity}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="display:flex; justify-content:flex-end;">
            <div style="width:240px; font-size:0.9rem;">
              <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem;">
                <span>Subtotal:</span>
                <span>₹${order.itemSubtotal}</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem;">
                <span>Direct Transport:</span>
                <span>₹${order.deliveryFee}</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem; color:var(--success); font-weight:700;">
                <span>Middleman Savings:</span>
                <span>- ₹${order.middlemanSavings}</span>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:1.15rem; font-weight:800; border-top:2px solid var(--primary); padding-top:0.5rem; color:var(--primary-dark);">
                <span>Total Paid:</span>
                <span>₹${order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      `;

      modal.classList.add('open');
    }
  },

  closeInvoiceModal() {
    const modal = document.getElementById('invoiceModal');
    if (modal) modal.classList.remove('open');
  }
};
