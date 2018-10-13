import 'Templates/Base/index';
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru';
import ymaps from 'ymaps';
import 'flatpickr/dist/flatpickr.css';
import './index.scss';

const closeDropdown = (e) => {
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

const msgPopup = (msg) => {
  const popup = document.getElementById('msg_popup');
  popup.querySelector('.popup_text').innerText = msg;
  popup.classList.add('open');
};

const initMap = () => {
  ymaps.load().then((maps) => {
    const myMap = new maps.Map('about-ymap-outer', {
      center: [53.199300, 50.130600],
      zoom: 14,
    }, {
      minZoom: 5,
    });
  });
};
document.addEventListener('DOMContentLoaded', () => {
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
      fetch(`/api/streets?city_id=14&term=${query}`, {
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
      if (element.matches('.popup_close')) {
        element.parentElement.parentElement.classList.remove('open');
        break;
      }
    }
  });

  document.getElementById('delivery_form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderStr = `${document.querySelector('.block_1_selected').innerText} / ${formData.get('datetime')} /` +
      ` С ${formData.get('street_from')}, ${formData.get('house_from')}, кв ${formData.get('appartment_from')}` +
      ` / До ${formData.get('street_to')}, ${formData.get('house_to')}, кв ${formData.get('appartment_to')}`;
    console.log(orderStr);
    const popup = document.querySelector('#finalPopup');
    popup.querySelector('.popup_text').innerText = orderStr;
    popup.parentElement.classList.add('open');
  });

  document.getElementById('finalPopup').addEventListener('submit', (e) => {
    e.preventDefault();
    const finalFormData = new FormData(e.target);
    const formData = new FormData(document.getElementById('delivery_form'));
    if (!finalFormData.has('agree')) return msgPopup('Вы должны согласиться на обработку персональных данных');
    const datetime = formData.get('datetime').split(' ');
    formData.set('phone', finalFormData.get('phone'));
    // formData.set('name', finalFormData.get('name'));
    formData.set('comment', finalFormData.get('comment'));
    formData.set('date', datetime[0]);
    formData.set('time', datetime[1]);
    return fetch(`${document.getElementById('delivery_form').getAttribute('action')}`, {
      method: 'post',
      body: formData,
      credentials: 'include',
    })
      .then(r => r.json())
      .then((r) => {
        if (r.sent) {
          return msgPopup('Ваш заказ успешно создан!');
        }
        return msgPopup('Произошла ошибка при создании заказа');
      });
  });
  initMap();
});