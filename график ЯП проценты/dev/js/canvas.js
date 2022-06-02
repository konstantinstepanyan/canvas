document.addEventListener('DOMContentLoaded', () => {


    const COLORS = [
        '#b3d5fc',
        '#98d9d9',
        '#ede493'
    ];

    const inputElements = document.querySelectorAll('.chart__input');


    console.log(typeof inputElements); // object
    const getData = (inputElemens) => {
        //Array.form  Возвращает объект Array (массив) из любого объекта с свойством length или итерируемого объекта.


        //Метод .map() создает массив, вызывая определенную функцию для каждого элемента родительского массива. 
        //Метод .map() не использует мутацию и создает новый массив, в отличие от мутационных методов, 
        //которые вносят изменения в вызывающий массив.
        return Array.from(inputElements).map((input, index) => ({
            name: input.name,
            value: input.value,
            color: COLORS[index]
        }))
    }


    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    const MAX_PERCENTAGE = 100;

    const Gap = {
        HORIZONTAL: 100,
        VERTICAL: 30 //отступ между столбцами по вертикали
    }

    //Координаты первого столбца
    const BarCoordinate = {
        INITIAL_X: 80,
        INITIAL_Y: 220
    }

    const BarSize = {
        MAX_HEIGHT: 190,
        WIDTH: 50
    }

    const LabelCoordinate = {
        INITIAL_X: 30,
        INITIAL_Y: 70
    }

    const Font = {
        SIZE: '18px',
        FAMILY: 'Tahoma'
    }

    //ширина и высота канваса
    const canvasPlotWidth = canvas.clientWidth;
    const canvasPlotHeight = canvas.clientHeight;

    //размер одной клетки по X и Y. Значения разделены, т.к. клетка может быть с разными сторонами.
    const scaleX = 60; //размер клетки графика по горизонтали
    const scaleY = 60; //размер клетки графика по вертикали
    const drawCells = () => {
        ctx.fillStyle = '#000';
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

        //рисуем вертикальные линии
        for (let i = 0; i <= canvasPlotWidth; i += scaleX) {

            if (i == 0) {
                ctx.beginPath();
                ctx.strokeStyle = '#f00'; //цвет сетки
                ctx.moveTo((scaleX / 10), 0); //по иксу находится на одной десятой части от ширины клетки.
                ctx.lineTo((scaleX / 10), canvasPlotHeight);
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
            ctx.fillText(i, i + shiftXNumberNamesRight, shiftXNumberNamesRightDown);
            //будет писать номер клетки (Пример: 1,2,3):
            //ctx.fillText(i/scaleX, i + shiftXNumberNamesRight, shiftXNumberNamesRightDown);


        }
        //рисуем горизонтальные линии
        for (let i = 0; i <= canvasPlotHeight; i += scaleY) {
            if (i == 0) { //изначально, не строя сетку, чертим линию.
                ctx.beginPath();
                ctx.strokeStyle = '#f00'; //цвет сетки
                ctx.moveTo(0, (scaleY / 10)); //по игрику находится на одной десятой высоты клетки
                ctx.lineTo(canvasPlotWidth, (scaleY / 10));
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
            ctx.fillText(i, shiftYNumberNamesBottom, i + shiftYNumberNamesBottomDown);
            //будет писать номер клетки (Пример: 1,2,3)
            //ctx.fillText(i/scaleY, shiftYNumberNamesBottom, i + shiftYNumberNamesBottomDown);
            ctx.stroke()
            ctx.closePath();

        }


        // Главные оси
        ctx.beginPath();
        ctx.strokeStyle = '#000000';

        /* Отступы для буквы X*/
        /* Отступы Вправо*/
        const shiftXAxisNamesLeft = scaleX * 1.5; //посередине 2ой клетки по горизонтали находится буква X
        /* Отступы Вниз*/
        const shiftXAxisNamesDown = scaleY; //по вертикали на одну клетку вниз находится буква X

        /* Отступы для буквы Y*/
        /* Отступы Вправо*/
        const shiftYAxisNamesLeft = scaleX / 2; //посередине первой клетки по горизонтали находится буква Y
        /* Отступы Вниз*/
        const shiftYAxisNamesDown = scaleY * 1.5; //посередине 2ой клетки по вертикали находится буква Y

        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvasPlotHeight);
        ctx.fillStyle = '#f00'; //это работает для букв X и Y
        ctx.fillText('y', shiftYAxisNamesLeft, shiftYAxisNamesDown);
        //xAxis - это центр по иксу, - shiftYAxisNamesLeft - сместить по иксу от центра вправо
        //shiftYAxisNamesDown - сместить вниз на указанное в переменной значение.

        ctx.moveTo(0, 0);
        ctx.lineTo(canvasPlotWidth, 0);
        ctx.fillText('x', shiftXAxisNamesLeft, shiftXAxisNamesDown);
        //canvasPlotWidth - shiftXAxisNamesLeft - это значит, от правого края сдвинуть влево на зна-
        //чение, равное shiftXAxisNamesLeft. (canvasPlotWidth - ширина всего канваса)

        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = '#f00';


        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(scaleX, scaleY); //дочерти линию до нижнего угла первой клетки. Работает с любыми значениями scaleX и scaleY
        ctx.stroke();
        ctx.closePath();
    }

    const renderChart = (items) => {
        // Очищаем всю область холста
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        // Задаём координаты для первого столбца и подписи
        let currentBarX = BarCoordinate.INITIAL_X;
        let currentLabelY = LabelCoordinate.INITIAL_Y;
        // Определяем горизонтальный отступ между соседними столбцами
        const gapBetweenBars = BarSize.WIDTH + Gap.HORIZONTAL;

        // Проходим в цикле по каждому объекту в массиве с данными
        // Для каждого будет нарисован отдельный столбец
        for (const item of items) {
            // Вычисляем высоту столбца с учётом процентов из данных
            const barHeight = (item.value * BarSize.MAX_HEIGHT) / MAX_PERCENTAGE;

            // Задаём цвет заливки любых элементов, которые будут создаваться дальше
            ctx.fillStyle = item.color;

            // Задаём параметры шрифта
            ctx.font = `${Font.SIZE} ${Font.FAMILY}`;
            // Запоминаем текущие параметры холста
            ctx.save();
            // Сдвигаем начало коодинат вниз по оси y на величину canvas.height
            ctx.translate(0, canvas.height);
            // Поворачиваем систему координат на 90 градусов против часовой стрелки
            // Math.PI/2 — перевод 90 градусов в радианы
            ctx.rotate(-Math.PI / 2);
            // В изменённой системе координат рисуем текст снизу вверх
            ctx.fillText(item.name.toUpperCase(), LabelCoordinate.INITIAL_X, currentLabelY);
            // Возвращаемся к изначальной системе координат
            ctx.restore();
            // Рисуем столбец
            // Отрицательное значение — отрисовка снизу вверх
            ctx.fillRect(currentBarX, BarCoordinate.INITIAL_Y, BarSize.WIDTH, -barHeight);

            // Для следующего столбца обновляем координаты с учётом отступа
            currentBarX += gapBetweenBars;
            currentLabelY += gapBetweenBars;
        }
    };

    //нарисуй клетки с цифрами
    drawCells();


    const formElement = document.querySelector(`.chart__data`);

    formElement.addEventListener(`submit`, (evt) => {
        // Отменяем действие по умолчанию — отправку формы на сервер (которого нет)
        evt.preventDefault();

        // Отрисовываем график
        renderChart(getData(inputElements));

        // рисуем клетки снова, т.к. renderChat обнуляет канвас
        drawCells();

        // Сбрасываем значения полей ввода
        formElement.reset();

    });
})