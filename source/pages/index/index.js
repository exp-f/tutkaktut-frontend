import 'Templates/Base/index';
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru';
import 'flatpickr/dist/flatpickr.css';
import './index.scss';

const url = 'http://127.0.0.1:8000/ru/';
const closeDropdown = (e, a) => {
  if (!e.target.matches('.block_1_select_dropdown > *')) {
    document.querySelector('.open').classList.remove('open');
    document.querySelector('.block_1_select_dropdown').style.maxHeight = '';
    document.body.removeEventListener('click', closeDropdown);
  }
};

const buildDropdown = (list, container) => {
  container.innerHTML = '';
  list.forEach((item) => {
    const elem = document.createElement('span');
    elem.className = 'js-custom-dropdown';
    elem.innerText = item;
    container.appendChild(elem);
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
  defaultDate: new Date(),
});

let inputTimeout = null;

const searchAddress = (e) => {
  if (inputTimeout) clearTimeout(inputTimeout);
  const query = e.target.value;
  if (!query) return false;
  inputTimeout = setTimeout(() => {
    fetch(`${url}/api/streets?city_id=14&term=${query}`, {
      credentials: 'include',
    })
      .then(r => r.json())
      .then((r) => {
        e.target.style.zIndex = '11';
        buildDropdown(r, e.target.parentElement.querySelector('.js-address'));
      });
  }, 200);
  return true;
};

document.querySelector('[name="street_from"]').addEventListener('input', searchAddress);
document.querySelector('[name="street_to"]').addEventListener('input', searchAddress);

document.body.addEventListener('click', (e) => {
  for (let element = e.target; element !== null; element = element.parentElement) {
    if (element.matches('.js-custom-dropdown')) {
      const input = element.parentElement.parentElement.querySelector('input[type="text"]');
      input.value = element.innerText;
      input.style.zIndex = '';
      element.parentElement.innerHTML = '';
      break;
    }
  }
});