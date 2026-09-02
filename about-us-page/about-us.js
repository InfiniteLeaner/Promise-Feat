(() => {
  "use strict";

  let products = [];
  let cart = JSON.parse(localStorage.getItem("pf-cart") || "[]");

  let activeFilter = "all";
  let activeSort = "default";

  const productGrid = document.getElementById("product-grid");
  const productCount = document.getElementById("product-count");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const filterButtons = document.querySelectorAll(".filter-tab");
  const cartCount = document.getElementById("cart-count");

  async function loadProducts() {
    try {
      const response = await fetch("./products.json");

      if (!response.ok) throw new Error("Unable to load products");

      const data = await response.json();
      products = data.products || data;

      renderProducts();
      updateCartCount();

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

    cart.push(product);
    localStorage.setItem("pf-cart", JSON.stringify(cart));

    updateCartCount();
  }

  function updateCartCount() {
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
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

  loadProducts();
})();