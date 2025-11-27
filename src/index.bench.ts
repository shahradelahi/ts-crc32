import * as js_crc32 from 'crc-32';
import * as js_crc32c from 'crc-32/crc32c';
import * as node_fast_crc32c from 'fast-crc32c';
import { bench, describe } from 'vitest';

import { crc32, crc32c } from './index';

const generateRandomBuffer = (length: number): Buffer => {
  return Buffer.from(Array.from({ length }, () => Math.floor(Math.random() * 256)));
};

const smallBuffer = generateRandomBuffer(100);
const mediumBuffer = generateRandomBuffer(1_024);
const largeBuffer = generateRandomBuffer(1_024 * 100);

describe('CRC32', () => {
  describe('small buffer (100B)', () => {
    bench('@se-oss/crc32', () => {
      crc32(smallBuffer);
    });
    bench('crc-32', () => {
      js_crc32.buf(smallBuffer);
    });
  });

  describe('medium buffer (1KB)', () => {
    bench('@se-oss/crc32', () => {
      crc32(mediumBuffer);
    });
    bench('crc-32', () => {
      js_crc32.buf(mediumBuffer);
    });
  });

  describe('large buffer (100KB)', () => {
    bench('@se-oss/crc32', () => {
      crc32(largeBuffer);
    });
    bench('crc-32', () => {
      js_crc32.buf(largeBuffer);
    });
  });
});

describe('CRC32C', () => {
  describe('small buffer (100B)', () => {
    bench('@se-oss/crc32', () => {
      crc32c(smallBuffer);
    });
    bench('crc-32/crc32c', () => {
      js_crc32c.buf(smallBuffer);
    });
    bench('fast-crc32c', () => {
      node_fast_crc32c.calculate(smallBuffer);
    });
  });

  describe('medium buffer (1KB)', () => {
    bench('@se-oss/crc32', () => {
      crc32c(mediumBuffer);
    });
    bench('crc-32/crc32c', () => {
      js_crc32c.buf(mediumBuffer);
    });
    bench('fast-crc32c', () => {
      node_fast_crc32c.calculate(mediumBuffer);
    });
  });

  describe('large buffer (100KB)', () => {
    bench('@se-oss/crc32', () => {
      crc32c(largeBuffer);
    });
    bench('crc-32/crc32c', () => {
      js_crc32c.buf(largeBuffer);
    });
    bench('fast-crc32c', () => {
      node_fast_crc32c.calculate(largeBuffer);
    });
  });
});
