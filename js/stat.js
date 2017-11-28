'use strict';
var startX = 150;

// вывод облака
function cloud(abstractCtx) {
  // тень
  abstractCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  abstractCtx.fillRect(110, 20, 270, 420);

  // поле
  abstractCtx.fillStyle = '#bddbfc';
  abstractCtx.fillRect(100, 10, 270, 420);
}

// вывод заголовка
var youWimText = 'Ура вы победили!';
var resultsText = 'Список результатов:';


// отрисовка текста на канвасе
function addBlackText(ctx, text, x, y) {
  // св-ва текста
  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.fillStyle = '#000000';
  ctx.fillText(text, x, y);
}

//вывод сообщения о выигрыше
function youWin(ctx) {
  addBlackText(ctx, youWimText, startX, 50);
  addBlackText(ctx, resultsText, startX, 70);
}


// определяем наибольшее значение среди эл-тов массива
function maxItem(massive) {
  var max = -1;
  for (var i = 0; i < massive.length; i++) {
    if (massive[i] > max) {
      max = massive[i];
    }
  }
  return (max);
}


// гистограмма
var columnHeight = 150;
var startColY = 250;
var colStep = 50;
var colWidth = 40;
var namesY = 270;
var timesY = 90;


// случайное целое число в диапазоне 0, i
function randomNum(j) {
  return Math.floor(Math.random() * (j + 1));
}

// случайное дробное число в диапазоне min, max (для прозрачности)
function randomNumFloat(min, max) {
  return Math.random() * (max - min) + min;
}


// цвета со случайной прозрачностью
function randomColor() {
  return 'rgba(' + randomNum(255) + ',' + randomNum(255) + ',' + randomNum(255) + ',' + randomNumFloat(0, 1) + ')';
}


function drawHistogram(ctx, startDraw, time, name, step) {
  // пропорция шкал в соответствии со значениями
  ctx.fillRect(startDraw, startColY, colWidth, time * step);

  // вывод имен участников
  ctx.fillText(name, startDraw, namesY);

  // вывод округленых числовых значений
  ctx.fillText(Math.round(time), startDraw, timesY);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ОСНОВНАЯ ФУНКЦИЯ
window.renderStatistics = function (ctx, names, times) {
  cloud(ctx); // облако
  var step = -columnHeight / maxItem(times); // максимальное время
  youWin(ctx); // заголовок



  // addBlackText(ctx, times, startX, 90);


  // обозначения цветов шкал участников
  for (var j = 0; j < times.length; j++) {
    ctx.fillStyle = randomColor();
    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    var itemColumnStart = startX + colStep * j; //точка начала отрисовки колонок

    drawHistogram(ctx, itemColumnStart, times[j], names[j], step);
  }

  // addBlackText(ctx, names, startX, 250);

};


/*


 Функция отрисовки столбика гистограммы — на вход координаты, ширина и высота столбика, цвет


Макс. высота колонки 150рх

 После сообщения о победе должна располагаться гистограмма времен участников. Параметры гистограммы следующие:

 Высота гистограммы 150px.

 Ширина колонки 40px.

 Расстояние между колонками 50px.

 Цвет колонки игрока Вы rgba(255, 0, 0, 1).

 Цвета колонок других игроков — синие, а прозрачность задается случайным образом.


 */
