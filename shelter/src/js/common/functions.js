export function cleanDOM(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

function createMyElement(element, classElement = '', textElement = '') {
  const myElement = document.createElement(element);
  if (textElement) {
    myElement.textContent = textElement;
  }
  if (classElement) {
    myElement.className = classElement;
  }

  return myElement;
}

const createSlides = (slidesCount) => {
  return Array.from( {length: slidesCount }, () => {
    const slide = document.createElement('div');
    slide.classList.add('pets-slider__slide');
    return slide;
  });
};

const createCards = (pets) => {
  return pets.map(({name, img}) => {
    const card = createMyElement('div', 'card');
    card.dataset.petName = name;
    const image = createMyElement('img');
    image.src = img;
    image.alt = `pet ${name}`;
    image.width = 270;
    image.height = 270;
    const title = createMyElement('p', 'card__title', name);
    const btn = createMyElement('button', 'btn card__btn', 'Learn more');
    
    card.append(image, title, btn);
    return card;
  });
};

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getCardsFragment(pets, cardsPerSlide = pets.length) {
  const fragment = document.createDocumentFragment();

  const slidesCount = Math.ceil(pets.length / cardsPerSlide);

  const slidesElement = createSlides(slidesCount);
  const cards = createCards(pets);
  
  let slideId = 0;
  cards.forEach((card) => {
    if (slidesElement[slideId].children.length === cardsPerSlide) {
      slideId += 1;
    }

    slidesElement[slideId].append(card);
  });

  slidesElement.forEach((slide) => fragment.append(slide));

  return fragment;
}