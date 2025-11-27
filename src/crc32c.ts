import { POLY_CRC32C } from './constants';
import { Input } from './typings';
import { crcGenericString, generateCRCTable, generateSliceBy16Tables, isBufferLike } from './utils';

let sse42_crc: ((buffer: Buffer, seed?: number) => number) | undefined;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const sse4_crc32_module = require('sse4_crc32');
  sse42_crc = sse4_crc32_module.sse42_crc;
} catch (_) {
  // noop
}

const T0_32C = generateCRCTable(POLY_CRC32C);
const TT_32C = generateSliceBy16Tables(T0_32C);
const [T1, T2, T3, T4, T5, T6, T7, T8, T9, Ta, Tb, Tc, Td, Te, Tf] = TT_32C;

function crc32cBuffer(buf: Buffer | Uint8Array, seed: number): number {
  let C = seed ^ -1;
  let i = 0;
  let L = buf.length - 15;

  for (; i < L; )
    C =
      Tf[buf[i++] ^ (C & 255)] ^
      Te[buf[i++] ^ ((C >>> 8) & 255)] ^
      Td[buf[i++] ^ ((C >>> 16) & 255)] ^
      Tc[buf[i++] ^ (C >>> 24)] ^
      Tb[buf[i++]] ^
      Ta[buf[i++]] ^
      T9[buf[i++]] ^
      T8[buf[i++]] ^
      T7[buf[i++]] ^
      T6[buf[i++]] ^
      T5[buf[i++]] ^
      T4[buf[i++]] ^
      T3[buf[i++]] ^
      T2[buf[i++]] ^
      T1[buf[i++]] ^
      T0_32C[buf[i++]];

  for (L += 15; i < L; ) C = (C >>> 8) ^ T0_32C[(C ^ buf[i++]) & 0xff];
  return ~C >>> 0;
}

export function crc32c(input: Input, seed: number = 0): number {
  if (isBufferLike(input)) {
    if (sse42_crc && Buffer.isBuffer(input)) {
      return sse42_crc(input, seed);
    } else {
      return crc32cBuffer(input, seed);
    }
  } else {
    return crcGenericString(input, seed, T0_32C);
  }
}
