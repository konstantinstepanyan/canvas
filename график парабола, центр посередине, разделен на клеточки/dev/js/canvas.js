document.addEventListener('DOMContentLoaded', () => {

    const canvasPlot = document.getElementById('canvas_plot');
    const ctx = canvasPlot.getContext('2d');

    const canvasPlotWidth = canvasPlot.clientWidth;
    const canvasPlotHeight = canvasPlot.clientHeight;

    const scaleX = 60;
    const scaleY = 50;

    const xAxis = Math.round(canvasPlotWidth / scaleX / 2) * scaleX;
    const yAxis = Math.round(canvasPlotHeight / scaleY / 2) * scaleY;

    const shiftNumberNames = 10;
    const shiftAxisNames = 25;

    ctx.font = `${scaleX / 2}px Arial`;
    ctx.textAligh = 'left';
    ctx.textBaselinke = 'top'

    ctx.beginPath();
    ctx.strokeStyle = '#f5f0e8';

    for (let i = 0; i <= canvasPlotWidth; i += scaleX) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasPlotHeight);

        console.log(i);
        if (i == 360) { continue }

        ctx.fillText((i - xAxis) / scaleX, i + shiftNumberNames * 0.25, yAxis + shiftNumberNames * 3);
    }

    for (let i = 0; i <= canvasPlotHeight; i += scaleY) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvasPlotWidth, i);

        ctx.fillText((yAxis - i) / scaleY, xAxis + shiftNumberNames, i + shiftNumberNames)
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