import { POLY_CRC32 } from './constants';
import { Input } from './typings';
import { crcGenericString, generateCRCTable, generateSliceBy16Tables, isBufferLike } from './utils';

const T0_32 = generateCRCTable(POLY_CRC32);
const TT_32 = generateSliceBy16Tables(T0_32);
const [T1, T2, T3, T4, T5, T6, T7, T8, T9, Ta, Tb, Tc, Td, Te, Tf] = TT_32;

function crc32Buffer(buf: Buffer | Uint8Array, seed: number): number {
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
      T0_32[buf[i++]];

  for (L += 15; i < L; ) C = (C >>> 8) ^ T0_32[(C ^ buf[i++]) & 0xff];
  return ~C >>> 0;
}

export function crc32(input: Input, seed: number = 0): number {
  if (isBufferLike(input)) {
    return crc32Buffer(input, seed);
  } else {
    return crcGenericString(input, seed, T0_32);
  }
}
