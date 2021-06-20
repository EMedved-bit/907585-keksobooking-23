import {createAdverts} from './data.js';

const map = document.querySelector('#map-canvas');

const advertsTemplate = document.querySelector('#card').content;

const adverts = createAdverts(1);

const TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

function addValue (element, value, isAdd = true) {
  if (value && isAdd) {
    element.textContent = value;
  } else {
    element.remove();
  }
}

adverts.forEach((advert) => {
  const advertElement = advertsTemplate.cloneNode(true);
  addValue(advertElement.querySelector('.popup__title'), advert.offer.title);
  addValue(advertElement.querySelector('.popup__text--address'), advert.offer.address);
  addValue(advertElement.querySelector('.popup__type'), TYPES[advert.offer.type]);
  addValue(advertElement.querySelector('.popup__description'), advert.offer.description);
  addValue(advertElement.querySelector('.popup__text--price'), `${advert.offer.price} ₽/ночь`, advert.offer.price);
  addValue(
    advertElement.querySelector('.popup__text--capacity'),
    `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`,
    advert.offer.rooms && advert.offer.guests,
  );
  addValue(
    advertElement.querySelector('.popup__text--time'),
    `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`,
    advert.offer.checkin && advert.offer.checkout,
  );

  const featuresListElement = advertElement.querySelector('.popup__features');

  if (advert.offer.features.length) {
    const modifires = advert.offer.features.map((feature) => `popup__feature--${feature}`);

    featuresListElement.querySelectorAll('.popup__feature')
      .forEach((item) => {
        const modifer = item.classList[1];

        if(!modifires.includes(modifer)) {
          item.remove();
        }

      });
  } else {
    featuresListElement.remove();
  }

  const popupPhotos = advertElement.querySelector('.popup__photos');
  const image = popupPhotos.querySelector('.popup__photo');

  if (advert.offer.photos.length) {
    advert.offer.photos.forEach((photo) => {
      const imageElement = image.cloneNode();
      imageElement.src = photo;
      popupPhotos.appendChild(imageElement);
    });
    image.remove();
  } else {
    popupPhotos.remove();
  }

  advertElement.querySelector('.popup__avatar').src = advert.author.avatar;
  map.appendChild(advertElement);
});
