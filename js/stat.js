'use strict';
window.renderStatistics = function (ctx, names, times) {
  Math.round(times);

  // тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 270, 420);

  // поле
  ctx.fillStyle = '#bddbfc';
  ctx.fillRect(100, 10, 270, 420);

  // св-ва текста
  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', 150, 50);
  ctx.fillText('Список результатов:', 150, 70);

  // определяем наибольший результат среди участников
  var max = -1;
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  // гистограмма
  var histogramHeight = 150;
  var step = -histogramHeight / (max - 0);
  var blueColourAlfa = 0.2;

  var startX = 150;
  var startColY = 250;
  var colStep = 50;
  var colWidth = 40;
  var namesY = 270;
  var timesY = 90;

  // обозначения цветов шкал участников
  for (var j = 0; j < times.length; j++) {
    ctx.fillStyle = 'rgba(65, 148, 238, ' + blueColourAlfa + ')';
    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    blueColourAlfa = blueColourAlfa + 0.2;

  // пропорция шкал в соответствии со значениями
    ctx.fillRect(startX + colStep * j, startColY, colWidth, times[j] * step);

    // вывод имен участников
    ctx.fillStyle = '#000000';
    ctx.fillText(names[j], startX + colStep * j, namesY);

    // вывод округленых числовых значений
    ctx.fillText(Math.round(times[j]), startX + colStep * j, timesY);

  }
};


/*
Макс. высота колонки 150рх

 После сообщения о победе должна располагаться гистограмма времен участников. Параметры гистограммы следующие:

 Высота гистограммы 150px.

 Ширина колонки 40px.

 Расстояние между колонками 50px.

 Цвет колонки игрока Вы rgba(255, 0, 0, 1).

 Цвета колонок других игроков — синие, а прозрачность задается случайным образом.


 */
