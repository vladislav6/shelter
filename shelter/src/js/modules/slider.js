import { getCardsFragment, cleanDOM, shuffle } from '../common/functions';
import pets from '../common/pets.json';

if (!document.querySelector('.pets-page')) {
  const slider = document.querySelector('.pets-slider__slider');
  const slides = document.querySelector('.pets-slider__slides');

  const renderSlides = (cardsPerSlide) => {
    if (slides.hasChildNodes()
      && slides.lastChild
      && slides.lastChild.children.length === cardsPerSlide
    ) return;
    const fragment = getCardsFragment(pets, cardsPerSlide, 'pets-slider__slide');
    cleanDOM(slides);
    slides.append(fragment);
    slides.querySelectorAll('.pets-slider__slide').forEach((slide) => {
      if (slide.children.length < cardsPerSlide) {
        slide.classList.add('last-slide');
        slides.prepend(slide);
      }
    });
  };

  const drawCards = () => {
    if (slides) {
      const cardsPerSlide = window.innerWidth >= 1140 ? 3 : window.innerWidth >= 755 ? 2 : 1;
      renderSlides(cardsPerSlide);
    }
  };

  drawCards();
  window.addEventListener('resize', drawCards);

  const slidesChildren = (currentPosition) => {
    [...slides.children].forEach((slide) => {
      slide.style.transition = 'transform .6s ease';
      slide.style.transform = `translateX(${currentPosition}%)`;
    });
  };

  const noSlidesChildren = (currentPosition) => {
    [...slides.children].forEach((slide) => {
      slide.style.transition = 'none';
      slide.style.transform = `translateX(${currentPosition}%)`;
    });
  };

  let currentPosition = 0;
  const moveSlider = (e) => {
    if (e.target.closest('.left-arrow')) {
      const leftBtn = e.target.closest('.left-arrow');
      leftBtn.classList.add('no-click');
      currentPosition += 100;
      slidesChildren(currentPosition);
      setTimeout(() => {
        currentPosition = 0;
        noSlidesChildren(currentPosition);
        const lastSlide = slides.lastChild;
        slides.lastChild.remove();
        slides.prepend(lastSlide);
        leftBtn.classList.remove('no-click');
      }, 500);
    }
    if (e.target.closest('.right-arrow')) {
      const rigthBtn = e.target.closest('.right-arrow');
      rigthBtn.classList.add('no-click');
      currentPosition -= 100;
      slidesChildren(currentPosition);
      setTimeout(() => {
        currentPosition = 0;
        noSlidesChildren(currentPosition);
        const firstSlide = slides.firstChild;
        slides.firstChild.remove();
        const cardsPerSlide = window.innerWidth >= 1140 ? 3 : window.innerWidth >= 755 ? 2 : 1;
        if (cardsPerSlide > 1) {
          const currentSlide = slides.lastChild;
          const petNames = [...currentSlide.children].map((pet) => pet.dataset.petName);
          const availableCards = pets.filter((pet) => !petNames.includes(pet.name));
          const shuffledCards = shuffle([...availableCards]);
          const fragment = getCardsFragment(shuffledCards, cardsPerSlide, 'pets-slider__slide').children[0];
          slides.append(fragment);
        } else {
          slides.append(firstSlide);
        }

        rigthBtn.classList.remove('no-click');
      }, 500);
    }
  };

  slider.addEventListener('click', moveSlider);
}