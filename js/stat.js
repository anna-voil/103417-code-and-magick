'use strict';
var startX = 150;

// вывод облака
function drawCloud(context) {
  // тень
  context.fillStyle = 'rgba(0, 0, 0, 0.7)';
  context.fillRect(110, 20, 270, 420);

  // поле
  context.fillStyle = '#bddbfc';
  context.fillRect(100, 10, 270, 420);
}

// вывод заголовка
var YOU_WIN_TEXT = 'Ура вы победили!';
var RESULTS_TEXT = 'Список результатов:';


// отрисовка текста на канвасе
function paintText(context, text, x, y, color) {
  // св-ва текста
  context.font = '16px PT Mono';
  context.fillStyle = color;
  context.fillText(text, x, y);
}


// определяем наибольшее значение среди эл-тов массива
function maxItem(arr) {
  var max = -1;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}


// гистограмма
var columnHeight = 150;
var startColY = 250;
var colStep = 50;
var colWidth = 40;
var namesY = 270;
var timesY = 90;


// случайное целое число в диапазоне min, max
function getRandomNum(min, max) {
  return Math.round(getRandomNumFloat(min, max));
}

// случайное дробное число в диапазоне min, max (для прозрачности)
function getRandomNumFloat(min, max) {
  return Math.random() * (max - min) + min;
}


// цвета со случайной прозрачностью
function getRandomColor() {
  return 'rgba(' + 0 + ',' + 0 + ',' + getRandomNum(0, 255) + ',' + getRandomNumFloat(0, 1) + ')';
}


function drawHistogram(context, startDraw, time, name, step) {
  // пропорция шкал в соответствии со значениями
  context.fillRect(startDraw, startColY, colWidth, time * step);

  // вывод имен участников
  // ctx.fillText(name, startDraw, namesY);
  paintText(context, name, startDraw, namesY, '#000000');

  // вывод округленых числовых значений
  // context.fillText(Math.round(time), startDraw, timesY);
  paintText(context, Math.round(time), startDraw, timesY, '#000000');
}


// ОСНОВНАЯ ФУНКЦИЯ
window.renderStatistics = function (ctx, names, times) {
  drawCloud(ctx); // облако
  var step = -columnHeight / maxItem(times); // максимальное время

  // вывод сообщения о выигрыше
  paintText(ctx, YOU_WIN_TEXT, startX, 50, '#000000');
  paintText(ctx, RESULTS_TEXT, startX, 70, '#000000');


  // обозначения цветов шкал участников
  for (var j = 0; j < times.length; j++) {
    ctx.fillStyle = (names[j] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getRandomColor(); // условие для выведения разных цветов с учетом текущего игрока

    var itemColumnStart = startX + colStep * j; // точка начала отрисовки колонок

    drawHistogram(ctx, itemColumnStart, times[j], names[j], step);
  }
};
