const canvasTiles = document.getElementById('canvas-tiles').getContext('2d'),
  canvasGrid = document.getElementById('canvas-grid').getContext('2d')

var pixelSize = 1,
  rowIndex = 0,
  colIndex = 0,
  tile = 0,
  data,
  canvasZoom = 6,
  verticalPos = 1,
  horizontalPos = 1,
  offset = 0,
  mouseX, mouseY,
  previousMouseX, previousMouseY,
  scrollVelocity = 1;

canvasTiles.scale(canvasZoom, canvasZoom);
canvasGrid.scale(canvasZoom, canvasZoom);

function load(){
  var file = document.getElementById('file').files[0];
  var reader = new FileReader();
  reader.onload = function (file) {
    data = changePalette(file.target.result.split(',').map(item => +item));
    render(data, 0);
    
    function onScroll(event) {
      if (event.wheelDeltaY < 0)
        offset += 640 * scrollVelocity;
      else
        offset -= 640 * scrollVelocity;

      if (offset < 0)
        offset = 0;

      render(data, offset);
    }

    window.onwheel = onScroll;
  };
  reader.readAsText(file);
}

function toggleScroll() {
  if (scrollVelocity === 1)
    scrollVelocity = 10;
  else
    scrollVelocity = 1;
}

function drawSquare(event) {
  // todo: enhance variable names mouseX and mouseY, their meaning is: squareX and squareY
  previousMouseX = mouseX;
  previousMouseY = mouseY;
  mouseX = Math.trunc(event.offsetX / (8 * 6));
  mouseY = Math.trunc(event.offsetY / (8 * 6));

  console.log('x', mouseX);
  console.log('prevx', previousMouseX);
  
  if (previousMouseX !== mouseX || previousMouseY !== mouseY) {
    canvasGrid.clearRect(0, 0, 480, 480);
    canvasGrid.beginPath();
    canvasGrid.lineWidth = '1';
    canvasGrid.strokeStyle = '#e2cc24';
    canvasGrid.rect(mouseX * 8, mouseY * 8, 8, 8);
    canvasGrid.stroke();

    document.querySelectorAll('.address-indicator > strong')[0].innerHTML = 
      '#' + Number((mouseX + ((offset / 64) + mouseY * 10)) * 16).toString('16');
  }
}

function changePalette(data) {
  console.log(data[0])
  return data.map(item => {
    if (item === 0)
      return '#222'
    else if (item === 1)
      return '#d8af81'
    else if (item === 2)
      return '#aaa'
    else if (item === 3)
      return '#f44620'
  });
}

function render(data, offset) {
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
        canvasTiles.fillStyle = item;
        if (index > 0 && index % 8 === 0) {
          colIndex++;
          rowIndex = 0;
        }

        canvasTiles.fillRect(8 * horizontalPos * pixelSize + rowIndex * pixelSize, 
          8 * verticalPos * pixelSize + colIndex * pixelSize, pixelSize, pixelSize); 
        rowIndex++;
      });

      horizontalPos++;
      tile++;
    }
  });
}