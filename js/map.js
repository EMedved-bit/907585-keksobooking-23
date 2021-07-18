import { createAdvertElement } from './adverts.js';

const adAddressInput = document.querySelector('#address');
const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (advert) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: advert.location.lat,
      lng: advert.location.lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createAdvertElement(advert),
      {
        keepInView: true,
      },
    );
};

function createMarkers(adverts) {
  markerGroup.clearLayers();
  adverts
    .slice(0, 10)
    .forEach((advert) => {
      createMarker(advert);
    });
}

function getLatLngString(latLng) {
  return `${latLng.lat.toFixed(5)} ${latLng.lng.toFixed(5)}`;
}

adAddressInput.value = getLatLngString(mainPinMarker.getLatLng());

function resetMap () {
  mainPinMarker.setLatLng({
    lat: 35.6895,
    lng: 139.69171,
  });

  map.setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 12);

  adAddressInput.value = getLatLngString(mainPinMarker.getLatLng());
}

mainPinMarker.on('moveend', () => {
  adAddressInput.value = getLatLngString(mainPinMarker.getLatLng());
});

export { resetMap, createMarkers, map };
