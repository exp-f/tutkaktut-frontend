import './index.scss';

const openMenu = (menu) => {
  const newHeight = menu.querySelector('.header_wrapper').offsetHeight;
  menu.classList.add('open');
  menu.style.maxHeight = `${newHeight}px`;
};

const closeMenu = (menu) => {
  menu.classList.remove('open');
  menu.style.maxHeight = '';
};
document.querySelector('.header_burger').addEventListener('click', (e) => {
  const header = e.target.parentElement;
  if (header.classList.contains('open')) {
    closeMenu(header);
  } else {
    openMenu(header);
  }
});