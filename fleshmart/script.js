// --------- CONFIG ---------
const ITEMS_PER_PAGE = 8;
const IMAGE_POOL = 30;
const PAGES_SHOWN = 12; // illusion only

// --------- STATE ---------
let ALL_ITEMS = [];
let FILTER = { q: '', cat: '' };
let CART = [];
let CURRENT_PAGE = 1;

// --------- HELPERS ---------
const $ = (id) => document.getElementById(id);
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

function openModal(id) {
  const m = $(id);
  if (!m) return;
  m.setAttribute('aria-hidden', 'false');
}

function closeModal(id) {
  const m = $(id);
  if (!m) return;
  m.setAttribute('aria-hidden', 'true');
}

// --------- DATA LOAD ---------
async function loadCSV() {
  const res = await fetch('items.csv');
  const text = await res.text();
  const rows = text.trim().split('\n').slice(1);

  ALL_ITEMS = rows.map(r => {
    const [id, category, age, cause, condition, fulfilment, btc, status] = r.split(',');
    return { id, category, age, cause, condition, fulfilment, btc, status };
  });
}

// --------- FILTERING ---------
function applyFilter(items) {
  const q = FILTER.q.toLowerCase();
  return items.filter(it => {
    const hitQ = !q || Object.values(it).join(' ').toLowerCase().includes(q);
    const hitC = !FILTER.cat || it.category === FILTER.cat;
    return hitQ && hitC;
  });
}

// --------- RENDERING ---------
function renderPage(page = 1) {
  CURRENT_PAGE = page;
  let items = applyFilter([...ALL_ITEMS]);
  shuffle(items);
  const pageItems = items.slice(0, ITEMS_PER_PAGE);

  const grid = $('grid');
  grid.innerHTML = '';

  pageItems.forEach(it => {
    const imgIndex = Math.floor(Math.random() * IMAGE_POOL) + 1;
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb">
        <img src="images/item-${imgIndex}.jpg" alt="${it.id}">
      </div>
      <h4>${it.id}</h4>
      <p>${it.category}</p>
      <p class="meta">${it.age}</p>
      <p class="meta">Cause: ${it.cause}</p>
      <p class="meta">Condition: ${it.condition}</p>
      <p class="meta">Fulfilment: ${it.fulfilment}</p>
      <div class="price">${it.btc} BTC</div>
      <div class="status">Status: ${it.status}</div>
      <div class="actions">
        <button data-id="${it.id}">Add to cart</button>
      </div>
    `;

    card.querySelector('button').onclick = () => addToCart(it);
    grid.appendChild(card);
  });
}

function initPager() {
  const pager = $('pager');
  pager.innerHTML = '';
  for (let i = 1; i <= PAGES_SHOWN; i++) {
    const a = document.createElement('a');
    a.textContent = i;
    a.onclick = () => renderPage(i);
    pager.appendChild(a);
  }
}

// --------- CART ---------
function addToCart(item) {
  CART.push(item);
  updateCartBadge();
  renderCart();
  openModal('cartModal');
}

function updateCartBadge() {
  const c = $('cartCount');
  if (c) c.textContent = CART.length;
}

function renderCart() {
  const list = $('cartItems');
  const totalEl = $('cartTotal');
  list.innerHTML = '';

  let total = 0;
  CART.forEach(it => {
    total += parseFloat(it.btc);
    const d = document.createElement('div');
    d.className = 'item';
    d.textContent = `${it.id} — ${it.btc} BTC`;
    list.appendChild(d);
  });

  totalEl.textContent = `${total.toFixed(3)} BTC`;
}

function clearCart() {
  CART = [];
  updateCartBadge();
}

// --------- CHECKOUT ---------
function proceedToCheckout() {
  closeModal('cartModal');
  openModal('checkoutModal');
}

function confirmOrder() {
  // Narrative-only confirmation
  alert('Order logged. Collection will be arranged via external partner. Do not attend without confirmation.');
  clearCart();
  closeModal('checkoutModal');
}

// --------- INIT ---------
function initMarket() {
  loadCSV().then(() => {
    renderPage(1);
    initPager();
  });

  const search = $('searchInput');
  if (search) {
    search.oninput = e => {
      FILTER.q = e.target.value;
      renderPage(1);
    };
  }

  const cat = $('categorySelect');
  if (cat) {
    cat.onchange = e => {
      FILTER.cat = e.target.value;
      renderPage(1);
    };
  }

  const cartBtn = $('cartBtn');
  if (cartBtn) cartBtn.onclick = () => openModal('cartModal');

  const closeCart = $('closeCart');
  if (closeCart) closeCart.onclick = () => closeModal('cartModal');

  const checkoutBtn = $('checkoutBtn');
  if (checkoutBtn) checkoutBtn.onclick = proceedToCheckout;

  const closeCheckout = $('closeCheckout');
  if (closeCheckout) closeCheckout.onclick = () => closeModal('checkoutModal');

  const confirm = $('confirmOrder');
  if (confirm) confirm.onclick = confirmOrder;
}

// Auto-init when used on market page
document.addEventListener('DOMContentLoaded', () => {
  if ($('grid')) initMarket();
});
