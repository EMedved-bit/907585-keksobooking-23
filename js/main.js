function getRandomNumber(min, max) {
  if (min < 0 || max < 0) {
    throw 'Ошибка! Значения могут быть только положительными!';
  }

  if (max <= min) {
    throw 'Максимальное значение не может быть меньше минимального!';
  }

  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getFloatNumber(min, max, count = 0) {
  if (min < 0 || max < 0) {
    throw 'Ошибка! Значения могут быть только положительными!';
  }

  if (max <= min) {
    throw 'Максимальное значение не может быть меньше минимального!';
  }

  const number = (max - min) * Math.random() + min;

  return Number(number.toFixed(count));
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

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

const ADVERTS_COUNT = 10;

function getRandomArrayElement(elements) {

  return elements[getRandomNumber(0, elements.length - 1)];
}

function createAdvert() {
  const lat = getFloatNumber(35.65, 35.7, 5);
  const lng = getFloatNumber(139.7, 139.8, 5);
  const featuresRandomIndex = getRandomNumber(1, FEATURES.length - 1);
  shuffle(FEATURES);
  const features = FEATURES.slice(0, featuresRandomIndex);

  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 10)}.png`,
    },
    offer: {
      title: 'Сдается жилье',
      address: `${lat}, ${lng}`,
      price: getRandomNumber(300, 10000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 10),
      quests: getRandomNumber(1, 10),
      checkin: `1${getRandomNumber(2, 4)}:00`,
      checkout: `1${getRandomNumber(2, 4)}:00`,
      features: features,
      description: 'Светлое, просторное',
      photos: new Array(getRandomNumber(1, 10)).fill(null).map(() => getRandomArrayElement(PHOTOS)),
    },
    location: {
      lat,
      lng,
    },
  };
}

const adverts = new Array(ADVERTS_COUNT).fill(null).map(() => createAdvert());

adverts;
