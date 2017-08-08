var context = document.getElementById('render').getContext('2d'),
  pixelSize = 10,
  rowIndex = 0,
  colIndex = 0,
  tile = 0,
  verticalPos = 1,
  horizontalPos = 1,
  offset = 0,
  scrollVelocity = 1;

function load(){
  var file = document.getElementById('file').files[0];
  var reader = new FileReader();
  reader.onload = function (file) {
    bits = file.target.result.split(',').map(item => +item);
    render(bits, 0);
  };
  reader.readAsText(file);
}

function toggleScroll() {
  if (scrollVelocity === 1)
    scrollVelocity = 10;
  else
    scrollVelocity = 1;
}

var bits = [
  // tile 1
  0, 0, 2, 2, 0, 0, 2, 3,
  0, 0, 2, 2, 1, 0, 2, 3,
  1, 0, 2, 2, 0, 0, 2, 3,
  0, 0, 2, 2, 0, 0, 2, 3,
  0, 0, 2, 2, 0, 0, 2, 3,
  0, 0, 2, 2, 1, 0, 2, 3,
  0, 0, 1, 2, 1, 0, 2, 3,
  0, 1, 2, 2, 0, 0, 2, 0,
  // // tile 2
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 1, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 0, 0, 1, 2, 1, 0, 2, 3,
  // 0, 1, 2, 2, 0, 0, 2, 0,
  // // tile 3
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 1, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 0, 0, 1, 2, 1, 0, 2, 3,
  // 0, 1, 2, 2, 0, 0, 2, 0,
  // // tile 4
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 1, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 0, 0, 1, 2, 1, 0, 2, 3,
  // 0, 1, 2, 2, 0, 0, 2, 0,
  // // tile 5
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 1, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 0, 0, 1, 2, 1, 0, 2, 3,
  // 0, 1, 2, 2, 0, 0, 2, 0,
  // // tile 6
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 1, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 0, 0, 1, 2, 1, 0, 2, 3,
  // 0, 1, 2, 2, 0, 0, 2, 0,
  // // tile 7
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 1, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 0, 0, 1, 2, 1, 0, 2, 3,
  // 0, 1, 2, 2, 0, 0, 2, 0,
  // // tile 8
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 1, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 0, 0, 1, 2, 1, 0, 2, 3,
  // 0, 1, 2, 2, 0, 0, 2, 0,
  // // tile 9
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 1, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 0, 0, 1, 2, 1, 0, 2, 3,
  // 0, 1, 2, 2, 0, 0, 2, 0,
  // // tile 10
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 1, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 0, 0, 1, 2, 1, 0, 2, 3,
  // 0, 1, 2, 2, 0, 0, 2, 0,
  // // tile 11
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 1, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 0, 0, 1, 2, 1, 0, 2, 3,
  // 0, 1, 2, 2, 0, 0, 2, 0,
  // // tile 12
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 1, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 0, 0, 2, 3,
  // 0, 0, 2, 2, 1, 0, 2, 3,
  // 0, 0, 1, 2, 1, 0, 2, 3,
  // 0, 1, 2, 2, 0, 0, 2, 0,
];

function onScroll(event) {
  if (event.wheelDeltaY < 0)
    offset += 640 * scrollVelocity;
  else
    offset -= 640 * scrollVelocity;

  if (offset < 0)
    offset = 0;

  render(bits, offset);
}

window.onwheel = onScroll;

function render(data, offset) {
  rowIndex = 0;
  colIndex = 0;
  tile = 0;
  verticalPos = 1;
  horizontalPos = 1;

  console.log('offset', offset);
  data = bits.map(item => {
    if (item === 0)
      return '#222'
    else if (item === 1)
      return '#d8af81'
    else if (item === 2)
      return '#aaa'
    else if (item === 3)
      return '#f44620'
  });

  // console.log('hey', data.slice(offset, 6400 + offset));
  data.slice(offset, 6400 + offset).map((item, index) => {

    if (index % 64 === 0) {
      colIndex = 0;
      rowIndex = 0;
      
      if (tile % 10 === 0) {
        horizontalPos = 1;
        verticalPos++;
      }

      // console.log('wow', index);
      data.slice(offset, 6400 + offset).slice(index, 64 * (tile + 1)).map((item, index) => {
        context.fillStyle = item;
        if (index > 0 && index % 8 === 0) {
          colIndex++;
          rowIndex = 0;
        }

        // console.log('horizontalPos', horizontalPos);
        // console.log('pixelSize', pixelSize);
        // console.log('x', 8 * horizontalPos * pixelSize + rowIndex * pixelSize);
        // console.log('y', 8 * verticalPos * pixelSize + colIndex * pixelSize);
        // console.log('color', item);

        context.fillRect(8 * horizontalPos * pixelSize + rowIndex * pixelSize, 
          8 * verticalPos * pixelSize + colIndex * pixelSize, pixelSize, pixelSize); 
        rowIndex++;
      });

      horizontalPos++;
      tile++;
    }
  });
}

render(bits, 0);