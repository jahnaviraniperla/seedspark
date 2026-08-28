/**
 * AgriDirect - Farmer Dashboard Controller
 * Manages farmer inventory, listing new produce, and updating order status.
 */

const AgriFarmer = {
  activeFarmerId: null,

  initDashboard() {
    const user = AgriAuth.getCurrentUser();
    
    // If not logged in or not a farmer, show prompt or auto-login demo farmer
    if (!user || user.role !== 'farmer') {
      const demoFarmer = AgriAuth.quickDemoLogin('farmer');
      this.activeFarmerId = demoFarmer.id;
    } else {
      this.activeFarmerId = user.id;
    }

    this.renderFarmerProfileInfo();
    this.renderStats();
    this.renderInventoryTable();
    this.renderFarmerOrders();
    this.setupProduceModal();

    window.addEventListener('languageChanged', () => {
      this.renderInventoryTable();
      this.renderFarmerOrders();
      this.renderStats();
    });
  },

  renderFarmerProfileInfo() {
    const user = AgriAuth.getCurrentUser();
    const nameEl = document.getElementById('farmerProfileName');
    const farmEl = document.getElementById('farmerProfileFarm');
    const locEl = document.getElementById('farmerProfileLoc');

    if (user) {
      if (nameEl) nameEl.textContent = user.name;
      if (farmEl) farmEl.textContent = user.farmName || 'Verified Natural Farm';
      if (locEl) locEl.textContent = user.location || 'Local District';
    }
  },

  renderStats() {
    const products = AgriData.getProducts().filter(p => p.farmerId === this.activeFarmerId || this.activeFarmerId === 'farmer_1');
    const orders = AgriData.getOrders().filter(o => o.farmerId === this.activeFarmerId || this.activeFarmerId === 'farmer_1');

    let totalSales = 0;
    orders.forEach(o => totalSales += o.itemSubtotal);

    const salesEl = document.getElementById('dashStatSales');
    const activeEl = document.getElementById('dashStatActive');
    const ordersEl = document.getElementById('dashStatOrders');
    const deliveredEl = document.getElementById('dashStatDelivered');

    if (salesEl) salesEl.textContent = `₹${totalSales.toLocaleString('en-IN')}`;
    if (activeEl) activeEl.textContent = products.length;
    if (ordersEl) ordersEl.textContent = orders.length;
    if (deliveredEl) deliveredEl.textContent = orders.filter(o => o.status === 'delivered').length;
  },

  renderInventoryTable() {
    const container = document.getElementById('farmerInventoryTableBody');
    if (!container) return;

    const products = AgriData.getProducts().filter(p => p.farmerId === this.activeFarmerId || this.activeFarmerId === 'farmer_1');

    if (products.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">
            🌾 No products listed yet. Click <strong>"+ List New Products"</strong> to add your first harvest!
          </td>
        </tr>
      `;
      return;
    }

    container.innerHTML = products.map(p => {
      const displayName = getProductName(p);
      return `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <img src="${p.image}" alt="${displayName}" style="width:45px; height:45px; object-fit:cover; border-radius:6px;" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'">
            <div>
              <strong>${displayName}</strong>
              <div style="font-size:0.75rem; color:var(--text-muted);">${p.isOrganic ? '🌱 Organic' : 'Standard'} • Harvested: ${p.harvestDate}</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-direct">${t(`cat_${p.category}`) || p.category}</span></td>
        <td><strong style="color:var(--primary-dark); font-size:1.05rem;">₹${p.farmerPrice}</strong> / ${p.unit}</td>
        <td><span style="color:var(--text-light); text-decoration:line-through;">₹${p.marketPrice}</span> / ${p.unit}</td>
        <td><strong>${p.stock}</strong> ${p.unit}</td>
        <td><span class="badge badge-status delivered">Active</span></td>
        <td>
          <div style="display:flex; gap:0.4rem;">
            <a href="product-detail.html?id=${p.id}" class="btn btn-secondary btn-sm" title="View Listing">👁️</a>
            <button class="btn btn-danger btn-sm" onclick="AgriFarmer.deleteProduce('${p.id}')" title="Delete Listing">🗑️</button>
          </div>
        </td>
      </tr>
    `;}).join('');
  },

  renderFarmerOrders() {
    const container = document.getElementById('farmerOrdersTableBody');
    if (!container) return;

    const orders = AgriData.getOrders().filter(o => o.farmerId === this.activeFarmerId || this.activeFarmerId === 'farmer_1');

    if (orders.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">
            📦 No orders received yet. Once buyers order, they will appear here!
          </td>
        </tr>
      `;
      return;
    }

    container.innerHTML = orders.map(o => `
      <tr>
        <td><strong>${o.id}</strong><div style="font-size:0.75rem; color:var(--text-muted);">${o.date}</div></td>
        <td>
          <strong>${o.customerName}</strong>
          <div style="font-size:0.8rem; color:var(--text-muted);">📞 ${o.customerPhone}</div>
          <div style="font-size:0.75rem; color:var(--text-muted); max-width:220px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">📍 ${o.deliveryAddress}</div>
        </td>
        <td>
          <div style="font-size:0.85rem;">
            ${o.items.map(i => `<div>${getProductName(i.productId, i.name)} (${i.quantity} ${i.unit})</div>`).join('')}
          </div>
        </td>
        <td><strong style="color:var(--primary-dark);">₹${o.totalAmount}</strong><div style="font-size:0.75rem; color:var(--text-muted);">${o.paymentMethod}</div></td>
        <td>
          <span class="badge badge-status ${o.status}">
            ${t(`status_${o.status}`) || o.status}
          </span>
        </td>
        <td>
          <select onchange="AgriFarmer.updateOrderStatus('${o.id}', this.value)" class="form-control" style="padding:0.3rem 0.6rem; font-size:0.85rem;">
            <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="confirmed" ${o.status === 'confirmed' ? 'selected' : ''}>Confirmed & Packing</option>
            <option value="dispatched" ${o.status === 'dispatched' ? 'selected' : ''}>Dispatched from Farm</option>
            <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Delivered Fresh</option>
          </select>
        </td>
      </tr>
    `).join('');
  },

  updateOrderStatus(orderId, newStatus) {
    AgriData.updateOrderStatus(orderId, newStatus);
    AgriApp.showToast(`Order #${orderId} status updated to "${newStatus}"! 🚚`, 'success');
    this.renderFarmerOrders();
    this.renderStats();
  },

  deleteProduce(id) {
    if (confirm("Are you sure you want to remove this crop listing?")) {
      AgriData.deleteProduct(id);
      AgriApp.showToast("Products listing removed.", "info");
      this.renderInventoryTable();
      this.renderStats();
    }
  },

  // Produce Modal Logic
  setupProduceModal() {
    const modal = document.getElementById('addProduceModal');
    const form = document.getElementById('addProduceForm');

    // Set today's date in harvest date input
    const dateInput = document.getElementById('modalHarvestDate');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    if (form) {
      form.onsubmit = (e) => this.handleSaveProduce(e);
    }
  },

  openAddModal() {
    const modal = document.getElementById('addProduceModal');
    if (modal) modal.classList.add('open');
  },

  closeAddModal() {
    const modal = document.getElementById('addProduceModal');
    if (modal) modal.classList.remove('open');
  },

  handleSaveProduce(e) {
    e.preventDefault();

    const user = AgriAuth.getCurrentUser() || AgriAuth.getUsers().find(u => u.role === 'farmer');
    const name = document.getElementById('modalCropName').value.trim();
    const category = document.getElementById('modalCategory').value;
    const unit = document.getElementById('modalUnit').value;
    const farmerPrice = parseFloat(document.getElementById('modalFarmerPrice').value);
    const marketPrice = parseFloat(document.getElementById('modalMarketPrice').value);
    const stock = parseInt(document.getElementById('modalStock').value, 10);
    const harvestDate = document.getElementById('modalHarvestDate').value;
    const location = document.getElementById('modalLocation').value.trim() || user.location || "Guntur, Andhra Pradesh";
    const imageUrl = document.getElementById('modalImageUrl').value.trim() || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";
    const isOrganic = document.getElementById('modalIsOrganic').checked;
    const desc = document.getElementById('modalDesc').value.trim() || "Naturally harvested fresh farm produce.";

    if (!name || !farmerPrice || !marketPrice || !stock) {
      AgriApp.showToast("Please fill in all mandatory products fields.", "error");
      return;
    }

    const newProduct = {
      id: `prod_${Date.now()}`,
      name: name,
      category: category,
      farmerId: user.id,
      farmerName: user.name,
      location: location,
      farmerPrice: farmerPrice,
      marketPrice: marketPrice,
      unit: unit,
      minOrder: 1,
      stock: stock,
      harvestDate: harvestDate,
      shelfLifeDays: 14,
      isOrganic: isOrganic,
      rating: 5.0,
      reviewsCount: 1,
      image: imageUrl,
      description: desc,
      farmingMethod: isOrganic ? "100% Organic & Chemical Free" : "Standard Farm Fresh"
    };

    AgriData.addProduct(newProduct);
    this.closeAddModal();
    AgriApp.showToast(`Products "${name}" listed successfully! 🌾`, 'success');

    // Refresh UI
    this.renderInventoryTable();
    this.renderStats();
  }
};
