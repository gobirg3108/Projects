document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".control.prev");
  const nextBtn = document.querySelector(".control.next");
  const dotsContainer = document.querySelector(".navigation-dots");

  let currentIndex = 0;
  let intervalId;
  const slideInterval = 5000; // 5 seconds

  // Create navigation dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  // Initialize slider
  function initSlider() {
    updateSlider();
    startAutoSlide();

    // Pause on hover
    slider.addEventListener("mouseenter", pauseAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseAutoSlide();
    });

    slider.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoSlide();
    });
  }

  function updateSlider() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoSlide();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function startAutoSlide() {
    intervalId = setInterval(nextSlide, slideInterval);
  }

  function pauseAutoSlide() {
    clearInterval(intervalId);
  }

  function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
  }

  function handleSwipe() {
    const threshold = 50; // Minimum swipe distance
    const difference = touchStartX - touchEndX;

    if (difference > threshold) {
      nextSlide(); // Swipe left
    } else if (difference < -threshold) {
      prevSlide(); // Swipe right
    }
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
      resetAutoSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
      resetAutoSlide();
    }
  });

  // Initialize
  initSlider();
});
