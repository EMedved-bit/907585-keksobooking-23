import { activateAdForm, activateMapForm, setAdFormSubmit } from './form.js';
import { map, MAP_COORDS_DEFAULT, MAP_ZOOM_DEFAULT } from './map.js';
import { showErrorPopup, showSuccessPopup } from './util.js';
import { getData } from './api.js';
import { renderMarkers } from './filters.js';
import './form-images.js';

function onDataSuccess(adverts) {
  renderMarkers(adverts);
  activateMapForm();
}

function onDataFail() {
  document.querySelector('.error-message').classList.remove('hidden');
}

map
  .on('load', () => {
    activateAdForm();
    getData(onDataSuccess, onDataFail);
  })
  .setView(MAP_COORDS_DEFAULT, MAP_ZOOM_DEFAULT);

setAdFormSubmit(showSuccessPopup, showErrorPopup);
