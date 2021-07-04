import {
  getRandomNumber,
  getFloatNumber,
  getRandomArrayElement,
  shuffle
} from './util.js';

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

function createAdvert() {
  const lat = getFloatNumber(35.65, 35.7, 5);
  const lng = getFloatNumber(139.7, 139.8, 5);
  const featuresRandomIndex = getRandomNumber(1, FEATURES.length - 1);
  const features = shuffle(FEATURES).slice(0, featuresRandomIndex);

  const avatarNumber = getRandomNumber(1, 11);

  return {
    author: {
      avatar: `img/avatars/user${avatarNumber < 10 ? `0${avatarNumber}` : avatarNumber}.png`,
    },
    offer: {
      title: 'Сдается жилье',
      address: `${lat}, ${lng}`,
      price: getRandomNumber(300, 10000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features,
      description: 'Светлое, просторное',
      photos: new Array(getRandomNumber(1, 3)).fill(null).map(() => getRandomArrayElement(PHOTOS)),
    },
    location: {
      lat,
      lng,
    },
  };
}

export function createAdverts(advertsCount) {
  return new Array(advertsCount).fill(null).map(() => createAdvert());
}
