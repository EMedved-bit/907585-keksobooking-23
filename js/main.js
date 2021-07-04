import { disablePage, activatePage } from './form.js';
import { resetMap, map } from './map.js';

disablePage();

map
  .on('load', () => {
    activatePage();
  })
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 12);

const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

submitButton.addEventListener('click', () => {
  resetMap();
});

resetButton.addEventListener('click', () => {
  resetMap();
});
