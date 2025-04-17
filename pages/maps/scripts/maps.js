let items = document.querySelectorAll('.slider .list .map');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .map');

let countItem = items.length;
let itemActive = 0;
let autoSlideInterval;
let interactionTimeout;
const AUTO_SLIDE_DELAY = 7000; // 7 seconds
const NORMAL_SLIDE_DELAY = 5000; // 5 seconds

function initSlider() {
  startAutoSlide(NORMAL_SLIDE_DELAY);
  
  if (next && prev) {
    next.onclick = function() {
      handleUserInteraction();
      goToNext();
    }

    prev.onclick = function() {
      handleUserInteraction();
      goToPrev();
    }
  }

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      handleUserInteraction();
      itemActive = index;
      showSlider();
    });
  });
}

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
  showSlider();
}

function goToPrev() {
  itemActive = (itemActive - 1 + countItem) % countItem;
  showSlider();
}

function showSlider() {
  document.querySelectorAll('.slider .list .map.active').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.thumbnail .map.active').forEach(thumb => {
    thumb.classList.remove('active');
  });

  items[itemActive].classList.add('active');
  if (thumbnails[itemActive]) {
    thumbnails[itemActive].classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', initSlider);
