const nextDom = document.getElementById("next");
const prevDom = document.getElementById("prev");
const carouselDom = document.querySelector(".carousel");
const slider = carouselDom?.querySelector(".list");

if (nextDom && prevDom && carouselDom && slider) {
  let slides = slider.querySelectorAll(".item");
  let index = 0;
  let slideWidth = slides[0]?.offsetWidth || 0;

  slider.style.transition = "transform 0.8s ease-in-out";

  const updateSlider = () => {
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
  };

  nextDom.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateSlider();
  });

  prevDom.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
  });

  window.addEventListener("resize", () => {
    slides = slider.querySelectorAll(".item");
    slideWidth = slides[0]?.offsetWidth || 0;
    updateSlider();
  });

  let autoSlide = setInterval(() => nextDom.click(), 7000);

  carouselDom.addEventListener("mouseenter", () => clearInterval(autoSlide));
  carouselDom.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => nextDom.click(), 7000);
  });
}

// ================= CART =================
let cartCount = 0;
const cartCounter = document.getElementById('cart-count');

document.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart')) {
        cartCount++;
        if (cartCounter) cartCounter.textContent = cartCount;
    }
});

// ================= MOBILE NAVBAR =================
const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.querySelector('.nav-links');
const navOverlay = document.getElementById('nav-overlay');

function openNav() {
    navLinks.classList.add('nav-open');
    menuToggle.classList.replace('bx-menu', 'bx-x');
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    navLinks.classList.remove('nav-open');
    menuToggle.classList.replace('bx-x', 'bx-menu');
    if (navOverlay) { navOverlay.classList.remove('visible'); setTimeout(() => { navOverlay.style.display = 'none'; }, 320); }
    document.body.style.overflow = '';
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.contains('nav-open') ? closeNav() : openNav());
    navOverlay?.addEventListener('click', closeNav);
    document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeNav));
}


const fabBtn = document.getElementById("fab-btn");
const fabOptions = document.getElementById("fab-options");

if (fabBtn && fabOptions) {
  fabBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    fabBtn.classList.toggle("active");
    fabOptions.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (!fabBtn.contains(event.target) && !fabOptions.contains(event.target)) {
      fabBtn.classList.remove("active");
      fabOptions.classList.remove("active");
    }
  });
}

