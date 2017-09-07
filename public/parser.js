function parser(file, byteLength) {
  var binary = new Uint8Array(file, 0, byteLength);
  var result = [];
  var offset = 0;

  for(var offset = 0; offset < byteLength; offset+=2) {
    var highByte = binary[offset];
    var lowByte = binary[offset + 1];

    for (var bit = 0; bit < 8; bit++) {
      var mostSignificantBit = (highByte << bit) & 0x80 ? (1 << 1) : 0;
      var leastSignificantBit = (lowByte << bit) & 0x80 ? 1 : 0;
      result.push(mostSignificantBit | leastSignificantBit);
    }
  }

  return result;
}

// function getBits(binary, offset, byteLength, result) {
//   if (offset >= byteLength)
//     return result;

//   var highByte = binary[offset];
//   var lowByte = binary[offset + 1];

//   var mostSignificantBit =  highByte & 0x80 ? 1 : 0;
//   var leastSignificantBit = lowByte & 0x80 ? 1 : 0;

//   result.push(mostSignificantBit | leastSignificantBit);

//   getBits(binary.slice(offset, byteLength), offset + 2, byteLength, result);
// }