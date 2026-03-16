// ── API Base URL ──
const API = 'http://localhost/leafnest/backend';

// ── PRODUCTS ──
async function getProductsFromDB() {
  try {
    const res = await fetch(`${API}/products.php`);
    const data = await res.json();
    return data.success ? data.products : [];
  } catch { return getProductsLocal(); }
}

// ── AUTH ──
async function signupUser(name, email, password) {
  try {
    const res = await fetch(`${API}/auth.php?action=signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, password})
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch(e) {
    console.warn('signupUser API failed, using localStorage fallback', e);
    // localStorage fallback
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return {success: false, message: 'Email already registered'};
    }
    const newUser = {id: Date.now(), name, email, password};
    users.push(newUser);
    localStorage.setItem('plantstore_users', JSON.stringify(users));
    return {success: true, user: {id: newUser.id, name, email}};
  }
}

async function loginUser(email, password) {
  try {
    const res = await fetch(`${API}/auth.php?action=login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch(e) {
    console.warn('loginUser API failed, using localStorage fallback', e);
    const users = getUsers();
    const user  = users.find(u => u.email === email && u.password === password);
    if (user) return {success: true, user: {id: user.id, name: user.name, email: user.email}};
    return {success: false, message: 'Invalid email or password'};
  }
}

// ── ORDERS ──
async function saveOrderToDB(orderData) {
  try {
    const res = await fetch(`${API}/orders.php`, {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify(orderData)
    });
    return await res.json();
  } catch { return {success: false}; }
}

async function getOrdersFromDB() {
  try {
    const res = await fetch(`${API}/orders.php`);
    const data = await res.json();
    return data.success ? data.orders : [];
  } catch { return getOrders(); }
}

// ── LOCAL FALLBACK (localStorage) ──
const DEFAULT_PRODUCTS = [
  { id: 1,  name: "Monstera Deliciosa",   category: "Indoor",    price: 599, emoji: "🌿", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=300&fit=crop", description: "Iconic split-leaf tropical plant" },
  { id: 2,  name: "Peace Lily",           category: "Indoor",    price: 349, emoji: "🌸", image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=300&fit=crop", description: "Elegant white blooms, air purifier" },
  { id: 3,  name: "Snake Plant",          category: "Indoor",    price: 299, emoji: "🪴", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop", description: "Hardy, low-maintenance beauty" },
  { id: 4,  name: "Fiddle Leaf Fig",      category: "Indoor",    price: 799, emoji: "🌳", image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&h=300&fit=crop", description: "Statement plant with large leaves" },
  { id: 5,  name: "Pothos Golden",        category: "Indoor",    price: 199, emoji: "🍃", image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400&h=300&fit=crop", description: "Trailing vine, perfect for shelves" },
  { id: 6,  name: "ZZ Plant",             category: "Indoor",    price: 449, emoji: "🌱", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&h=300&fit=crop", description: "Glossy leaves, drought tolerant" },
  { id: 7,  name: "Aloe Vera",            category: "Succulent", price: 249, emoji: "🌵", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&h=300&fit=crop", description: "Medicinal succulent, easy care" },
  { id: 8,  name: "Jade Plant",           category: "Succulent", price: 329, emoji: "💚", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=300&fit=crop", description: "Lucky plant with thick leaves" },
  { id: 9,  name: "Echeveria Mix",        category: "Succulent", price: 179, emoji: "🌺", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=300&fit=crop", description: "Rosette-shaped colorful succulent" },
  { id: 10, name: "Cactus Barrel",        category: "Succulent", price: 399, emoji: "🌵", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop", description: "Classic round desert cactus" },
  { id: 11, name: "Bird of Paradise",     category: "Tropical",  price: 999, emoji: "🦜", image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&h=300&fit=crop", description: "Dramatic tropical statement plant" },
  { id: 12, name: "Calathea Orbifolia",   category: "Tropical",  price: 649, emoji: "🌿", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&h=300&fit=crop", description: "Stunning striped round leaves" },
  { id: 13, name: "Philodendron Brasil",  category: "Tropical",  price: 379, emoji: "🍀", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=300&fit=crop", description: "Variegated heart-leaf philodendron" },
  { id: 14, name: "Anthurium Red",        category: "Tropical",  price: 549, emoji: "❤️", image: "https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=400&h=300&fit=crop", description: "Glossy red spathes, long lasting" },
  { id: 15, name: "Bamboo Palm",          category: "Outdoor",   price: 849, emoji: "🎋", image: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=400&h=300&fit=crop", description: "Elegant multi-stem palm" },
  { id: 16, name: "Lavender",             category: "Outdoor",   price: 229, emoji: "💜", image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=400&h=300&fit=crop", description: "Fragrant purple flowering herb" },
  { id: 17, name: "Rosemary Bush",        category: "Outdoor",   price: 199, emoji: "🌿", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400&h=300&fit=crop", description: "Aromatic culinary herb" },
  { id: 18, name: "Red Rose",             category: "Outdoor",   price: 449, emoji: "🌹", image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?w=400&h=300&fit=crop&auto=compress", description: "Classic fragrant red rose bush" },
  { id: 19, name: "Spider Plant",         category: "Indoor",    price: 159, emoji: "🕷️", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop", description: "Air-purifying, easy propagation" },
  { id: 20, name: "Rubber Plant",         category: "Indoor",    price: 499, emoji: "🌳", image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&h=300&fit=crop", description: "Bold burgundy-green foliage" },
  { id: 21, name: "String of Pearls",     category: "Succulent", price: 289, emoji: "📿", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=300&fit=crop", description: "Cascading bead-like succulent" },
  { id: 22, name: "Boston Fern",          category: "Indoor",    price: 319, emoji: "🌿", image: "https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=400&h=300&fit=crop", description: "Lush feathery fronds, humidity lover" },
];

function getProductsLocal() {
  const VERSION = 'v8';
  if (localStorage.getItem('plantstore_version') !== VERSION) {
    localStorage.setItem('plantstore_products', JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem('plantstore_version', VERSION);
  }
  return JSON.parse(localStorage.getItem('plantstore_products') || '[]');
}

function getProducts() { return getProductsLocal(); }
function saveProducts(p) { localStorage.setItem('plantstore_products', JSON.stringify(p)); }
function getCart()  { return JSON.parse(localStorage.getItem('plantstore_cart') || '[]'); }
function saveCart(c){ localStorage.setItem('plantstore_cart', JSON.stringify(c)); }
function getOrders(){ return JSON.parse(localStorage.getItem('plantstore_orders') || '[]'); }
function saveOrder(o){ const orders=getOrders(); orders.push(o); localStorage.setItem('plantstore_orders', JSON.stringify(orders)); }
function getUsers() { return JSON.parse(localStorage.getItem('plantstore_users') || '[]'); }
function getCurrentUser(){ return JSON.parse(localStorage.getItem('plantstore_current_user') || 'null'); }

function addToCart(productId) {
  const products = getProducts();
  const product  = products.find(p => p.id === productId);
  if (!product) return;
  const cart     = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = total);
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
