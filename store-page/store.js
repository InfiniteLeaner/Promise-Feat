(() => {
  "use strict";

  let products = [];

  let activeFilter = "all";
  let activeSort = "default";

  const productGrid = document.getElementById("product-grid");
  const productCount = document.getElementById("product-count");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const filterButtons = document.querySelectorAll(".filter-tab");

  async function loadProducts() {
    try {
      const response = await fetch("./products.json");

      if (!response.ok) throw new Error("Unable to load products");

      const data = await response.json();
      products = data.products || data;

      renderProducts();
      window.syncCartBadge?.();

    } catch (error) {
      console.error(error);
      productGrid.innerHTML =
        `<p class="error-message">Failed to load products.</p>`;
    }
  }

  function getFilteredProducts() {
    let filtered =
      activeFilter === "all"
        ? [...products]
        : products.filter(p => p.category === activeFilter);

    const searchTerm = searchInput?.value.toLowerCase().trim() || "";

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm)
      );
    }

    switch (activeSort) {
      case "price-asc":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-desc":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }

  function renderProducts() {
    const filtered = getFilteredProducts();

    productCount.textContent = filtered.length;

    if (!filtered.length) {
      productGrid.innerHTML =
        `<p class="empty-message">No products found.</p>`;
      return;
    }

    productGrid.innerHTML = filtered.map(product => `
      <article class="product-card" data-id="${product.id}">
        <div class="card-img-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy">

          ${product.tag ? `
            <span class="card-tag">
              ${product.tag}
            </span>
          ` : ""}

          <div class="card-overlay">
            <button class="card-quick-view" data-id="${product.id}">
              Quick View
            </button>
          </div>
        </div>

        <div class="card-body">
          <p class="card-category">
            ${product.category === "black" ? "Black Leather" : "Brown Leather"}
          </p>

          <h3 class="card-name">${product.name}</h3>

          <div class="card-footer">
            <span class="card-price">
              ₦${Number(product.price).toLocaleString()}
            </span>

            <button class="card-add" data-id="${product.id}">
              <i class="bx bx-plus"></i>
            </button>
          </div>
        </div>
      </article>
    `).join("");

    attachProductEvents();
  }

  function attachProductEvents() {
    document.querySelectorAll(".card-add").forEach(btn => {
      btn.addEventListener("click", () => {
        addToCart(btn.dataset.id);
      });
    });

    document.querySelectorAll(".card-quick-view").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const product = products.find(p => p.id === btn.dataset.id);

        if (product) {
          alert(`${product.name}\n\n${product.description || ""}`);
        }
      });
    });
  }

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    window.addToCart(product);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      activeFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  sortSelect?.addEventListener("change", e => {
    activeSort = e.target.value;
    renderProducts();
  });

  searchInput?.addEventListener("input", renderProducts);

  /* ----- NAV HAMBURGER (same as login-page) ----- */
  const menuToggle = document.getElementById('menu-toggle');
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  function openNav() {
    navLinks?.classList.add('nav-open');
    menuIcon?.classList.replace('bx-menu', 'bx-x');
    menuToggle?.classList.add('menu-open');
    if (navOverlay) { navOverlay.style.display = 'block'; requestAnimationFrame(() => navOverlay.classList.add('visible')); }
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navLinks?.classList.remove('nav-open');
    menuIcon?.classList.replace('bx-x', 'bx-menu');
    menuToggle?.classList.remove('menu-open');
    navOverlay?.classList.remove('visible');
    setTimeout(() => { if (navOverlay) navOverlay.style.display = 'none'; }, 340);
    document.body.style.overflow = '';
  }

  menuToggle?.addEventListener('click', (e) => {
    if (e.target.closest('.menu-cart')) return; // cart button opens the cart, not the menu
    navLinks?.classList.contains('nav-open') ? closeNav() : openNav();
  });
  navOverlay?.addEventListener('click', closeNav);
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  loadProducts();
})();