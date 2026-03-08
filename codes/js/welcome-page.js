
// Mobile menu toggle functionality with accessibility improvements
const menuToggle = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

// Add event listener only if elements exist
if (menuToggle && navLinks) {
  // Click event for mouse/touch
  menuToggle.addEventListener('click', () => {
    toggleMenu();
  });

  // Keyboard support: Enter or Space to toggle
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when clicking outside or on a link
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });

  // Function to toggle menu
  function toggleMenu() {
    navLinks.classList.toggle('active');
  }
} else {
  console.warn('Menu toggle elements not found. Ensure .menu-btn and .nav-links exist in the DOM.');
}