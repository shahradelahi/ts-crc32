import { Input } from './typings';

export function isBufferLike(input: Input): input is Buffer | Uint8Array {
  return typeof input !== 'string';
}

export function generateCRCTable(polynomial: number): Int32Array {
  const table = new Array(256);
  let c = 0;
  for (let n = 0; n < 256; ++n) {
    c = n;
    c = c & 1 ? polynomial ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? polynomial ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? polynomial ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? polynomial ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? polynomial ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? polynomial ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? polynomial ^ (c >>> 1) : c >>> 1;
    c = c & 1 ? polynomial ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return new Int32Array(table);
}

export function generateSliceBy16Tables(T0: Int32Array): Int32Array[] {
  const table = new Int32Array(4096);
  let c = 0,
    v = 0,
    n = 0;

  for (n = 0; n < 256; ++n) table[n] = T0[n];
  for (n = 0; n < 256; ++n) {
    v = T0[n];
    for (c = 256 + n; c < 4096; c += 256) v = table[c] = (v >>> 8) ^ T0[v & 0xff];
  }

  const out: Int32Array[] = [];
  for (n = 1; n < 16; ++n) out[n - 1] = table.subarray(n * 256, n * 256 + 256);
  return out;
}

export function crcGenericString(str: string, seed: number, T0: Int32Array): number {
  let C = seed ^ -1;
  let i = 0;
  const L = str.length;
  let c = 0,
    d = 0;

  for (; i < L; ) {
    c = str.charCodeAt(i++);
    if (c < 0x80) {
      C = (C >>> 8) ^ T0[(C ^ c) & 0xff];
    } else if (c < 0x800) {
      C = (C >>> 8) ^ T0[(C ^ (192 | ((c >> 6) & 31))) & 0xff];
      C = (C >>> 8) ^ T0[(C ^ (128 | (c & 63))) & 0xff];
    } else if (c >= 0xd800 && c < 0xe000) {
      c = (c & 1023) + 64;
      d = str.charCodeAt(i++) & 1023;
      C = (C >>> 8) ^ T0[(C ^ (240 | ((c >> 8) & 7))) & 0xff];
      C = (C >>> 8) ^ T0[(C ^ (128 | ((c >> 2) & 63))) & 0xff];
      C = (C >>> 8) ^ T0[(C ^ (128 | ((d >> 6) & 15) | ((c & 3) << 4))) & 0xff];
      C = (C >>> 8) ^ T0[(C ^ (128 | (d & 63))) & 0xff];
    } else {
      C = (C >>> 8) ^ T0[(C ^ (224 | ((c >> 12) & 15))) & 0xff];
      C = (C >>> 8) ^ T0[(C ^ (128 | ((c >> 6) & 63))) & 0xff];
      C = (C >>> 8) ^ T0[(C ^ (128 | (c & 63))) & 0xff];
    }
  }
  return ~C >>> 0;
}
