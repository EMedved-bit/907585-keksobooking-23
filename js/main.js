import { disablePage, activatePage, setAdFormSubmit } from './form.js';
import { createMarker, map } from './map.js';
import { showErrorPopup, showSuccessPopup } from './util.js';
import { getData } from './api.js';

disablePage();

map
  .on('load', () => {
    activatePage();
  })
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 12);

function createMarkers(adverts) {
  adverts.forEach((advert) => {
    createMarker(advert);
  });
}

function dataFail() {
  document.querySelector('.error-message').classList.remove('hidden');
}

getData(createMarkers,dataFail);

setAdFormSubmit(showSuccessPopup, showErrorPopup);

