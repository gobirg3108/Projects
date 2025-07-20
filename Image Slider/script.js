// IMAGE SLIDER WITH ENHANCEMENTS
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".slider-nav");
let slideIndex = 0;
let intervalId = null;

// Initialize slider
document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
  if (slides.length > 0) {
    // Create navigation dots
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    updateSlider();
    intervalId = setInterval(nextSlide, 5000);
  }
}

function updateSlider() {
  // Update slides visibility
  slides.forEach((slide, index) => {
    slide.classList.toggle("displaySlide", index === slideIndex);
  });

  // Update active dot
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === slideIndex);
  });
}

function goToSlide(index) {
  clearInterval(intervalId);
  slideIndex = index;
  updateSlider();
  intervalId = setInterval(nextSlide, 5000);
}

function prevSlide() {
  clearInterval(intervalId);
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  updateSlider();
  intervalId = setInterval(nextSlide, 5000);
}

function nextSlide() {
  clearInterval(intervalId);
  slideIndex = (slideIndex + 1) % slides.length;
  updateSlider();
  intervalId = setInterval(nextSlide, 5000);
}

// Pause on hover
const slider = document.querySelector(".slider");
slider.addEventListener("mouseenter", () => clearInterval(intervalId));
slider.addEventListener("mouseleave", () => {
  clearInterval(intervalId);
  intervalId = setInterval(nextSlide, 5000);
});
