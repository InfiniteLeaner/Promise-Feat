const nextDom = document.getElementById("next");
const prevDom = document.getElementById("prev");
const carouselDom = document.querySelector(".carousel");
const slider = carouselDom?.querySelector(".list");

if (nextDom && prevDom && carouselDom && slider) {
  let slides = Array.from(slider.querySelectorAll(".item"));
  let index = 0;
  let autoSlide = null;
  const AUTOPLAY_MS = 7000;

  // Timer line under the title: fills over one autoplay interval, resets on every slide change.
  const progressBars = document.querySelectorAll(".carousel .title-bar");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const resetProgress = () => {
    if (reducedMotion || !progressBars.length) return;
    progressBars.forEach((bar) => {
      bar.style.transition = "none";
      bar.style.width = "0";
    });
    void progressBars[0].offsetWidth; // force reflow so the fill restarts
    progressBars.forEach((bar) => {
      bar.style.transition = `width ${AUTOPLAY_MS}ms linear`;
      bar.style.width = "100%";
    });
  };

  // Duplicate the thumbnails once so the marquee can loop seamlessly.
  // Clones are decorative (hidden from AT / keyboard) but stay clickable.
  const thumbTrack = document.querySelector(".thumbnail-track");
  if (thumbTrack) {
    Array.from(thumbTrack.querySelectorAll(".item")).forEach((item) => {
      const clone = item.cloneNode(true);
      clone.classList.add("clone");
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("tabindex", "-1");
      thumbTrack.appendChild(clone);
    });

    // + button on each thumbnail adds the shoe to the cart.
    // stopPropagation so it never triggers slide navigation.
    thumbTrack.querySelectorAll(".thumb-add").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.addToCart({
          id: btn.dataset.id,
          name: btn.dataset.name,
          price: Number(btn.dataset.price),
          image: btn.closest(".item")?.querySelector("img")?.src || "",
        });
      });
    });
  }

  const getSlideWidth = () => carouselDom.clientWidth || slides[0]?.offsetWidth || 0;

  const updateSlider = () => {
    slider.style.transform = `translateX(-${index * getSlideWidth()}px)`;
    // keep thumbnails in sync when they map 1:1 to slides (skip marquee clones)
    document.querySelectorAll(".thumbnail .item").forEach((t, i) => {
      if (t.classList.contains("clone")) return;
      t.classList.toggle("active", i % Math.max(slides.length, 1) === index);
    });
  };

  const showSlide = (i) => {
    index = (i + slides.length) % slides.length;
    updateSlider();
    resetProgress();
  };

  const goTo = (i) => {
    showSlide(i);
    restartAutoplay();
  };

  const stopAutoplay = () => {
    if (autoSlide) { clearInterval(autoSlide); autoSlide = null; }
  };

  const restartAutoplay = () => {
    stopAutoplay();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoSlide = setInterval(() => {
      showSlide(index + 1);
    }, AUTOPLAY_MS);
  };

  slider.style.transition = "transform 0.8s ease-in-out";
  updateSlider();
  restartAutoplay();
  resetProgress();

  nextDom.addEventListener("click", () => goTo(index + 1));
  prevDom.addEventListener("click", () => goTo(index - 1));

  // Thumbnail navigation (any thumbnail jumps to a slide)
  document.querySelectorAll(".thumbnail .item").forEach((thumb, i) => {
    const select = () => goTo(i % slides.length);
    thumb.addEventListener("click", select);
    thumb.addEventListener("keydown", (e) => {
      if (e.target.closest(".thumb-add")) return; // let the + button handle its own keys
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(); }
    });
  });

  // Touch / swipe support — essential on mobile
  let touchStartX = 0;
  let touchDeltaX = 0;
  const SWIPE_THRESHOLD = 40;

  carouselDom.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
    stopAutoplay();
  }, { passive: true });

  carouselDom.addEventListener("touchmove", (e) => {
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  carouselDom.addEventListener("touchend", () => {
    if (Math.abs(touchDeltaX) > SWIPE_THRESHOLD) {
      showSlide(index + (touchDeltaX < 0 ? 1 : -1));
    }
    restartAutoplay();
  });

  // Keyboard arrows when carousel is in view
  carouselDom.setAttribute("tabindex", "0");
  carouselDom.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft") goTo(index - 1);
  });

  let resizeRaf = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      slides = Array.from(slider.querySelectorAll(".item"));
      updateSlider();
    });
  });
  window.addEventListener("orientationchange", () => {
    setTimeout(updateSlider, 120);
  });

  carouselDom.addEventListener("mouseenter", stopAutoplay);
  carouselDom.addEventListener("mouseleave", restartAutoplay);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else restartAutoplay();
  });
}

// ================= MOBILE NAVBAR (same behaviour as login-page) =================
const menuToggle = document.getElementById('menu-toggle');
const menuIcon   = document.getElementById('menu-icon');
const navLinks   = document.querySelector('.nav-links');
const navOverlay = document.getElementById('nav-overlay');

function openNav() {
    navLinks?.classList.add('nav-open');
    menuIcon?.classList.replace('bx-menu', 'bx-x');
    menuToggle?.classList.add('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'true');
    menuToggle?.setAttribute('aria-label', 'Close menu');
    if (navOverlay) navOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    navLinks?.classList.remove('nav-open');
    menuIcon?.classList.replace('bx-x', 'bx-menu');
    menuToggle?.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Toggle menu');
    navOverlay?.classList.remove('visible');
    document.body.style.overflow = '';
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        navLinks.classList.contains('nav-open') ? closeNav() : openNav();
    });
    navOverlay?.addEventListener('click', closeNav);
    document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
            closeNav();
            menuToggle.focus();
        }
    });
    // If the viewport grows back to desktop while the drawer is open, reset it.
    window.matchMedia('(min-width: 821px)').addEventListener?.('change', (e) => {
        if (e.matches) closeNav();
    });
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
