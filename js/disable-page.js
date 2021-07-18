const adForm = document.querySelector('.ad-form');
const formElements = adForm.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFormElements = mapForm.querySelectorAll('select');
const mapFormFieldset = mapForm.querySelector('fieldset');

function disablePage () {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
  mapFormFieldset.setAttribute('disabled', 'disabled');

  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  mapFormElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

disablePage ();
