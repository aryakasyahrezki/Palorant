document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".main-slide");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  const thumbnails = document.querySelectorAll(".slide-thumbnail");
  const sliderContainer = document.querySelector(".map-slider");
  const countItem = items.length;

  let itemActive = 0;
  let autoSlideInterval;
  let interactionTimeout;

  const AUTO_SLIDE_DELAY = 7000; // 7s pause after interaction
  const NORMAL_SLIDE_DELAY = 5000; // 5s between slides

  function handleUserInteraction() {
    clearInterval(autoSlideInterval);
    clearTimeout(interactionTimeout);
    interactionTimeout = setTimeout(() => {
      startAutoSlide(NORMAL_SLIDE_DELAY);
    }, AUTO_SLIDE_DELAY);
  }

  function startAutoSlide(delay) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(goToNext, delay);
  }

  function goToNext() {
    itemActive = (itemActive + 1) % countItem;
    updateSlider();
  }

  function goToPrev() {
    itemActive = (itemActive - 1 + countItem) % countItem;
    updateSlider();
  }

  function updateSlider() {
    document
      .querySelectorAll(".main-slide.active, .slide-thumbnail.active")
      .forEach((el) => {
        el.classList.remove("active");
      });

    items[itemActive].classList.add("active");
    if (thumbnails[itemActive]) {
      thumbnails[itemActive].classList.add("active");
    }
  }

  function setupEventListeners() {
    if (next && prev) {
      next.addEventListener("click", () => {
        handleUserInteraction();
        goToNext();
      });

      prev.addEventListener("click", () => {
        handleUserInteraction();
        goToPrev();
      });
    }

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        handleUserInteraction();
        itemActive = index;
        updateSlider();
      });
    });

    if (sliderContainer) {
      sliderContainer.addEventListener("click", (e) => {
        if (!e.target.closest(".slider-arrows, .slide-thumbnail")) {
          handleUserInteraction();
        }
      });
    }
  }

  function initSlider() {
    setupEventListeners();
    startAutoSlide(NORMAL_SLIDE_DELAY);
    updateSlider();
  }

  initSlider();
});
