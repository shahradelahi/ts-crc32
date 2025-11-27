import { describe, expect, it } from 'vitest';

import { crc32, crc32c } from './index';

describe('crc32', () => {
  it('should compute the crc32 of a string', () => {
    const val1 = crc32('hello world');
    const val2 = crc32('The quick brown fox jumps over the lazy dog');
    const val3 = crc32('SheetJS');
    // console.log('CRC32 - hello world:', val1);
    // console.log('CRC32 - The quick brown fox...', val2);
    // console.log('CRC32 - SheetJS:', val3);
    expect(val1).toBe(222957957);
    expect(val2).toBe(1095738169);
    expect(val3).toBe(2647669026);
  });

  it('should compute the crc32 of a buffer', () => {
    const buf = Buffer.from('hello world');
    const val = crc32(buf);
    // console.log('CRC32 Buffer - hello world:', val);
    expect(val).toBe(222957957);
  });

  it('should compute the crc32 of a Uint8Array', () => {
    const buf = new TextEncoder().encode('hello world');
    const val = crc32(buf);
    // console.log('CRC32 Uint8Array - hello world:', val);
    expect(val).toBe(222957957);
  });

  it('should handle seeding', () => {
    const part1 = 'hello';
    const part2 = ' world';
    const whole = 'hello world';

    const seed = crc32(part1);
    const final = crc32(part2, seed);

    // console.log('CRC32 Seeding - whole:', crc32(whole));
    // console.log('CRC32 Seeding - final:', final);
    expect(final).toBe(crc32(whole));
  });

  it('should handle empty input', () => {
    const val1 = crc32('');
    const val2 = crc32(Buffer.from(''));
    // console.log('CRC32 Empty string:', val1);
    // console.log('CRC32 Empty buffer:', val2);
    expect(val1).toBe(0);
    expect(val2).toBe(0);
  });
});

describe('crc32c', () => {
  it('should compute the crc32c of a string', () => {
    const val1 = crc32c('hello world');
    const val2 = crc32c('The quick brown fox jumps over the lazy dog');
    const val3 = crc32c('\u0000');
    const val4 = crc32c('');
    // console.log('CRC32C - hello world:', val1);
    // console.log('CRC32C - The quick brown fox...', val2);
    // console.log('CRC32C - Null byte:\u0000', val3);
    // console.log('CRC32C - Empty string:', val4);
    expect(val1).toBe(3381945770);
    expect(val2).toBe(576848900);
    expect(val3).toBe(1383945041);
    expect(val4).toBe(0);
  });

  it('should compute the crc32c of a buffer', () => {
    const buf = Buffer.from('hello world');
    const val = crc32c(buf);
    // console.log('CRC32C Buffer - hello world:', val);
    expect(val).toBe(3381945770);
  });

  it('should compute the crc32c of a Uint8Array', () => {
    const buf = new TextEncoder().encode('hello world');
    const val = crc32c(buf);
    // console.log('CRC32C Uint8Array - hello world:', val);
    expect(val).toBe(3381945770);
  });

  it('should handle seeding', () => {
    const part1 = 'hello';
    const part2 = ' world';
    const whole = 'hello world';

    const seed = crc32c(part1);
    const final = crc32c(part2, seed);

    // console.log('CRC32C Seeding - whole:', crc32c(whole));
    // console.log('CRC32C Seeding - final:', final);
    expect(final).toBe(crc32c(whole));
  });

  it('should handle empty input', () => {
    const val1 = crc32c('');
    const val2 = crc32c(Buffer.from(''));
    // console.log('CRC32C Empty string:', val1);
    // console.log('CRC32C Empty buffer:', val2);
    expect(val1).toBe(0);
    expect(val2).toBe(0);
  });
});
