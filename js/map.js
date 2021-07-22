import { createAdvertElement } from './adverts.js';

const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const ICON_SIZE = [40, 40];
const ICON_ANCHOR = [20, 40];
const MAP_COORDS_DEFAULT = {
  lat: 35.6895,
  lng: 139.69171,
};
const MAP_ZOOM_DEFAULT = 12;
const MAX_ADVERTS = 10;
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
  iconSize: MAIN_ICON_SIZE,
  iconAnchor: MAIN_ICON_ANCHOR,
});

const mainPinMarker = L.marker(
  MAP_COORDS_DEFAULT,
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
    iconSize: ICON_SIZE,
    iconAnchor: ICON_ANCHOR,
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
    .slice(0, MAX_ADVERTS)
    .forEach((advert) => {
      createMarker(advert);
    });
}

function getLatLngString(latLng) {
  return `${latLng.lat.toFixed(5)} ${latLng.lng.toFixed(5)}`;
}

adAddressInput.value = getLatLngString(mainPinMarker.getLatLng());

function resetMap () {
  mainPinMarker.setLatLng(MAP_COORDS_DEFAULT);

  map.setView(MAP_COORDS_DEFAULT, MAP_ZOOM_DEFAULT);

  adAddressInput.value = getLatLngString(mainPinMarker.getLatLng());
}

mainPinMarker.on('moveend', () => {
  adAddressInput.value = getLatLngString(mainPinMarker.getLatLng());
});

export { resetMap, createMarkers, map, MAP_COORDS_DEFAULT, MAP_ZOOM_DEFAULT };
