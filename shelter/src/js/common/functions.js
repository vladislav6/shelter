export const petsWithId = (pets) => pets.forEach((pet, id) => pet.id = id);

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

export function createModal(pet) {
  const {
    name,
    img,
    type,
    breed,
    description,
    age,
    inoculations,
    diseases,
    parasites
  } = pet;

  const overlay = createMyElement('div', 'overlay');
  const wrapper = createMyElement('div', 'wrapper');
  
  const closeBtn = createMyElement('button', 'btn sldr-pgntn-btn close-modal-btn');
  const modal = createMyElement('div', 'modal');

  const imgBlock = createMyElement('div', 'modal__img');
  const petPicture = createMyElement('img');
  petPicture.src = img;
  petPicture.width = 500;
  petPicture.height = 500;
  petPicture.alt = `Pet ${type}`;
  
  const aboutPet = createMyElement('div', 'modal__info');
  const title = createMyElement('h3', 'modal__title', name);
  const typeBreed = createMyElement('p', 'modal__type', `${type} - ${breed}`);
  const desc = createMyElement('p', 'modal__description', description);

  const list = createMyElement('ul', 'modal__list');
  const itemAge = createMyElement('li', '', age);
  const ageLabel = createMyElement('span', '', 'Age: ');
  itemAge.prepend(ageLabel);
  const itemInoculations = createMyElement('li', '', inoculations.join(', '));
  const inoculationsLabel = createMyElement('span', '', 'Inoculations: ');
  itemInoculations.prepend(inoculationsLabel);
  const itemDiseases = createMyElement('li', '', diseases.join(', '));
  const diseasesLabel = createMyElement('span', '', 'Diseases: ');
  itemDiseases.prepend(diseasesLabel);
  const itemParasites = createMyElement('li', '', parasites.join(', '));
  const parasitesLabel = createMyElement('span', '', 'Parasites: ');
  itemParasites.prepend(parasitesLabel);
  list.append(itemAge, itemInoculations, itemDiseases, itemParasites);
  
  imgBlock.append(petPicture);
  aboutPet.append(title, typeBreed, desc, list);
  modal.append(imgBlock, aboutPet);
  wrapper.append(closeBtn, modal);
  overlay.append(wrapper);

  return overlay;
}

const createGroups = (groupsCount, groupName) => {
  return Array.from( {length: groupsCount }, () => {
    const group = document.createElement('div');
    group.classList.add(groupName);
    return group;
  });
};

const createCards = (pets) => {
  return pets.map(({id, name, img}) => {
    const card = createMyElement('div', 'card');
    card.dataset.petId = id;
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

export function getCardsFragment(pets, groupSize, groupName) {
  const fragment = document.createDocumentFragment();

  const groupsCount = Math.ceil(pets.length / groupSize);

  const groupsElement = createGroups(groupsCount, groupName);
  const cards = createCards(pets);
  
  let groupId = 0;
  cards.forEach((card) => {
    if (groupsElement[groupId].children.length === groupSize) {
      groupId += 1;
    }

    groupsElement[groupId].append(card);
  });

  groupsElement.forEach((group) => fragment.append(group));

  return fragment;
}

export const newPetsSizeCard = (pets) =>
  [...pets, ...pets, ...pets, ...pets, ...pets, ...pets];