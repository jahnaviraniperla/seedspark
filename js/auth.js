/**
 * AgriDirect - Authentication & Session Manager
 * Supports both Farmer and Consumer roles with LocalStorage persistence.
 */

const AgriAuth = {
  // Get currently logged-in user
  getCurrentUser() {
    const userJson = localStorage.getItem('agri_current_user');
    return userJson ? JSON.parse(userJson) : null;
  },

  // Get all registered users
  getUsers() {
    const usersJson = localStorage.getItem('agri_registered_users');
    if (!usersJson) {
      // Default demo users
      const initialUsers = [
        {
          id: "farmer_1",
          name: "Ramesh Reddy",
          phone: "9848012345",
          email: "ramesh.farmer@agridirect.in",
          password: "password123",
          role: "farmer",
          farmName: "Sri Lakshmi Natural Farms",
          location: "Guntur, Andhra Pradesh",
          farmingType: "100% Organic & ZBNF"
        },
        {
          id: "consumer_1",
          name: "Ananya Sharma",
          phone: "9876543210",
          email: "ananya@example.com",
          password: "password123",
          role: "consumer",
          location: "Hyderabad, Telangana"
        }
      ];
      localStorage.setItem('agri_registered_users', JSON.stringify(initialUsers));
      return initialUsers;
    }
    return JSON.parse(usersJson);
  },

  // Register a new user
  register(userData) {
    const users = this.getUsers();
    
    // Check if phone or email already registered
    const existing = users.find(u => u.phone === userData.phone || (userData.email && u.email === userData.email));
    if (existing) {
      return { success: false, message: "A user with this mobile number or email already exists." };
    }

    const newUser = {
      id: userData.role === 'farmer' ? `farmer_${Date.now()}` : `consumer_${Date.now()}`,
      name: userData.name,
      phone: userData.phone,
      email: userData.email || "",
      password: userData.password,
      role: userData.role, // 'farmer' or 'consumer'
      farmName: userData.farmName || "",
      location: userData.location || "",
      farmingType: userData.farmingType || "Natural Farming",
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('agri_registered_users', JSON.stringify(users));

    // If registering as a farmer, also append to the active farmers list
    if (newUser.role === 'farmer') {
      const farmers = AgriData.getFarmers();
      farmers.push({
        id: newUser.id,
        name: newUser.name,
        farmName: newUser.farmName || `${newUser.name}'s Farm`,
        phone: `+91 ${newUser.phone}`,
        whatsapp: `91${newUser.phone}`,
        village: newUser.location.split(',')[0] || "Local Village",
        district: newUser.location || "Local Region",
        farmingType: newUser.farmingType || "Natural Farming",
        experienceYears: 5,
        avatar: "👨‍🌾",
        bio: `Verified farmer offering fresh harvests directly from ${newUser.location}.`
      });
      localStorage.setItem('agri_farmers', JSON.stringify(farmers));
    }

    // Auto login
    this.loginSession(newUser);
    return { success: true, user: newUser };
  },

  // Login with phone or email and password
  login(identifier, password, requiredRole = null) {
    const users = this.getUsers();
    const user = users.find(u => 
      (u.phone === identifier || u.email.toLowerCase() === identifier.toLowerCase()) && 
      u.password === password
    );

    if (!user) {
      return { success: false, message: "Invalid mobile number/email or password." };
    }

    if (requiredRole && user.role !== requiredRole) {
      return { success: false, message: `This account is registered as a ${user.role}. Please switch tabs.` };
    }

    this.loginSession(user);
    return { success: true, user };
  },

  // Set session
  loginSession(user) {
    localStorage.setItem('agri_current_user', JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('authChanged', { detail: { user } }));
  },

  // Logout
  logout() {
    localStorage.removeItem('agri_current_user');
    window.dispatchEvent(new CustomEvent('authChanged', { detail: { user: null } }));
    window.location.href = "index.html";
  },

  // Quick Demo Login Helper
  quickDemoLogin(role) {
    const users = this.getUsers();
    const demoUser = users.find(u => u.role === role);
    if (demoUser) {
      this.loginSession(demoUser);
      return demoUser;
    }
    return null;
  }
};

// Initialize users store
AgriAuth.getUsers();
