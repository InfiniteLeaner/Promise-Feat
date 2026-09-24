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


// ===============================
// HERO TO LOGIN PANEL TRANSITION
// ===============================
const heroContent = document.getElementById("hero-content");
const beginJourneyBtn = document.getElementById("begin-journey-btn");
const loginPanelSection = document.getElementById("login-panel-section");
const backToWelcomeBtn = document.getElementById("back-to-welcome");
const loginForm = document.getElementById("login-form");
const loginEye = document.getElementById("login-eye");
const loginPw = document.getElementById("login-pw");

let heroAnimationDone = false;

// Check if hero animation is complete (after all welcomeFadeUp animations)
const HERO_ANIMATION_DURATION = 1600; // 1s delay + 0.6s animation for button = 1.6s

function checkHeroAnimationComplete() {
  if (!heroAnimationDone) {
    heroAnimationDone = true;
    // Hero animation is done, button is now interactive
    beginJourneyBtn.style.pointerEvents = "auto";
  }
}

// Start checking after the last animation delay
setTimeout(checkHeroAnimationComplete, HERO_ANIMATION_DURATION);

function showLoginPanel() {
  // Animate hero content out
  heroContent.style.transition = "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
  heroContent.style.opacity = "0";
  heroContent.style.transform = "translateY(-40px)";
  heroContent.style.pointerEvents = "none";

  // Show login panel after hero starts fading
  setTimeout(() => {
    loginPanelSection.style.display = "flex";
    document.body.style.overflow = "hidden";
    
    // Trigger reflow for animation
    loginPanelSection.offsetHeight;
    
    // Focus first input for accessibility
    const usernameInput = loginForm?.querySelector('input[name="username"]');
    usernameInput?.focus();
  }, 200);
}

function hideLoginPanel() {
  loginPanelSection.style.display = "none";
  document.body.style.overflow = "";
  
  // Animate hero content back in
  heroContent.style.transition = "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
  heroContent.style.opacity = "1";
  heroContent.style.transform = "translateY(0)";
  heroContent.style.pointerEvents = "auto";
}

if (beginJourneyBtn && loginPanelSection) {
  beginJourneyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showLoginPanel();
  });
}

if (backToWelcomeBtn) {
  backToWelcomeBtn.addEventListener("click", hideLoginPanel);
}

// Close login panel on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && loginPanelSection.style.display === "flex") {
    hideLoginPanel();
  }
});

// Toggle password visibility
if (loginEye && loginPw) {
  loginEye.addEventListener("click", () => {
    const type = loginPw.type === "password" ? "text" : "password";
    loginPw.type = type;
    loginEye.classList.toggle("bx-hide", type === "password");
    loginEye.classList.toggle("bx-show", type === "text");
  });
}

// Handle login form submission
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const username = formData.get("username");
    const password = formData.get("password");
    
    // TODO: Add actual authentication logic
    console.log("Login attempt:", { username, password });
    
    // For now, just show success and go back
    alert(`Welcome back, ${username}!`);
    hideLoginPanel();
  });
}

// Register link handler
const goToRegister = document.getElementById("go-to-register");
if (goToRegister) {
  goToRegister.addEventListener("click", () => {
    alert("Registration feature coming soon!");
  });
}
