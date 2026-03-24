// ===============================
// MOBILE NAVIGATION TOGGLE
// ===============================
const menuToggle = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
  };

  menuToggle.addEventListener('click', toggleMenu);
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', false);
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', false);
    });
  });
}


// ===============================
// FLOATING ACTION BUTTON (FAB)
// ===============================
const fabBtn = document.getElementById('fab-btn');
const fabOptions = document.getElementById('fab-options');

if (fabBtn && fabOptions) {
  fabBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent immediate close
    fabOptions.classList.toggle('active');
    fabBtn.classList.toggle('active');
  });

  // Close FAB when clicking outside
  document.addEventListener('click', (e) => {
    if (!fabBtn.contains(e.target) && !fabOptions.contains(e.target)) {
      fabOptions.classList.remove('active');
      fabBtn.classList.remove('active');
    }
  });
}

// ===============================
// OPTIONAL: DYNAMIC GREETING
// ===============================
const greetingEl = document.getElementById('greeting');
if (greetingEl) {
  const hour = new Date().getHours();
  if (hour < 12) greetingEl.textContent = "Good Morning! Welcome to Promise Feats.";
  else if (hour < 18) greetingEl.textContent = "Good Afternoon! Welcome to Promise Feats.";
  else greetingEl.textContent = "Good Evening! Welcome to Promise Feats.";
}
