// =======================
// CAROUSEL
// =======================

// Step 1: Get DOM
const nextDom = document.getElementById('next');
const prevDom = document.getElementById('prev');

const carouselDom = document.querySelector('.carousel');
const sliderDom = carouselDom.querySelector('.list');
const thumbnailBorderDom = carouselDom.querySelector('.thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

const timeRunning = 3000;
const timeAutoNext = 7000;

nextDom.onclick = () => showSlider('next');
prevDom.onclick = () => showSlider('prev');

let runTimeOut;
let runNextAuto = setTimeout(() => {
  nextDom.click();
}, timeAutoNext);

function showSlider(type) {
  const sliderItemsDom = sliderDom.querySelectorAll('.item');
  thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

  if (type === 'next') {
    sliderDom.appendChild(sliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add('next');
  } else {
    sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add('prev');
  }

  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove('next', 'prev');
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    nextDom.click();
  }, timeAutoNext);
}

// =======================
// BACKGROUND AUDIO
// =======================

const audio = document.getElementById("bg-music");
const volumeSlider = document.getElementById("volume-slider");

if (audio) {
  audio.volume = 0.5;

  const playAudio = () => {
    audio.play().catch(() => {});
    document.removeEventListener('click', playAudio);
    document.removeEventListener('scroll', playAudio);
  };

  document.addEventListener('click', playAudio);
  document.addEventListener('scroll', playAudio);
}

if (volumeSlider && audio) {
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
  });
}

// =======================
// RESPONSIVE NAVBAR
// =======================

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
