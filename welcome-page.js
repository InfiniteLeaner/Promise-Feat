// ===============================
// MOBILE NAVIGATION TOGGLE
// ===============================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navOverlay = document.getElementById("nav-overlay");

if (menuToggle && navLinks) {

  const menuIcon = menuToggle.querySelector("i");

  const closeMenu = () => {
    navLinks.classList.remove("nav-open");
    menuIcon.classList.replace("bx-x", "bx-menu");
    menuToggle.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Toggle menu");
    navOverlay?.classList.remove("visible");
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle("nav-open");
    menuToggle.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Toggle menu");
    navOverlay?.classList.toggle("visible", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (menuIcon.classList.contains("bx-menu")) {
      menuIcon.classList.replace("bx-menu", "bx-x");
    } else {
      menuIcon.classList.replace("bx-x", "bx-menu");
    }
  };

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  navOverlay?.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("nav-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });
}


// ===============================
// FLOATING ACTION BUTTON (FAB)
// ===============================
const fabBtn = document.getElementById("fab-btn");
const fabOptions = document.getElementById("fab-options");

if (fabBtn && fabOptions) {

  fabBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    fabOptions.classList.toggle("active");
    fabBtn.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!fabBtn.contains(e.target) && !fabOptions.contains(e.target)) {
      fabOptions.classList.remove("active");
      fabBtn.classList.remove("active");
    }
  });
}
