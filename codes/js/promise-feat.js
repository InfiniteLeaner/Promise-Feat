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
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("nav-open");

        if (navLinks.classList.contains("nav-open")) {
            menuToggle.classList.replace("bx-menu", "bx-x");
        } else {
            menuToggle.classList.replace("bx-x", "bx-menu");
        }
    });

    // Close menu when link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("nav-open");
            menuToggle.classList.replace("bx-x", "bx-menu");
        });
    });
}

// ✅ KEY CHANGE:
// The carousel JS DOES NOT interact with nav-links or menuToggle anymore.
// Menu will stay open even when carousel slides automatically.
