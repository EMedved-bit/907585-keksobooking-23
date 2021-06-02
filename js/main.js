//Вспомогательные функции
//Формулу для подсчета подглядела здесь https://schoolsw3.com/js/js_random.php

function getRandomNumber(min, max) {
  if (min<0||max<0) {
    return 'Ошибка! Значения могут быть только положительными!';
  }

  if (max<=min) {
    return 'Максимальное значение не может быть меньше минимального!';
  }

  const number = Math.floor(Math.random() * (max - min + 1) ) + min;
  return number;
}

getRandomNumber(1, 100);

function getNumber(min, max, count) {
  if (min<0||max<0) {
    return 'Ошибка! Значения могут быть только положительными!';
  }

  if (max<=min) {
    return 'Максимальное значение не может быть меньше минимального!';
  }

  const number = (max - min) * Math.random() + min;
  return number.toFixed(count);
}

getNumber(1, 100, 2);
