/* ===== PROMISE FEATS — AUTH SCRIPT ===== */

(function () {
  const pageWrapper = document.getElementById('page-wrapper');
  const goToRegister = document.getElementById('go-to-register');
  const goToLogin    = document.getElementById('go-to-login');

  /* ----- PANEL SWITCHING ----- */
  goToLogin?.addEventListener('click', () => {
    pageWrapper?.classList.add('show-login');
  });

  goToRegister?.addEventListener('click', () => {
    pageWrapper?.classList.remove('show-login');
  });

  /* ----- PASSWORD TOGGLE ----- */
  function bindEye(inputId, eyeIconId) {
    const input = document.getElementById(inputId);
    const eye   = document.getElementById(eyeIconId);
    if (!input || !eye) return;
    eye.closest('.eye-btn')?.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      eye.classList.toggle('bx-hide', !show);
      eye.classList.toggle('bx-show', show);
    });
  }

  bindEye('login-pw', 'login-eye');
  bindEye('register-pw', 'register-eye');

  /* ----- FORM SUBMIT (prevent default, console log) ----- */
  document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      console.log('Form submitted:', form.id, data);
    });
  });

  /* ----- NAV HAMBURGER ----- */
  const menuToggle = document.getElementById('menu-toggle');
  const menuIcon = document.getElementById('menu-icon');
  const navLinks   = document.querySelector('.nav-links');
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
    navLinks?.classList.contains('nav-open') ? closeNav() : openNav();
  });
  navOverlay?.addEventListener('click', closeNav);
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

})();
