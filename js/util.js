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
