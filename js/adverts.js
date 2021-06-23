import {createAdverts} from './data.js';

const map = document.querySelector('#map-canvas');

const advertsTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const adverts = createAdverts(1);

const TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

function changeValue (element, value, isAdd = true) {
  if (value && isAdd) {
    element.textContent = value;
  } else {
    element.remove();
  }
}

const similarListFragment = document.createDocumentFragment();

adverts.forEach((advert) => {
  const advertElement = advertsTemplate.cloneNode(true);
  changeValue(advertElement.querySelector('.popup__title'), advert.offer.title);
  changeValue(advertElement.querySelector('.popup__text--address'), advert.offer.address);
  changeValue(advertElement.querySelector('.popup__type'), TYPES[advert.offer.type]);
  changeValue(advertElement.querySelector('.popup__description'), advert.offer.description);
  changeValue(advertElement.querySelector('.popup__text--price'), `${advert.offer.price} ₽/ночь`, advert.offer.price);
  changeValue(
    advertElement.querySelector('.popup__text--capacity'),
    `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`,
    advert.offer.rooms && advert.offer.guests,
  );
  changeValue(
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

  if (advert.author.avatar) {
    advertElement.querySelector('.popup__avatar').src = advert.author.avatar;
  }

  similarListFragment.appendChild(advertElement);
});

map.appendChild(similarListFragment);
