"use strict";
function parser(file, byteLength) {
    const binary = new Uint8Array(file, 0, byteLength);
    const result = [];
    for (let offset = 0; offset < byteLength; offset += 2) {
        const highByte = binary[offset];
        const lowByte = binary[offset + 1];
        for (let bit = 0; bit < 8; bit++) {
            const mostSignificantBit = (highByte << bit) & 0x80 ? (1 << 1) : 0;
            const leastSignificantBit = (lowByte << bit) & 0x80 ? 1 : 0;
            result.push(mostSignificantBit | leastSignificantBit);
        }
    }
    return result;
}
