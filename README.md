# 64-bit-string-hash

Hash a string into a 64-bit number

## Installation

```
npm install 64-bit-string-hash --save
```

## Usage

```
import { hash, unhash } from "64-bit-string-hash";

const hashed = hash("james"); // 0x00000000011F0598
const unhashed = unhash(hashed); // james
```
