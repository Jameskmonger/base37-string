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

## Algorithm

### `hash`

1. Take a string `x`
2. Convert `x` into an array of character codes `c[]`
3. Initialise an accumulator `acc` as 0
4. Iterate through `c[]` for individual character codes `c`:
    - If `65 <= c <= 90`, let `i` equal `(1 + c) - 65`
    - If `97 <= c <= 122`, let `i` equal `(1 + c) - 97`
    - If `48 <= c <= 57`, let `i` equal `(27 + c) - 48`
5. Multiply `acc` by 37 and add `i`
6. While `acc` is not 0 and is evenly divisible by 37, divide by 37
7. Return `acc`
