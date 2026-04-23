// ===============================
// MOBILE NAVIGATION TOGGLE
// ===============================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

  const toggleMenu = () => {
    navLinks.classList.toggle("nav-open");

    // Change icon
    if (menuToggle.classList.contains("bx-menu")) {
      menuToggle.classList.replace("bx-menu", "bx-x");
    } else {
      menuToggle.classList.replace("bx-x", "bx-menu");
    }
  };

  // Click menu icon
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Keyboard accessibility
  menuToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when clicking links
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("nav-open");
      menuToggle.classList.remove("bx-x");
      menuToggle.classList.add("bx-menu");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("nav-open");
      menuToggle.classList.remove("bx-x");
      menuToggle.classList.add("bx-menu");
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