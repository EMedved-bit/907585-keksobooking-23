/* eslint-disable no-use-before-define */
const successPopup = document.querySelector('.success');
const errorPopup = document.querySelector('.error');
const errorButton = errorPopup.querySelector('.error__button');

function onSuccessEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideSuccessPopup();
  }
}

function onErrorEscKeydown(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideErrorPopup();
  }
}

function onSuccessDocumentClick(evt) {
  evt.preventDefault();
  hideSuccessPopup();
}

function onErrorDocumentClick(evt){
  evt.preventDefault();
  hideErrorPopup();
}

function onErrorButtonClick(evt) {
  evt.preventDefault();
  hideErrorPopup();
}

function showSuccessPopup() {
  successPopup.classList.remove('hidden');
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onSuccessDocumentClick);
}

function hideSuccessPopup() {
  successPopup.classList.add('hidden');
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.removeEventListener('click', onSuccessDocumentClick);
}

function showErrorPopup() {
  errorPopup.classList.remove('hidden');
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('click', onErrorDocumentClick);
}

function hideErrorPopup() {
  errorPopup.classList.add('hidden');
  errorButton.removeEventListener('click', onErrorButtonClick);
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.removeEventListener('click', onErrorDocumentClick);
}

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export { showSuccessPopup, showErrorPopup, debounce };
