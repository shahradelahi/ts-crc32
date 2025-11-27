# @se-oss/crc32

[![CI](https://github.com/shahradelahi/ts-crc32/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/shahradelahi/ts-crc32/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@se-oss/crc32.svg)](https://www.npmjs.com/package/@se-oss/crc32)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](/LICENSE)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@se-oss/crc32)
[![Install Size](https://packagephobia.com/badge?p=@se-oss/crc32)](https://packagephobia.com/result?p=@se-oss/crc32)

_@se-oss/crc32_ is a high-performance, dependency-free TypeScript library for calculating CRC32 and CRC32C checksums for strings, Buffers, and Uint8Arrays, with optional hardware acceleration for CRC32C.

---

- [Installation](#-installation)
- [Usage](#-usage)
- [Documentation](#-documentation)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
npm install @se-oss/crc32
```

<details>
<summary>Install using your favorite package manager</summary>

**pnpm**

```bash
pnpm install @se-oss/crc32
```

**yarn**

```bash
yarn add @se-oss/crc32
```

</details>

## 📖 Usage

### `crc32(input, seed?): number`

Calculates the CRC32 checksum of a value.

```ts
import { crc32 } from '@se-oss/crc32';

// Calculate CRC32 checksum for a string
const text = 'hello world';
const checksum = crc32(text); // 222957957

// Calculate CRC32 checksum for a Buffer
const buffer = Buffer.from(text);
const bufferChecksum = crc32(buffer); // 222957957

// Calculate CRC32 checksum for a Uint8Array
const uint8Array = new TextEncoder().encode(text);
const uint8ArrayChecksum = crc32(uint8Array); // 222957957

// Incremental calculation using a seed
const part1 = 'hello';
const part2 = ' world';
const whole = 'hello world';

const seed = crc32(part1);
const finalChecksum = crc32(part2, seed);
console.log(finalChecksum === crc32(whole)); // true
```

### `crc32c(input, seed?): number`

Calculates the CRC32C checksum of a value. This function will automatically use the hardware-accelerated version if the `sse4_crc32` package is available.

```ts
import { crc32c } from '@se-oss/crc32';

// Calculate CRC32C checksum for a string
const text = 'hello world';
const checksum = crc32c(text); // 3381945770

// Calculate CRC32C checksum for a Buffer
const buffer = Buffer.from(text);
const bufferChecksum = crc32c(buffer); // 3381945770

// Calculate CRC32C checksum for a Uint8Array
const uint8Array = new TextEncoder().encode(text);
const uint8ArrayChecksum = crc32c(uint8Array); // 3381945770

// Incremental calculation using a seed
const part1 = 'hello';
const part2 = ' world';
const whole = 'hello world';

const seed = crc32c(part1);
const finalChecksum = crc32c(part2, seed);
console.log(finalChecksum === crc32c(whole)); // true
```

## 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/@se-oss/crc32).

## 🚀 Performance

### CRC32

| Library           | small buffer (100B)  | medium buffer (1KB) | large buffer (100KB) |
| ----------------- | -------------------- | ------------------- | -------------------- |
| **@se-oss/crc32** | _10,185,250 ops/sec_ | _1,686,718 ops/sec_ | _18,800 ops/sec_     |
| crc-32            | 5,652,118 ops/sec    | 1,485,637 ops/sec   | 18,249 ops/sec       |

### CRC32C

| Library           | small buffer (100B) | medium buffer (1KB) | large buffer (100KB) |
| ----------------- | ------------------- | ------------------- | -------------------- |
| **@se-oss/crc32** | _9,983,748 ops/sec_ | _1,823,301 ops/sec_ | _19,928 ops/sec_     |
| crc-32/crc32c     | 5,300,129 ops/sec   | 1,648,967 ops/sec   | 19,129 ops/sec       |
| fast-crc32c       | 3,374,422 ops/sec   | 508,594 ops/sec     | 4,973 ops/sec        |

_Benchmark script: [`src/index.bench.ts`](src/index.bench.ts)_

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/ts-crc32)

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/ts-crc32/graphs/contributors).
