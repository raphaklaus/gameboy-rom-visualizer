function parser(file: ArrayBuffer, byteLength: number): Array<number> {
  const binary = new Uint8Array(file, 0, byteLength);
  let result = [];

  for(let offset = 0; offset < byteLength; offset+=2) {
    let highByte = binary[offset];
    let lowByte = binary[offset + 1];

    for (let bit = 0; bit < 8; bit++) {
      let mostSignificantBit = (highByte << bit) & 0x80 ? (1 << 1) : 0;
      let leastSignificantBit = (lowByte << bit) & 0x80 ? 1 : 0;
      result.push(mostSignificantBit | leastSignificantBit);
    }
  }

  return result;
}