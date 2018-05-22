"use strict";
const canvasTiles = document.getElementById('canvas-tiles');
const canvasGrid = document.getElementById('canvas-grid');
if (!canvasTiles || !canvasGrid)
    throw new Error('No canvas found');
const contextTiles = canvasTiles.getContext('2d'), contextGrid = canvasGrid.getContext('2d');
const pixelSize = 1, canvasZoom = 6;
let data, mouseX, mouseY, previousMouseX, previousMouseY, rowIndex = 0, tile = 0, colIndex = 0, offset = 0, scrollVelocity = 1, verticalPos = 1, file, horizontalPos = 1;
contextTiles.scale(canvasZoom, canvasZoom);
contextGrid.scale(canvasZoom, canvasZoom);
const load = () => {
    const fileElement = document.getElementById('file');
    if (!fileElement.files)
        throw new Error('No file');
    const incomingFile = fileElement.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        file = parser(reader.result, reader.result.byteLength);
        data = changePalette(file);
        render(data, 0);
        const onScroll = (event) => {
            if (event.wheelDeltaY < 0)
                offset += 640 * scrollVelocity;
            else
                offset -= 640 * scrollVelocity;
            if (offset < 0)
                offset = 0;
            render(data, offset);
        };
        window.onwheel = onScroll;
    };
    reader.readAsArrayBuffer(incomingFile);
};
const toggleScroll = () => {
    if (scrollVelocity === 1)
        scrollVelocity = 10;
    else
        scrollVelocity = 1;
};
const drawSquare = (event) => {
    // todo: enhance variable names mouseX and mouseY, their meaning is: squareX and squareY
    previousMouseX = mouseX;
    previousMouseY = mouseY;
    mouseX = Math.trunc(event.offsetX / (8 * 6));
    mouseY = Math.trunc(event.offsetY / (8 * 6));
    if (previousMouseX !== mouseX || previousMouseY !== mouseY) {
        contextGrid.clearRect(0, 0, 480, 480);
        contextGrid.beginPath();
        contextGrid.lineWidth = 1;
        contextGrid.strokeStyle = '#e2cc24';
        contextGrid.rect(mouseX * 8, mouseY * 8, 8, 8);
        contextGrid.stroke();
        document.querySelectorAll('.address-indicator > strong')[0].innerHTML =
            '#' + Number((mouseX * 16 + (((offset / 64) * 16) + mouseY * 10 * 16))).toString(16);
    }
};
function changePalette(data) {
    return data.map(item => {
        if (item === 0)
            return '#222';
        else if (item === 1)
            return '#d8af81';
        else if (item === 2)
            return '#aaa';
        return '#f44620';
    });
}
const render = (data, offset) => {
    rowIndex = 0;
    colIndex = 0;
    tile = 0;
    verticalPos = 0;
    horizontalPos = 0;
    data.slice(offset, 6400 + offset).map((item, index) => {
        if (index % 64 === 0) {
            colIndex = 0;
            rowIndex = 0;
            if (tile % 10 === 0) {
                horizontalPos = 0;
                if (tile > 0)
                    verticalPos++;
            }
            data.slice(offset, 6400 + offset).slice(index, 64 * (tile + 1)).map((item, index) => {
                contextTiles.fillStyle = item;
                if (index > 0 && index % 8 === 0) {
                    colIndex++;
                    rowIndex = 0;
                }
                contextTiles.fillRect(8 * horizontalPos * pixelSize + rowIndex * pixelSize, 8 * verticalPos * pixelSize + colIndex * pixelSize, pixelSize, pixelSize);
                rowIndex++;
            });
            horizontalPos++;
            tile++;
        }
    });
};
