/* =========================================================
   CART & ORDER STORAGE — dipakai bersama oleh index.html,
   checkout.html, order-sukses.html, lacak-pesanan.html, dan
   admin/index.html. Semua nyimpen di localStorage (per-browser),
   jadi harus dibuka dari origin yang sama (folder boleh beda).
   ========================================================= */
const ONGKIR = 8000;

function rupiah(n){ return "Rp" + Number(n||0).toLocaleString('id-ID'); }

function loadProducts(){
  try{
    const saved = JSON.parse(localStorage.getItem("kopisenja_products"));
    if(saved && saved.length) return saved;
  }catch(e){}
  localStorage.setItem("kopisenja_products", JSON.stringify(PRODUCTS_DEFAULT));
  return PRODUCTS_DEFAULT;
}

function loadCart(){
  try{ return JSON.parse(localStorage.getItem("kopisenja_cart")) || []; }
  catch(e){ return []; }
}
function saveCart(cart){
  try{ localStorage.setItem("kopisenja_cart", JSON.stringify(cart)); }
  catch(e){ console.warn("Gagal menyimpan keranjang (mode private/incognito?)", e); }
}
function cartTotal(cart){
  return cart.reduce((s,c)=> s + c.price*c.qty, 0);
}

function addToCart(productId){
  const products = loadProducts();
  const p = products.find(x=>x.id===productId);
  if(!p) return;
  const cart = loadCart();
  const line = cart.find(c=>c.id===productId);
  if(line){ line.qty++; } else { cart.push({id:p.id, name:p.name, price:p.price, emoji:p.emoji, qty:1}); }
  saveCart(cart);
  return cart;
}
function updateQty(cart, productId, delta){
  const line = cart.find(c=>c.id===productId);
  if(!line) return cart;
  line.qty += delta;
  const next = cart.filter(c=>c.qty>0);
  saveCart(next);
  return next;
}

function loadOrders(){
  try{ return JSON.parse(localStorage.getItem("kopisenja_orders")) || []; }
  catch(e){ return []; }
}
function saveOrder(order){
  order.id = "KS" + Date.now().toString().slice(-8);
  order.date = new Date().toISOString();
  order.status = "Diproses";
  const orders = loadOrders();
  orders.unshift(order);
  try{ localStorage.setItem("kopisenja_orders", JSON.stringify(orders)); }
  catch(e){ console.warn("Gagal menyimpan pesanan", e); }
  try{ new BroadcastChannel("kopisenja_sync").postMessage({type:"orders"}); }catch(e){}
  return order;
}
function findOrder(id){
  return loadOrders().find(o=>o.id===id);
}

/* ---------- Cart drawer UI (dipakai di semua halaman toko) ---------- */
function renderCartDrawer(){
  const cart = loadCart();
  const countEl = document.getElementById("cartCount");
  const listEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("cartCheckoutBtn");
  if(countEl) countEl.textContent = cart.reduce((s,c)=>s+c.qty,0);
  if(listEl){
    listEl.innerHTML = cart.length ? cart.map(c=>`
      <div class="cart-line">
        <div class="thumb-sm">${c.emoji||"☕"}</div>
        <div style="flex:1;">
          <div style="display:flex; justify-content:space-between;"><strong>${c.name}</strong><span>${rupiah(c.price*c.qty)}</span></div>
          <div class="qty-row">
            <button onclick="changeQty(${c.id},-1)">-</button>
            <span>${c.qty}</span>
            <button onclick="changeQty(${c.id},1)">+</button>
          </div>
        </div>
      </div>`).join("") : `<p style="color:var(--ink-soft); font-size:14px;">Keranjang masih kosong. Yuk pilih menu favoritmu ☕</p>`;
  }
  if(totalEl) totalEl.textContent = rupiah(cartTotal(cart));
  if(checkoutBtn) checkoutBtn.disabled = cart.length===0;
}
function changeQty(id, delta){
  updateQty(loadCart(), id, delta);
  renderCartDrawer();
  if(typeof renderProducts === "function") renderProducts();
}
function openCart(){ document.getElementById("cartDrawer")?.classList.add("open"); document.getElementById("cartDim")?.classList.add("open"); }
function closeCart(){ document.getElementById("cartDrawer")?.classList.remove("open"); document.getElementById("cartDim")?.classList.remove("open"); }

function showToast(msg){
  const t = document.getElementById("toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>t.classList.remove("show"), 2200);
}
