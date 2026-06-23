import pets from '../common/pets.json';
import { newPetsSizeCard, getCardsFragment, cleanDOM, shuffle, petsWithId } from '../common/functions';
import { openModal } from './modal';

if (document.querySelector('.pets-page')) {
  petsWithId(pets);
  const newPets = newPetsSizeCard(pets);

  const petsLists = document.querySelector('.pets__lists');
  const pagination = document.querySelector('.pagination');

  const setCurrentPage = (currentPage) => {
    [...petsLists.children]
      .forEach((page, id) => {
        page.classList.remove('active-pagination-page');
        page.dataset.pageId = id + 1;
      });
    
    currentPage.classList.add('active-pagination-page');

    pagination.querySelector('.active').textContent = currentPage.dataset.pageId;

    if (!currentPage.previousSibling) {
      pagination.querySelector('.first').classList.add('inactive');
      pagination.querySelector('.prev').classList.add('inactive');
      pagination.querySelector('.next').classList.remove('inactive');
      pagination.querySelector('.last').classList.remove('inactive');
    }
    
    if (!currentPage.nextSibling) {
      pagination.querySelector('.first').classList.remove('inactive');
      pagination.querySelector('.prev').classList.remove('inactive');
      pagination.querySelector('.next').classList.add('inactive');
      pagination.querySelector('.last').classList.add('inactive');
    }

    if (currentPage.previousSibling && currentPage.nextSibling) {
      pagination.querySelector('.first').classList.remove('inactive');
      pagination.querySelector('.prev').classList.remove('inactive');
      pagination.querySelector('.next').classList.remove('inactive');
      pagination.querySelector('.last').classList.remove('inactive');
    }
  };

  const renderCards = (cardsPerPage) => {
    if (petsLists.hasChildNodes()
      && petsLists.firstChild
      && petsLists.firstChild.children.length === cardsPerPage
    ) return;
    const fragment = getCardsFragment(newPets, cardsPerPage, 'pets__list');
    cleanDOM(petsLists);
    petsLists.append(fragment);
    setCurrentPage(petsLists.firstChild);
    petsLists.querySelectorAll('.pets__list').forEach((page, id) => {
      if(id % 2 === 0) {
        const reversed = [...page.children].reverse();
        cleanDOM(page);
        page.append(...reversed);
      }
    });
  };

  const drawCards = () => {
    const cardsPerPage = window.innerWidth > 970 ? 8 : window.innerWidth > 530 ? 6 : 3;
    renderCards(cardsPerPage);
  };

  drawCards();
  window.addEventListener('resize', drawCards);

  petsLists.addEventListener('click', openModal);

  const moveToFirst = () => {
    setCurrentPage(petsLists.firstChild);
  };

  const moveToPrev = () => {
    const currentPage = petsLists.querySelector('.active-pagination-page');
    setCurrentPage(currentPage.previousElementSibling);
  };

  const moveToNext = () => {
    const currentPage = petsLists.querySelector('.active-pagination-page');
    setCurrentPage(currentPage.nextElementSibling);
  };

  const moveToLast = () => {
    setCurrentPage(petsLists.lastChild);
  };

  const changePage = (e) => {
    if(e.target.closest('.first')) moveToFirst();
    if(e.target.closest('.prev')) moveToPrev();
    if(e.target.closest('.next')) moveToNext();
    if(e.target.closest('.last')) moveToLast();
  };

  pagination.addEventListener('click', changePage);
}