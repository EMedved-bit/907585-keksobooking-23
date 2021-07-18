import { activatePage, setAdFormSubmit } from './form.js';
import { map } from './map.js';
import { showErrorPopup, showSuccessPopup } from './util.js';
import { getData } from './api.js';
import { renderMarkers } from './filters.js';
import './form-images.js';

map
  .on('load', () => {
    activatePage();
  })
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 12);

function dataFail() {
  document.querySelector('.error-message').classList.remove('hidden');
}

getData(renderMarkers, dataFail);

setAdFormSubmit(showSuccessPopup, showErrorPopup);
