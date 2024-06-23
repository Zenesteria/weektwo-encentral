// CLASS NAME CONSTANTS
const ACTIVE_SLIDE_NAME = "active__slide";
const ACTIVE_DOT_NAME = "active__dot";

const carouselTrack = document.getElementById("carousel__track");
const carouselDots = document.getElementById("carousel__dots");
const prevButton = document.getElementById("prev__button");
const nextButton = document.getElementById("next__button");

// CAROUSEL VARIABLES
let slideIndex = 0;
let slidesLength = carouselTrack.children.length;

// Reset Carousel Classes
const resetCarousel = (index) => {
  carouselDots.children[index].classList.remove(ACTIVE_DOT_NAME);
  carouselTrack.children[index].classList.remove(ACTIVE_SLIDE_NAME);
};

// Update Carousel Classes and handle slide track movement
const updateCarousel = (index) => {
  carouselTrack.style.transform = `translateX(-${
    index * (100 / slidesLength)
  }%)`;
  carouselTrack.children[index].classList.add(ACTIVE_SLIDE_NAME);
  carouselDots.children[index].classList.add(ACTIVE_DOT_NAME);

  handleCarouselEnd();
};

// Handles What happens at the endpoints of the carousel
const handleCarouselEnd = () => {
  prevButton.classList.remove("end__button");
  prevButton.removeAttribute("disabled");

  nextButton.classList.remove("end__button");
  nextButton.removeAttribute("disabled");

  if (slideIndex == 0) {
    prevButton.classList.add("end__button");
    prevButton.setAttribute("disabled", true);
    return;
  }

  if (slideIndex == slidesLength - 1) {
    nextButton.classList.add("end__button");
    nextButton.setAttribute("disabled", true);
    return;
  }
};

// Add Dots to the DOM
for (let i = 0; i < slidesLength; i++) {
  let dot = document.createElement("li");
  dot.setAttribute("data-index", i);
  dot.addEventListener("click", () => {
    resetCarousel(slideIndex);
    slideIndex = i;
    updateCarousel(i);
  });
  carouselDots.appendChild(dot);
}

// Add active class to the first dot
carouselDots.children[slideIndex].classList.add("active__dot");
handleCarouselEnd();

prevButton.addEventListener("click", () => {
  resetCarousel(slideIndex);

  slideIndex > 0 && (slideIndex -= 1);

  updateCarousel(slideIndex);
});

nextButton.addEventListener("click", () => {
  resetCarousel(slideIndex);

  slideIndex < slidesLength - 1 && (slideIndex += 1);

  updateCarousel(slideIndex);
});
