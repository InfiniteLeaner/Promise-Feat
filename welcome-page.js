// ===============================
// MOBILE NAVIGATION TOGGLE
// ===============================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

  const menuIcon = menuToggle.querySelector("i");

  const closeMenu = () => {
    navLinks.classList.remove("nav-open");
    menuIcon.classList.replace("bx-x", "bx-menu");
    menuToggle.setAttribute("aria-expanded", false);
  };

  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", isOpen);

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

  menuToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
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


// ===============================
// OPTIONAL GREETING
// ===============================
const greetingEl = document.getElementById("greeting");

if (greetingEl) {
  const hour = new Date().getHours();

  if (hour < 12) {
    greetingEl.textContent = "Good Morning! Welcome to Promise Feats.";
  } else if (hour < 18) {
    greetingEl.textContent = "Good Afternoon! Welcome to Promise Feats.";
  } else {
    greetingEl.textContent = "Good Evening! Welcome to Promise Feats.";
  }
}
