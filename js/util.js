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
  const cloneArray = array.slice(0);
  cloneArray.sort(() => Math.random() - 0.5);

  return cloneArray;
}

function getRandomArrayElement(elements) {

  return elements[getRandomNumber(0, elements.length - 1)];
}

export {
  getRandomNumber,
  getFloatNumber,
  getRandomArrayElement,
  shuffle
};
