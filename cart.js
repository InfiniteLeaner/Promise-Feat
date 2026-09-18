/* ===== PROMISE FEATS — SHARED CART (drawer + badge) =====
   Include on every page that shows the cart icon:
     <script src="../cart.js"></script>
   Exposes:
     window.addToCart(product)  -> adds/merges { id, name, price, image, qty }
     window.syncCartBadge()     -> refreshes the #cart-count badge
   Persists in localStorage under "pf-cart".
*/
(() => {
  "use strict";

  const CART_KEY = "pf-cart";
  const CURRENCY = "₦";

  /* ---------- styles ---------- */
  const style = document.createElement("style");
  style.textContent = `
.cart-drawer { position: fixed; inset: 0; z-index: 2000; visibility: hidden; }
.cart-drawer.open { visibility: visible; }
.cart-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.55);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.cart-drawer.open .cart-overlay { opacity: 1; }
.cart-panel {
  position: absolute; top: 0; right: 0;
  height: 100%;
  width: min(420px, 92vw);
  background: #13131a;
  border-left: 1px solid rgba(255,255,255,0.09);
  display: flex; flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  box-shadow: -20px 0 60px rgba(0,0,0,0.5);
}
.cart-drawer.open .cart-panel { transform: translateX(0); }
.cart-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.09);
}
.cart-title { font-family: 'Poppins', sans-serif; font-size: 1.15rem; color: #f0f0f0; margin: 0; }
.cart-close {
  background: none; border: none; color: #c9a55a;
  font-size: 28px; line-height: 1; cursor: pointer; padding: 2px;
}
.cart-close:hover { color: #e2c27a; }
.cart-items {
  flex: 1; overflow-y: auto;
  padding: 14px 20px;
  display: flex; flex-direction: column; gap: 12px;
}
.cart-item {
  display: flex; gap: 12px;
  padding: 10px;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 12px;
  background: rgba(255,255,255,0.04);
}
.cart-item img {
  width: 64px; height: 64px;
  object-fit: cover; border-radius: 10px;
  flex-shrink: 0;
}
.cart-item-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.cart-item-name { font-size: 13px; color: #f0f0f0; font-weight: 600; line-height: 1.3; }
.cart-item-price { font-size: 13px; color: #c9a55a; font-weight: 700; }
.cart-item-controls { display: flex; align-items: center; gap: 10px; margin-top: auto; }
.qty-btn {
  width: 26px; height: 26px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.06);
  color: #f0f0f0;
  font-size: 15px; line-height: 1;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.qty-btn:hover { border-color: #c9a55a; color: #c9a55a; }
.cart-item-qty { font-size: 13px; color: #f0f0f0; min-width: 18px; text-align: center; }
.cart-item-remove {
  background: none; border: none;
  color: #6b6b7a; font-size: 18px;
  cursor: pointer; padding: 2px; align-self: flex-start;
}
.cart-item-remove:hover { color: #f1683a; }
.cart-empty { text-align: center; color: #6b6b7a; padding: 44px 0; font-size: 14px; line-height: 1.8; }
.cart-empty a { color: #c9a55a; }
.cart-foot {
  padding: 16px 20px;
  border-top: 1px solid rgba(255,255,255,0.09);
  background: #0e0e0e;
}
.cart-total-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 12px;
  color: #f0f0f0; font-size: 14px;
}
.cart-total-row strong { font-size: 1.1rem; color: #c9a55a; }
.cart-checkout {
  width: 100%;
  padding: 13px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #f1683a, #c94e22);
  color: #fff;
  font-weight: 700; font-size: 14px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}
.cart-checkout:hover { filter: brightness(1.08); }
@media (max-width: 480px) {
  .cart-panel { width: 100vw; }
}
`;

  /* ---------- drawer markup ---------- */
  const drawer = document.createElement("div");
  drawer.className = "cart-drawer";
  drawer.id = "cart-drawer";
  drawer.setAttribute("aria-hidden", "true");
  drawer.innerHTML = `
    <div class="cart-overlay" id="cart-overlay"></div>
    <aside class="cart-panel" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <header class="cart-head">
        <h2 class="cart-title">Your Cart</h2>
        <button type="button" class="cart-close" id="cart-close" aria-label="Close cart">
          <i class="bx bx-x"></i>
        </button>
      </header>
      <div class="cart-items" id="cart-items"></div>
      <footer class="cart-foot">
        <div class="cart-total-row">
          <span>Total</span>
          <strong id="cart-total">${CURRENCY}0</strong>
        </div>
        <button type="button" class="cart-checkout" id="cart-checkout">Checkout</button>
      </footer>
    </aside>
  `;

  document.head.appendChild(style);
  document.body.appendChild(drawer);

  /* scope all lookups to the injected drawer so pre-existing
     markup with the same ids on a page can never hijack it */
  const itemsEl = drawer.querySelector("#cart-items");
  const totalEl = drawer.querySelector("#cart-total");
  const closeBtn = drawer.querySelector("#cart-close");
  const overlayEl = drawer.querySelector("#cart-overlay");
  const checkoutBtn = drawer.querySelector("#cart-checkout");

  /* ---------- data ---------- */
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function totalQty(cart) {
    return cart.reduce((s, i) => s + (Number(i.qty) || 1), 0);
  }

  function totalPrice(cart) {
    return cart.reduce((s, i) => s + Number(i.price) * (Number(i.qty) || 1), 0);
  }

  function formatPrice(n) {
    return CURRENCY + Number(n || 0).toLocaleString();
  }

  /* resolve relative image paths against the current page so cart
     thumbnails keep working when the cart is opened on another page */
  function resolveImage(src) {
    if (!src) return "";
    try { return new URL(src, window.location.href).href; }
    catch { return src; }
  }

  /* ---------- badge ---------- */
  function syncBadge() {
    const qty = totalQty(getCart());
    document.querySelectorAll(
      "#cart-count, .cart-count, .compact-badge, .compact-menu-cart-count"
    ).forEach(el => {
      el.textContent = qty;
    });
  }

  /* ---------- drawer ---------- */
  function openCart() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    render();
  }

  function closeCart() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function render() {
    const cart = getCart();

    if (!cart.length) {
      itemsEl.innerHTML =
        `<p class="cart-empty">Your cart is empty.<br><a href="../store-page/store.html">Browse the store</a></p>`;
      totalEl.textContent = formatPrice(0);
      return;
    }

    itemsEl.innerHTML = cart.map((item, idx) => `
      <div class="cart-item" data-index="${idx}">
        ${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy">` : ""}
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">${formatPrice(item.price)}</p>
          <div class="cart-item-controls">
            <button type="button" class="qty-btn" data-action="dec" data-index="${idx}" aria-label="Decrease quantity">−</button>
            <span class="cart-item-qty">${item.qty}</span>
            <button type="button" class="qty-btn" data-action="inc" data-index="${idx}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button type="button" class="cart-item-remove" data-action="remove" data-index="${idx}" aria-label="Remove item">
          <i class="bx bx-trash"></i>
        </button>
      </div>
    `).join("");

    totalEl.textContent = formatPrice(totalPrice(cart));
  }

  itemsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const cart = getCart();
    const idx = Number(btn.dataset.index);
    const item = cart[idx];
    if (!item) return;

    if (btn.dataset.action === "inc") {
      item.qty = (Number(item.qty) || 1) + 1;
    } else if (btn.dataset.action === "dec") {
      item.qty = (Number(item.qty) || 1) - 1;
      if (item.qty < 1) cart.splice(idx, 1);
    } else if (btn.dataset.action === "remove") {
      cart.splice(idx, 1);
    }

    saveCart(cart);
    syncBadge();
    render();
  });

  /* open the drawer when a cart icon is clicked
     (desktop .icon-cart, legacy .menu-cart, or compact .compact-menu-cart) */
  document.addEventListener("click", (e) => {
    if (e.target.closest(".icon-cart, .menu-cart, .compact-menu-cart")) openCart();
  });

  closeBtn?.addEventListener("click", closeCart);
  overlayEl?.addEventListener("click", closeCart);

  checkoutBtn?.addEventListener("click", () => {
    const cart = getCart();
    if (!cart.length) return;
    alert(`Checkout coming soon!\n\nTotal: ${formatPrice(totalPrice(cart))}`);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
    if ((e.key === "Enter" || e.key === " ") && e.target.closest(".menu-cart, .compact-menu-cart")) {
      e.preventDefault();
      openCart();
    }
  });

  /* ---------- public API ---------- */
  window.addToCart = function (product) {
    if (!product || product.id == null) return;

    const cart = getCart();
    const existing = cart.find(i => String(i.id) === String(product.id));
    const qty = Math.max(1, Number(product.qty) || 1);

    if (existing) {
      existing.qty = (Number(existing.qty) || 1) + qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name || "Product",
        price: Number(product.price) || 0,
        image: resolveImage(product.image),
        qty
      });
    }

    saveCart(cart);
    syncBadge();
    openCart();
  };

  window.syncCartBadge = syncBadge;

  syncBadge();
})();