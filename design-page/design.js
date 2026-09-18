/*
 * Consolidated JavaScript file
 * Cleaned & Optimized Version
 */

(function () {

	// =========================
	// GLOBAL MOBILE NAVIGATION
	// =========================
	const menuToggle = document.getElementById("menu-toggle");
	const menuIcon = document.getElementById("menu-icon");
	const navLinks = document.querySelector(".nav-links");
	const navOverlay = document.getElementById("nav-overlay");

	if (menuToggle && navLinks) {

		const closeMenu = () => {
			navLinks.classList.remove("nav-open");
			menuIcon.classList.remove("bx-x");
			menuIcon.classList.add("bx-menu");
			menuToggle.classList.remove("menu-open");
			menuToggle.setAttribute("aria-expanded", "false");
			navOverlay?.classList.remove("visible");
			if (navOverlay) setTimeout(() => { if (!navLinks.classList.contains("nav-open")) navOverlay.style.display = "none"; }, 340);
			document.body.style.overflow = "";
		};

		const openMenu = () => {
			navLinks.classList.add("nav-open");
			menuIcon.classList.remove("bx-menu");
			menuIcon.classList.add("bx-x");
			menuToggle.classList.add("menu-open");
			menuToggle.setAttribute("aria-expanded", "true");
			if (navOverlay) { navOverlay.style.display = "block"; requestAnimationFrame(() => navOverlay.classList.add("visible")); }
			document.body.style.overflow = "hidden";
		};

		const toggleMenu = (e) => {
			e?.stopPropagation();

			if (navLinks.classList.contains("nav-open")) {
				closeMenu();
			} else {
				openMenu();
			}
		};

		// Click
		menuToggle.addEventListener("click", toggleMenu);

		// Keyboard Accessibility
		menuToggle.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				toggleMenu(e);
			}
		});

		// Close on Escape
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") closeMenu();
		});

		// Close when clicking nav links
		document.querySelectorAll(".nav-links a").forEach(link => {
			link.addEventListener("click", closeMenu);
		});

		// Close when clicking outside
		document.addEventListener("click", (e) => {
			if (
				!menuToggle.contains(e.target) &&
				!navLinks.contains(e.target)
			) {
				closeMenu();
			}
		});
	}

	// =========================
	// FLOATING ACTION BUTTON
	// =========================
	const fabBtn = document.getElementById("fab-btn");
	const fabOptions = document.getElementById("fab-options");

	if (fabBtn && fabOptions) {

		fabBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			fabOptions.classList.toggle("active");
			fabBtn.classList.toggle("active");
		});

		document.addEventListener("click", (e) => {
			if (
				!fabBtn.contains(e.target) &&
				!fabOptions.contains(e.target)
			) {
				fabOptions.classList.remove("active");
				fabBtn.classList.remove("active");
			}
		});
	}

	// =========================
	// OPTIONAL GREETING
	// =========================
	const greetingEl = document.getElementById("greeting");

	if (greetingEl) {
		const hour = new Date().getHours();

		if (hour < 12) {
			greetingEl.textContent =
				"Good Morning! Welcome to Promise Feats.";
		} else if (hour < 18) {
			greetingEl.textContent =
				"Good Afternoon! Welcome to Promise Feats.";
		} else {
			greetingEl.textContent =
				"Good Evening! Welcome to Promise Feats.";
		}
	}

	// =========================
	// LOGIN / REGISTER
	// =========================
	const container = document.querySelector(".container");

	if (container) {

		const goToRegister =
			document.querySelector("#go-to-register");

		const goToLogin =
			document.querySelector("#go-to-login");

		goToRegister?.addEventListener("click", (e) => {
			e.preventDefault();
			container.classList.add("active");
		});

		goToLogin?.addEventListener("click", (e) => {
			e.preventDefault();
			container.classList.remove("active");
		});

		// Password Toggle
		document.querySelectorAll(".show-password")
			.forEach((checkbox) => {

				checkbox.addEventListener("change", (e) => {

					const form = e.target.closest("form");
					if (!form) return;

					const passwordFields =
						form.querySelectorAll(
							'input[type="password"], input.password-toggle'
						);

					passwordFields.forEach((field) => {

						if (!field.dataset.originalType) {
							field.dataset.originalType = field.type;
						}

						field.type =
							e.target.checked
								? "text"
								: field.dataset.originalType;

						field.classList.add("password-toggle");
					});
				});
			});

		// Background Audio
		const bgAudio =
			document.querySelector("#bg-audio");

		if (bgAudio) {
			bgAudio.volume = 0.2;

			bgAudio.play().catch((err) => {
				console.log(
					"Audio playback prevented:",
					err
				);
			});
		}

		// Form Submit Logging
		document.querySelectorAll("form")
			.forEach((form) => {

				form.addEventListener("submit", (e) => {
					e.preventDefault();

					console.log(
						`Form submitted: ${
							form.id || "unnamed form"
						}`
					);
				});
			});
	}

	// =========================
	// CAROUSEL
	// =========================
	const carouselDom =
		document.querySelector(".carousel");

	if (carouselDom) {

		const nextDom =
			document.getElementById("next");

		const prevDom =
			document.getElementById("prev");

		const slider =
			carouselDom.querySelector(".list");

		if (nextDom && prevDom && slider) {

			let slides =
				slider.querySelectorAll(".item");

			let index = 0;
			let slideWidth =
				slides[0]?.offsetWidth || 0;

			slider.style.transition =
				"transform 0.8s ease-in-out";

			const updateSlider = () => {
				slider.style.transform =
					`translateX(-${index * slideWidth}px)`;
			};

			nextDom.addEventListener("click", () => {
				index = (index + 1) % slides.length;
				updateSlider();
			});

			prevDom.addEventListener("click", () => {
				index =
					(index - 1 + slides.length) %
					slides.length;

				updateSlider();
			});

			window.addEventListener("resize", () => {
				slides =
					slider.querySelectorAll(".item");

				slideWidth =
					slides[0]?.offsetWidth || 0;

				updateSlider();
			});

			// Auto Slide
			let autoSlide = setInterval(() => {
				nextDom.click();
			}, 7000);

			// Pause On Hover
			carouselDom.addEventListener(
				"mouseenter",
				() => clearInterval(autoSlide)
			);

			carouselDom.addEventListener(
				"mouseleave",
				() => {

					autoSlide = setInterval(() => {
						nextDom.click();
					}, 7000);
				}
			);
		}
	}

	// =========================
	// CART
	// =========================
	const addToCartBtn = document.getElementById("add-to-cart");

	addToCartBtn?.addEventListener("click", () => {
		const name =
			document.getElementById("shoe-name")?.value.trim() ||
			"Custom Shoe";
		const qty = Math.max(
			1,
			Number(document.getElementById("qty")?.value) || 1
		);
		const size =
			document.getElementById("selected-size")?.textContent || "40";
		const part =
			document.querySelector(".part-btn.active")?.textContent.trim() || "Body";
		const colorBtn = document.querySelector(".color-btn.active");
		const colorName = colorBtn?.dataset.name || colorBtn?.dataset.color || "Black";

		window.addToCart({
			id: "custom-shoe",
			name: `${name} (Size ${size}, ${part}/${colorName})`,
			price: 85000,
			image:
				"../media/images/promise-feat-footwears/black-leather-shoes/black-leather-img.14.jpg",
			qty,
		});
	});

	// =========================
	// DESIGN STUDIO CONTROLS
	// =========================
	const CUSTOM_PRICE = 85000;
	const summaryEl = document.getElementById("selection-summary");
	const sizeEl = document.getElementById("selected-size");

	const formatNaira = (n) => "\u20A6" + Number(n || 0).toLocaleString();

	// Paint each color swatch from its data-color so the option is visible.
	document.querySelectorAll(".color-btn").forEach((btn) => {
		if (btn.dataset.color) btn.style.background = btn.dataset.color;
		if (!btn.getAttribute("aria-label")) btn.setAttribute("aria-label", btn.dataset.name || btn.dataset.color || "Color");
	});

	const activeLabel = (selector) => document.querySelector(selector + ".active")?.textContent.trim() || "";
	const activeColorName = () => {
		const btn = document.querySelector(".color-btn.active");
		return btn?.dataset.name || btn?.dataset.color || "Black";
	};

	const updateSummary = () => {
		const sizeBtn = document.querySelector(".size-btn.active");
		if (sizeEl && sizeBtn) sizeEl.textContent = sizeBtn.dataset.size || sizeBtn.textContent.trim();
		if (summaryEl) {
			const part = activeLabel(".part-btn") || "Body";
			summaryEl.innerHTML = `${part} &bull; ${activeColorName()} &bull; Size ${sizeEl?.textContent.trim() || "40"} &mdash; <strong>${formatNaira(CUSTOM_PRICE)}</strong>`;
		}
	};

	const wireGroup = (selector) => {
		const btns = document.querySelectorAll(selector);
		btns.forEach((btn) => {
			btn.addEventListener("click", () => {
				btns.forEach((b) => b.classList.remove("active"));
				btn.classList.add("active");
				updateSummary();
			});
		});
	};

	wireGroup(".part-btn");
	wireGroup(".color-btn");
	wireGroup(".size-btn");
	updateSummary();

})();
