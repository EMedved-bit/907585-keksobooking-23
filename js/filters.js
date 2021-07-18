import { createMarkers } from './map.js';
import { debounce } from './util.js';

const housingTypeSelect = document.querySelector('#housing-type');
const housingPriceSelect = document.querySelector('#housing-price');
const housingRoomsSelect = document.querySelector('#housing-rooms');
const housingGuestsSelect = document.querySelector('#housing-guests');
const featuresCheckbox = document.querySelectorAll('.map__checkbox');
const filters = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: [],
};

let allAdverts = [];

function renderMarkers(adverts) {
  allAdverts = adverts;
  createMarkers(allAdverts);
}

function getFilteredAdverts() {
  const filteredAdverts = allAdverts
    .filter((advert) => {
      if (filters.type === 'any') {
        return true;
      }

      return advert.offer.type === filters.type;
    })
    .filter((advert) => {
      if (filters.price === 'any') {
        return true;
      }

      if (filters.price === 'low') {
        return advert.offer.price < 10000;
      }

      if (filters.price === 'high') {
        return advert.offer.price > 50000;
      }

      return advert.offer.price >= 10000 && advert.offer.price <= 50000;
    })
    .filter((advert) => {
      if (filters.rooms === 'any') {
        return true;
      }

      return advert.offer.rooms === Number(filters.rooms);
    })
    .filter((advert) => {
      if (filters.guests === 'any') {
        return true;
      }

      return advert.offer.guests === Number(filters.guests);
    })
    .filter((advert) => {
      if (!filters.features.length) {
        return true;
      }

      if (!advert.offer.features) {
        return false;
      }

      for(let index = 0; index <= filters.features.length - 1; index++) {
        if(!advert.offer.features.includes(filters.features[index])) {
          return false;
        }
      }

      return true;
    });

  return filteredAdverts;
}

const updateMarkers = debounce(() => createMarkers(getFilteredAdverts()));

housingTypeSelect.addEventListener('change', (evt) => {
  filters.type = evt.target.value;
  updateMarkers();
});

housingPriceSelect.addEventListener('change', (evt) => {
  filters.price = evt.target.value;
  updateMarkers();
});

housingRoomsSelect.addEventListener('change', (evt) => {
  filters.rooms = evt.target.value;
  updateMarkers();
});

housingGuestsSelect.addEventListener('change', (evt) => {
  filters.guests = evt.target.value;
  updateMarkers();
});

featuresCheckbox.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      filters.features.push(checkbox.value);
    } else {
      filters.features = filters.features.filter((feature) => feature !== checkbox.value);
    }
    updateMarkers();
  });
});

function resetFilters() {
  filters.type = 'any';
  filters.price = 'any';
  filters.rooms = 'any';
  filters.guests = 'any';
  filters.features = [];
  updateMarkers();
}

export { renderMarkers, resetFilters };
