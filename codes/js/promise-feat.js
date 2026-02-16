// ================= CAROUSEL =================
const nextDom = document.getElementById('next');
const prevDom = document.getElementById('prev');
const carouselDom = document.querySelector('.carousel');
const slider = carouselDom.querySelector('.list');

let slides = slider.querySelectorAll('.item');
let index = 0;
let slideWidth = slides[0].offsetWidth;

slider.style.transition = 'transform 0.8s ease-in-out';

function updateSlider() {
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
}

nextDom.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateSlider();
});

prevDom.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
});

window.addEventListener('resize', () => {
    slides = slider.querySelectorAll('.item');
    slideWidth = slides[0].offsetWidth;
    updateSlider();
});

// Auto slide
let autoSlide = setInterval(() => {
    nextDom.click();
}, 7000);

// Pause on hover
carouselDom.addEventListener('mouseenter', () => clearInterval(autoSlide));
carouselDom.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => nextDom.click(), 7000);
});


// ================= CART =================
let cartCount = 0;
const cartCounter = document.getElementById('cart-count');

document.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart')) {
        cartCount++;
        cartCounter.textContent = cartCount;
    }
});


// ================= MOBILE NAVBAR =================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    function openMenu() {
        navLinks.classList.add("nav-open");
        menuToggle.classList.remove("bx-menu");
        menuToggle.classList.add("bx-x");
        document.body.style.overflow = "hidden"; // prevent scroll
    }

    function closeMenu() {
        navLinks.classList.remove("nav-open");
        menuToggle.classList.remove("bx-x");
        menuToggle.classList.add("bx-menu");
        document.body.style.overflow = "auto";
    }

    menuToggle.addEventListener("click", () => {
        if (navLinks.classList.contains("nav-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (
            navLinks.classList.contains("nav-open") &&
            !navLinks.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            closeMenu();
        }
    });

    // Close menu on resize (when switching to desktop)
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}
