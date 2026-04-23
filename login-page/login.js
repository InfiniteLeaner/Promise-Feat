// ================================
// LOGIN / REGISTER FORM SCRIPT
// ================================

const container = document.querySelector('.container');
if (!container) throw new Error("Container not found!");

// --- SWITCH BETWEEN LOGIN AND REGISTER ---
const goToRegister = document.querySelector('#go-to-register');
const goToLogin = document.querySelector('#go-to-login');

goToRegister?.addEventListener('click', (e) => {
  e.preventDefault();
  container.classList.add('active');
});

goToLogin?.addEventListener('click', (e) => {
  e.preventDefault();
  container.classList.remove('active');
});

// --- TOGGLE PASSWORD VISIBILITY ---
// Works for all checkboxes with class "show-password"
const showPasswordCheckboxes = document.querySelectorAll('.show-password');

showPasswordCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (e) => {
    const form = e.target.closest('form');
    if (!form) return;

    // Find all password fields in this form
    const passwordFields = form.querySelectorAll('input[type="password"], input[type="text"].password-toggle');
    passwordFields.forEach((field) => {
      if (field.dataset.originalType === undefined) {
        // store original type
        field.dataset.originalType = field.type;
      }
      field.type = e.target.checked ? 'text' : field.dataset.originalType;
      // Add class to remember toggle fields
      field.classList.add('password-toggle');
    });
  });
});

// Optional: AUTO PLAY BACKGROUND AUDIO (if exists)
const bgAudio = document.querySelector('#bg-audio');
if (bgAudio) {
  bgAudio.volume = 0.2; // soft volume
  bgAudio.play().catch((err) => {
    console.log('Audio playback prevented:', err);
  });
}

// Optional: Add form submit logging (for testing)
document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(`Form submitted: ${form.id || 'unnamed form'}`);
  });
});