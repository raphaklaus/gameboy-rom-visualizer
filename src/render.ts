const canvasTiles = document.getElementById('canvas-tiles') as HTMLCanvasElement
const canvasGrid = document.getElementById('canvas-grid') as HTMLCanvasElement

if (!canvasTiles || !canvasGrid)
  throw new Error('No canvas found')

const contextTiles = canvasTiles.getContext('2d') as CanvasRenderingContext2D,
  contextGrid = canvasGrid.getContext('2d') as CanvasRenderingContext2D

const pixelSize = 1,
  tileWidth = 8,
  tileHeight = 8,
  canvasZoom = 6

let mouseX: number, mouseY: number, previousMouseX, previousMouseY,
  offset = 0,
  scrollVelocity = 6,
  file: Array<number>

contextTiles.scale(canvasZoom, canvasZoom)
contextGrid.scale(canvasZoom, canvasZoom)

const load = () => {
  const fileElement = document.getElementById('file') as HTMLInputElement

  if (!fileElement.files)
    throw new Error('No file')

  const incomingFile = fileElement.files[0] as File

  const reader = new FileReader()
  reader.onload = function(): void {
    file = parser4bpp(this.result as ArrayBuffer, (this.result as ArrayBuffer).byteLength)
    render(changePalette(file))

    const onScroll = (scrollEvent: MouseWheelEvent) => {
      if (scrollEvent.deltaY > 0)
        offset += scrollVelocity * 640
      else
        offset -= scrollVelocity * 640

      if (offset < 0)
        offset = 0

      render(changePalette(file, offset), offset)
    }

    window.onwheel = onScroll
  }

  reader.readAsArrayBuffer(incomingFile)
}

const toggleScroll = () => {
  scrollVelocity = (scrollVelocity === 1) ? 10 : 1
}

const drawSquare = (event: MouseEvent) => {
  // todo: enhance variable names mouseX and mouseY, their meaning is: squareX and squareY
  previousMouseX = mouseX
  previousMouseY = mouseY
  mouseX = Math.trunc(event.offsetX / (8 * 6))
  mouseY = Math.trunc(event.offsetY / (8 * 6))

  if (previousMouseX !== mouseX || previousMouseY !== mouseY) {
    contextGrid.clearRect(0, 0, 480, 480)
    contextGrid.beginPath()
    contextGrid.lineWidth = 1
    contextGrid.strokeStyle = '#e2cc24'
    contextGrid.rect(mouseX * 8, mouseY * 8, 8, 8)
    contextGrid.stroke()

    document.querySelectorAll('.address-indicator > strong')[0].innerHTML =
      `#${Number((mouseX * 16 + (((offset / 64) * 16) + mouseY * 10 * 16)))
        .toString(16)}`
  }
}

const changePalette = (data: Array<number>, offset = 0): Array<string> => {
  return data.slice(offset, offset + 6400)
    .map(item => {
      if (item === 0)
        return '#000'
      else if (item === 1)
        return '#ffffff'
      else if (item === 2)
        return '#a8734a'
      else if (item === 3)
        return '#e9b287'
      else if (item === 4)
        return '#772d26'
      else if (item === 5)
        return '#b66862'
      else if (item === 6)
        return '#85d4dc'
      else if (item === 7)
        return '#c5ffff'
      else if (item === 8)
        return '#a85fb4'
      else if (item === 9)
        return '#e99df5'
      else if (item === 10)
        return '#559e4a'
      else if (item === 11)
        return '#92df87'
      else if (item === 12)
        return '#42348b'
      else if (item === 13)
        return '#7e70ca'
      else if (item === 14)
        return '#bdcc71'
      else if (item === 15)
        return '#ffffb0'

      return '#f44620'
    })
}

// const changePalette = (data: Array<number>, offset = 0): Array<string> => {
//   return data.slice(offset, offset + 6400)
//     .map(item => {
//       if (item === 0)
//         return '#222'
//       else if (item === 1)
//         return '#d8af81'
//       else if (item === 2)
//         return '#aaa'

//       return '#f44620'
//     })
// }

const render = (data: Array<string>, offset = 0) => {
  let colIndex = 0,
    rowIndex = 0,
    tile = 0,
    verticalPos = 0,
    horizontalPos = 0

  data.forEach((pixel, index) => {
    if (index % 64 === 0) {
      rowIndex = 0
      colIndex = 0

      if (tile % 10 === 0) {
        horizontalPos = 0

        if (tile > 0)
          verticalPos++
      } else
        horizontalPos++

      tile++
    } else if (index % 8 === 0) {
      rowIndex++
      colIndex = 0
    }

    contextTiles.fillStyle = pixel

    contextTiles.fillRect((tileWidth * horizontalPos) + colIndex,
      (tileHeight * verticalPos) + rowIndex, pixelSize, pixelSize)

    colIndex++
  })
}
