import 'Templates/Base/index';
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru';
import 'flatpickr/dist/flatpickr.css';
import './index.scss';

const closeDropdown = (e, a) => {
  if (!e.target.matches('.block_1_select_dropdown > *')) {
    document.querySelector('.open').classList.remove('open');
    document.querySelector('.block_1_select_dropdown').style.maxHeight = '';
    document.body.removeEventListener('click', closeDropdown);
  }
};

const buildDropdown = (list, contaner) => {
  contaner.innerHTML = '';
  list.forEach((item) => {
    const elem = document.createElement('span');
    elem.className = 'js-custom-dropdown';
    elem.innerText = item;
    contaner.appendChild(elem);
  });
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

flatpickr(document.getElementById('date'), {
  locale: Russian,
  enableTime: true,
  time_24hr: true,
  dateFormat: 'd.m.Y H:i',
});

let inputTimeout = null;

document.querySelector('[name="street_from"]').addEventListener('input', (e) => {
  if (inputTimeout) clearTimeout(inputTimeout);
  const query = e.target.value;
  if (!query) return false;
  inputTimeout = setTimeout(() => {
    fetch(`http://127.0.0.1:8000/ru/api/streets?city_id=14&term=${query}`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then((r) => {
        buildDropdown(r, e.target.parentElement.querySelector('.js-address'));
      });
  }, 200);
  return true;
});