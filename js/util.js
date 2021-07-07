/* eslint-disable no-use-before-define */
const successPopup = document.querySelector('.success');
const errorPopup = document.querySelector('.error');
const errorButton = errorPopup.querySelector('.error__button');

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideSuccessPopup();
    hideErrorPopup();
  }
}

function onDocumentClick(evt) {
  evt.preventDefault();
  hideSuccessPopup();
  hideErrorPopup();
}

function clickErrorButton(evt) {
  evt.preventDefault();
  hideErrorPopup();
}

function showSuccessPopup() {
  successPopup.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onDocumentClick);
}

function hideSuccessPopup() {
  successPopup.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onDocumentClick);
}

function showErrorPopup() {
  errorPopup.classList.remove('hidden');
  errorButton.addEventListener('click', clickErrorButton);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onDocumentClick);
}

function hideErrorPopup() {
  errorPopup.classList.add('hidden');
  errorButton.removeEventListener('click', clickErrorButton);
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onDocumentClick);
}

export { showSuccessPopup, showErrorPopup };
