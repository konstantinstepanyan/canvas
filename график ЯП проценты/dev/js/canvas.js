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
        VERTICAL: 30
    }

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



    const formElement = document.querySelector(`.chart__data`);

    formElement.addEventListener(`submit`, (evt) => {
        // Отменяем действие по умолчанию — отправку формы на сервер (которого нет)
        evt.preventDefault();

        // Отрисовываем график
        renderChart(getData(inputElements));
        // Сбрасываем значения полей ввода
        formElement.reset();
    });
})