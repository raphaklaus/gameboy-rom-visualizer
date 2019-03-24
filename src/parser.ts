function parser2bpp(file: ArrayBuffer, byteLength: number): Array<number> {
  const binary = new Uint8Array(file, 0, byteLength)
  const result = []

  for (let offset = 0; offset < byteLength; offset += 2) {
    const highByte = binary[offset]
    const lowByte = binary[offset + 1]

    for (let bit = 0; bit < 8; bit++) {
      const mostSignificantBit = (highByte << bit) & 0x80 ? (1 << 1) : 0
      const leastSignificantBit = (lowByte << bit) & 0x80 ? 1 : 0
      result.push(mostSignificantBit | leastSignificantBit)
    }
  }

  return result
}

// must get 32 next bytes
function parser4bpp(file: ArrayBuffer, byteLength: number): Array<number> {
  const binary = new Uint8Array(file, 0, byteLength)
  const result = []

  for (let offset = 0; offset < byteLength; offset += 2) {
    const currentBitPlane = binary[offset]
    const secondBitPlane = binary[offset + 1]
    const thirdBitPlane = binary[offset + 14]
    const forthBitPlane = binary[offset + 15]

    for (let bit = 0; bit < 8; bit++) {
      const MSB = (forthBitPlane << bit) & 0x80 ? (1 << 3) : 0
      const firstMiddleBit = (thirdBitPlane << bit) & 0x80 ? (1 << 2) : 0
      const secondMiddleBit = (secondBitPlane << bit) & 0x80 ? (1 << 1) : 0
      const LSB = (currentBitPlane << bit) & 0x80 ? 1 : 0

      result.push(MSB | firstMiddleBit | secondMiddleBit | LSB)
    //   const mostSignificantBit = (highByte << bit) & 0x80 ? (1 << 1) : 0
    //   const leastSignificantBit = (lowByte << bit) & 0x80 ? 1 : 0
    //   result.push(mostSignificantBit | leastSignificantBit)
    }
  }

  return result
}
