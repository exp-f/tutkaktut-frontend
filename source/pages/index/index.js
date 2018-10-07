import 'Templates/Base/index';
import './index.scss';

const closeDropdown = (e, a) => {
  if (!e.target.matches('.block_1_select_dropdown > *')) {
    document.querySelector('.open').classList.remove('open');
    document.querySelector('.block_1_select_dropdown').style.maxHeight = '';
    document.body.removeEventListener('click', closeDropdown);
  }
};

document.querySelector('.block_1_selected').addEventListener('click', (e) => {
  e.stopPropagation();
  const container = e.target.parentElement;
  const dropdown = container.querySelector('.block_1_select_dropdown');
  let newHeight = 20;
  [...dropdown.children].forEach((i) => {
    newHeight += i.offsetHeight;
  });
  dropdown.style.maxHeight = `${newHeight}px`;
  container.classList.add('open');
  document.body.addEventListener('click', closeDropdown);
});

document.querySelectorAll('.block_1_select_dropdown_item').forEach((item) => {
  item.addEventListener('click', (e) => {
    const container = e.target.parentElement.parentElement;
    const valueHandler = container.querySelector('.block_1_selected');
    const dropdown = container.querySelector('.block_1_select_dropdown');
    const input = container.querySelector('input');
    const newText = e.target.innerText;
    const newValue = e.target.getAttribute('data-value');
    valueHandler.innerText = newText;
    input.value = newValue;
    dropdown.style.maxHeight = '';
    container.classList.remove('open');
    document.body.removeEventListener('click', closeDropdown);
  });
});