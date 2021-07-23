import { resetMap } from './map.js';
import { sendData } from './api.js';
import { resetFilters } from './filters.js';

const PRICES = {
  palace: '10000',
  flat: '1000',
  house: '5000',
  bungalow: '0',
  hotel: '3000',
};
const MAX_PRICE = 1000000;
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const DEFAULT_AVATAR = './img/muffin-grey.svg';
const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFormElements = mapForm.querySelectorAll('select');
const mapFormFieldset = mapForm.querySelector('fieldset');
const adAddressInput = adForm.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housePhotoPreview = document.querySelector('.ad-form__photo');
const addTitleInput = adForm.querySelector('#title');
const houseTypeSelect = adForm.querySelector('#type');
const housePriceInput = adForm.querySelector('#price');
const roomsNumberSelect = adForm.querySelector('#room_number');
const guestsNumberSelect = adForm.querySelector('#capacity');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');

function activateAdForm() {
  adForm.classList.remove('ad-form--disabled');
  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
}

function activateMapForm() {
  mapForm.classList.remove('map__filters--disabled');
  mapFormFieldset.removeAttribute('disabled');
  mapFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
}

addTitleInput.addEventListener('input', () => {
  const valueLength = addTitleInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    addTitleInput.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    addTitleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    addTitleInput.setCustomValidity('');
  }

  addTitleInput.reportValidity();
});

houseTypeSelect.addEventListener('change', (evt) => {
  housePriceInput.setAttribute('min', PRICES[evt.target.value]);
  housePriceInput.setAttribute('placeholder', PRICES[evt.target.value]);
});

housePriceInput.addEventListener('input', () => {
  const housePriceValue = Number(housePriceInput.value);
  const minPrice = Number(housePriceInput.getAttribute('min'));

  if (housePriceValue < minPrice) {
    housePriceInput.setCustomValidity(`Минимальная цена ${minPrice} руб.`);
  } else if (housePriceValue > MAX_PRICE) {
    housePriceInput.setCustomValidity(`Максимальная цена ${MAX_PRICE} руб.`);
  } else {
    housePriceInput.setCustomValidity('');
  }

  housePriceInput.reportValidity();
});

guestsNumberSelect.addEventListener('change', (evt) => {
  const value = Number(evt.target.value);
  const rooms = Number(roomsNumberSelect.value);

  if (value === 1 && rooms === 100) {
    guestsNumberSelect.setCustomValidity('Этот вариант недоступен для одного гостя');
  } else if (value === 2 && (rooms < 2 || rooms === 100)) {
    guestsNumberSelect.setCustomValidity('Для двух гостей можно выбрать 2 или 3 комнаты');
  } else if (value === 3 && (rooms < 3 || rooms === 100)) {
    guestsNumberSelect.setCustomValidity('Для трех гостей можно выбрать только 3 комнаты');
  } else if (value === 0 && rooms !== 100) {
    guestsNumberSelect.setCustomValidity('Выберите количество гостей');
  } else {
    guestsNumberSelect.setCustomValidity('');
  }

  guestsNumberSelect.reportValidity();
});

timeinSelect.addEventListener('change', (evt) => {
  timeoutSelect.value = evt.target.value;
});

timeoutSelect.addEventListener('change', (evt) => {
  timeinSelect.value = evt.target.value;
});

adAddressInput.addEventListener('keypress', (evt) => {
  evt.preventDefault();
});

function resetForm() {
  adForm.reset();
  mapForm.reset();
  resetFilters();
  resetMap();
  avatarPreview.src = DEFAULT_AVATAR;
  housePhotoPreview.innerHTML = '';
}

function setAdFormSubmit(onSuccess, onFail) {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        resetForm();
        onSuccess();
      },
      () => onFail(),
      new FormData(evt.target),
    );
  });
}

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault;
  resetForm();
});

export { activateAdForm, activateMapForm, setAdFormSubmit };
