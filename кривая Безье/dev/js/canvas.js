document.addEventListener('DOMContentLoaded', () => {

    const canvasPlot = document.getElementById('canvas_plot');
    const ctx = canvasPlot.getContext('2d');
    //ширина и высота канваса
    const canvasPlotWidth = canvasPlot.clientWidth;
    const canvasPlotHeight = canvasPlot.clientHeight;

    //размер одной клетки по X и Y. Значения разделены, т.к. клетка может быть с разными сторонами.
    const cellWidth1 = 60; //размер клетки графика по горизонтали
    const cellHeight1 = 60; //размер клетки графика по вертикали


    //принимает объект, сразу распаковывает его значения, если cellWidth не указан в вызове ф-ции, ставит ей значение 50
    const drawCells = ({
        canvas, cellWidth = 50, cellHeight = 150,
        shifts = {
            /* таблица отступов для цифр 
            /* Отступы для цифр на левой(отрицательной) части оси X*/
            xNumberNamesLeft: 5, //значения сдвига Вправо:
            xNumberNamesLeftDown: 30, //значение сдвига Вниз:
            /* Отступы для цифр на правой(положительной) части оси X*/
            XNumberNamesRight: -20,//значения сдвига Вправо:
            XNumberNamesRightDown: 30, //значение сдвига Вниз
            /* Отступы для цифр на верхней, положительной части оси Y*/
            YNumberNamesTop: 11, //значения сдвига Вправо
            YNumberNamesTopDown: 20, //значения сдвига Вниз
            /* Отступы для цифр на нижней, отрицательной части оси Y*/
            YNumberNamesBottom: 5, //значения сдвига Вправо   
            YNumberNamesBottomDown: 0, //значения сдвига Вниз

            /* Отступы для буквы X*/
            /* Отступы Вправо*/
            XAxisNamesLeft: cellWidth * 1.5, //посередине 2ой клетки по горизонтали находится буква X
            /* Отступы Вниз*/
            XAxisNamesDown: cellHeight, //по вертикали на одну клетку вниз находится буква X

            /* Отступы для буквы Y*/
            /* Отступы Вправо*/
            YAxisNamesLeft: cellWidth / 2, //посередине первой клетки по горизонтали находится буква Y
            /* Отступы Вниз*/
            YAxisNamesDown: cellHeight * 1.5 //посередине 2ой клетки по вертикали находится буква Y
        }

    }) => {

        ctx.fillStyle = '#000';

        /* Вертикальные и Горизонатльные Отступы для цифр на осях X и Y. */
        /* Отступы можно задать по X и Y для каждого Сегмента Осей.*/
        /* Всего 4 сегмента: */
        /* Ось X: 1. Левый (отрицательный) 2. Правый (положительный) */
        /* Ось Y: 1. Верхний (положительный) 2. Нижний (отрцательный) */



        ctx.font = `${cellWidth / 2}px Arial`;
        ctx.textAligh = 'left';
        ctx.textBaselinke = 'top'

        //рисуем вертикальные линии
        for (let i = 0; i <= canvasPlotWidth; i += cellWidth) {

            if (i == 0) {
                ctx.beginPath();
                ctx.strokeStyle = '#f00'; //цвет сетки
                ctx.moveTo((cellWidth / 10), 0); //по иксу находится на одной десятой части от ширины клетки.
                ctx.lineTo((cellWidth / 10), canvasPlotHeight);
                ctx.stroke();
                ctx.closePath();
            }
            else {
                ctx.beginPath();
                ctx.strokeStyle = '#bbb'; //цвет сетки
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvasPlotHeight);
                ctx.stroke();
                ctx.closePath();
            }
            //на каждой итерации к i=0 прибавляется размер клетки по X.
            //двигаемся этим интервалом по иксу и чертим сверху вниз линию, равную высоте канваса. 
            //Получаются вертикальные линии

            //будет писать значения клеток (Пример: 60, 120, 180,):
            ctx.fillText(i, i + shifts.XNumberNamesRight, shifts.XNumberNamesRightDown);
            //будет писать номер клетки (Пример: 1,2,3):
            //ctx.fillText(i/cellWidth, i + shifts.XNumberNamesRight, shifts.XNumberNamesRightDown);


        }
        //рисуем горизонтальные линии
        for (let i = 0; i <= canvasPlotHeight; i += cellHeight) {
            if (i == 0) { //изначально, не строя сетку, чертим линию.
                ctx.beginPath();
                ctx.strokeStyle = '#f00'; //цвет сетки
                ctx.moveTo(0, (cellHeight / 10)); //по игрику находится на одной десятой высоты клетки
                ctx.lineTo(canvasPlotWidth, (cellHeight / 10));
                //на каждой итерации к i=0 прибавляется размер клетки по Y.
                //рисуем с x=0 линию, равную ширине канваса. 
                //Получаются горизонтальные линии
                //для верхней, положительной части оси Y:
            }

            else {
                ctx.beginPath();
                ctx.strokeStyle = '#bbb'; //цвет сетки
                ctx.moveTo(0, i);
                ctx.lineTo(canvasPlotWidth, i);
                //на каждой итерации к i=0 прибавляется размер клетки по Y.
                //рисуем с x=0 линию, равную ширине канваса. 
                //Получаются горизонтальные линии
                //для верхней, положительной части оси Y:
            }


            //будет писать значения клеток (Пример: 60, 120, 180,):
            ctx.fillText(i, shifts.YNumberNamesBottom, i + shifts.YNumberNamesBottomDown);
            //будет писать номер клетки (Пример: 1,2,3)
            //ctx.fillText(i/cellHeight, shifts.YNumberNamesBottom, i + shifts.YNumberNamesBottomDown);
            ctx.stroke()
            ctx.closePath();

        }


        // Главные оси
        ctx.beginPath();
        ctx.strokeStyle = '#000000';

        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvasPlotHeight);
        ctx.fillStyle = '#f00'; //это работает для букв X и Y
        ctx.fillText('y', shifts.YAxisNamesLeft, shifts.YAxisNamesDown);
        //xAxis - это центр по иксу, - shifts.YAxisNamesLeft - сместить по иксу от центра вправо
        //shifts.YAxisNamesDown - сместить вниз на указанное в переменной значение.

        ctx.moveTo(0, 0);
        ctx.lineTo(canvasPlotWidth, 0);
        ctx.fillText('x', shifts.XAxisNamesLeft, shifts.XAxisNamesDown);
        //canvasPlotWidth - shifts.XAxisNamesLeft - это значит, от правого края сдвинуть влево на зна-
        //чение, равное shifts.XAxisNamesLeft. (canvasPlotWidth - ширина всего канваса)

        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = '#f00';


        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(cellWidth, cellHeight); //дочерти линию до нижнего угла первой клетки. Работает с любыми значениями cellWidth и cellHeight
        ctx.stroke();
        ctx.closePath();
    }

    drawCells({ canvasPlot });

    //рисуем график
    // for (let i = 0; i <= canvasPlotWidth; i++) {
    //     const x = (i - xAxis) / cellWidth;
    //     const y = Math.pow(x, 2);

    //     ctx.fillRect(x * cellWidth + xAxis, yAxis - cellHeight * y, 4, 4)
    // }

    const drawCurve = ({ canvas, cp1 = { x: 200, y: 150 }, cp2 = { x: 400, y: 450 }, endp = { x: 600, y: 300 } }) => {

        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(50, 450);
        ctx.lineWidth = 7;
        ctx.strokeStyle = '#0f0';
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, endp.x, endp.y);

        ctx.fillStyle = '#00f';
        ctx.fillRect(cp1.x, cp1.y, 20, 20) //first cp
        ctx.textBaseline = 'hanging'; //текст находится под базовой линией.
        ctx.fillText('cp1', cp1.x + 30, cp1.y);

        ctx.fillRect(cp2.x, cp2.y, 20, 20) //second cp
        ctx.fillText('cp2', cp2.x + 30, cp2.y)
        ctx.stroke();
        ctx.closePath();
    }

    drawCurve({
        canvas: canvasPlot,
        // cp1: { x: 300, y: 200 },
        // cp2: { x: 450, y: 400 },
        // endp: { x: 650, y: 150 }
    });
})