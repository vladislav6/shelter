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

const createGroups = (groupsCount, groupName) => {
  return Array.from( {length: groupsCount }, () => {
    const group = document.createElement('div');
    group.classList.add(groupName);
    return group;
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