document.addEventListener('DOMContentLoaded', () => {

    const canvasPlot = document.getElementById('canvas_plot');
    const ctx = canvasPlot.getContext('2d');

    //ширина и высота канваса
    const canvasPlotWidth = canvasPlot.clientWidth;
    const canvasPlotHeight = canvasPlot.clientHeight;

    const scaleX = 50; //размер клетки графика по горизонтали
    const scaleY = 60; //размер клетки графика по вертикали


    //const fullCircleY = scaleY * ; //полный оборот окружности. Аналог 360 градусов для Y

    //это центр графика, 0 по иксу
    const xAxis = Math.round(canvasPlotWidth / scaleX / 2) * scaleX;
    //(canvasPlotWidth / scaleX / 2) - ширину делим на размер клетки = количество клеток на ВСЕЙ плоскости X
    //делим количество этих клеток пополам, чтобы узнать сколько клеток с одной стороны графика.
    //чтобы убрать 0, нужно пройти первую половину клеток по Иксу и убрать его
    //scaleX * кол-во половины клеток - это и есть ноль.
    //Это уберёт 0 из отрисовки графика
    /* ---------------------------------  */
    //это центр графика, 0 по игрику
    const yAxis = Math.round(canvasPlotHeight / scaleY / 2) * scaleY;

    const shiftNumberNames = 10;

    /* Вертикальные и Горизонатльные Отступы для цифр на осях X и Y. */
    /* Отступы можно задать по X и Y для каждого Сегмента Осей.*/
    /* Всего 4 сегмента: */
    /* Ось X: 1. Левый (отрицательный) 2. Правый (положительный) */
    /* Ось Y: 1. Верхний (положительный) 2. Нижний (отрцательный) */

    /* Отступы для цифр на левой(отрицательной) части оси X*/
    //значения сдвига Вправо:
    const shiftXNumberNamesLeft = 5;
    //значение сдвига Вниз:
    const shiftXNumberNamesLeftDown = 30;

    /* Отступы для цифр на правой(положительной) части оси X*/
    //значения сдвига Вправо:
    const shiftXNumberNamesRight = -20;
    //значение сдвига Вниз
    const shiftXNumberNamesRightDown = 30;




    /* Отступы для цифр на верхней, положительной части оси Y*/
    //значения сдвига Вправо
    const shiftYNumberNamesTop = 11;
    //значения сдвига Вниз
    const shiftYNumberNamesTopDown = 20;

    /* Отступы для цифр на нижней, отрицательной части оси Y*/
    //значения сдвига Вправо
    const shiftYNumberNamesBottom = 5;
    //значения сдвига Вниз
    const shiftYNumberNamesBottomDown = 0;

    const shiftAxisNames = 25;
    ctx.font = `${scaleX / 2}px Arial`;
    ctx.textAligh = 'left';
    ctx.textBaselinke = 'top'
    ctx.beginPath();
    ctx.strokeStyle = '#bbb'; //цвет сетки
    //рисуем вертикальные линии
    for (let i = 0; i <= canvasPlotWidth; i += scaleX) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasPlotHeight);
        //на каждой итерации к i=0 прибавляется размер клетки по X.
        //двигаемся этим интервалом по иксу и чертим сверху вниз линию, равную высоте канваса. 
        //Получаются вертикальные линии

        //для левой, отрицательной части оси X:
        if (i < xAxis) {
            //подписываем вертикальные линии цифрами, 
            ctx.fillText((i - xAxis) / scaleX, i + shiftXNumberNamesLeft, yAxis + shiftXNumberNamesLeftDown);
        }

        //убираем 0:
        if (i == xAxis) { continue }

        //для правой, положительной части оси X:
        if (i > xAxis) {
            //подписываем вертикальные линии цифрами, 
            ctx.fillText((i - xAxis) / scaleX, i + shiftXNumberNamesRight, yAxis + shiftXNumberNamesRightDown);
        }

    }
    //рисуем горизонтальные линии
    for (let i = 0; i <= canvasPlotHeight; i += scaleY) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvasPlotWidth, i);
        //на каждой итерации к i=0 прибавляется размер клетки по Y.
        //рисуем с x=0 линию, равную ширине канваса. 
        //Получаются горизонтальные линии
        //для верхней, положительной части оси Y:
        if (i < yAxis) {
            ctx.fillText((yAxis - i) / scaleY, xAxis + shiftYNumberNamesTop, i + shiftYNumberNamesTopDown)
        }
        //раскомментировать, если нужно убрать 0 по игрику
        //if (i == yAxis) { continue } //убираем 0.
        //для нижней, отрицательной части оси Y:
        if (i > yAxis) {
            ctx.fillText((yAxis - i) / scaleY, xAxis + shiftYNumberNamesBottom, i + shiftYNumberNamesBottomDown)
        }
    }

    ctx.stroke();
    ctx.closePath();

    // Главные оси
    ctx.beginPath();
    ctx.strokeStyle = '#000000';

    ctx.moveTo(xAxis, 0);
    ctx.lineTo(xAxis, canvasPlotHeight);
    ctx.fillText('y', xAxis - shiftAxisNames, 0 + shiftAxisNames);

    ctx.moveTo(0, yAxis);
    ctx.lineTo(canvasPlotWidth, yAxis);
    ctx.fillText('x', canvasPlotWidth - shiftAxisNames, yAxis - shiftAxisNames);

    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = '#f00';
    //рисуем график
    for (let i = 0; i <= canvasPlotWidth; i++) {
        const x = (i - xAxis) / scaleX;
        const y = Math.pow(x, 2);

        ctx.fillRect(x * scaleX + xAxis, yAxis - scaleY * y, 4, 4)
    }

})