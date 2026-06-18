const nav = document.querySelector('nav.navigation');


const showMenu = (e) => {
  if (window.innerWidth <= 760) {
    window.addEventListener('resize', closeMenu);

    if (
      e.target.closest('.mobile') ||
      e.target.classList.contains('show-menu') ||
      e.target.classList.contains('active') ||
      e.target.hasAttribute('href')
    ) {
      nav.classList.toggle('show-menu');
      document.body.classList.toggle('scroll-lock');
    }

    if (e.target.hasAttribute('href')) {
      e.preventDefault();
      setTimeout(() => {
        window.location = e.target.href;
      }, 600);
    }

    if (!nav.classList.contains('show-menu')) {
      window.removeEventListener('resize', closeMenu);
    }
  }
};

const closeMenu = () => {
  nav.classList.remove('show-menu');
  document.body.classList.remove('scroll-lock');
  window.removeEventListener('resize', closeMenu);
};

nav.addEventListener('click', showMenu);