import { createModal, loadPets } from '../common/functions';

export function openModal(event) {
  const isCard = event.target.closest('.card');
  if (!isCard) return;

  document.body.classList.add('scroll-lock');

  const petId = event.target.closest('.card').dataset.petId;

  loadPets('./pets/pets.json')
    .then((pets) => {
      const overlay = createModal(pets[petId]);

      const closeModal = (e) => {
        const isModalContent = e.target.closest('.modal');
        if (isModalContent) return;
        
        document.body.classList.remove('scroll-lock');
        document.body.querySelector('.overlay').remove();
      };

      document.body.append(overlay);
      overlay.addEventListener('click', closeModal);
    });
}