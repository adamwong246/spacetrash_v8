import * as React from 'react'
import { createRoot } from 'react-dom/client';

// shape 2 bits
// substance 2 bits
// light 4 bits

// Uint8Array (255)
// Uint16Array (65535)
// Uint32Array (4294967295)

// 0 dim  - 1x1         - 1      1
// 1 dim  - 2x2         - 4      5
// 2 dim  - 4x4         - 16     21
// 3 dim  - 8x8         - 64     85
// 4 dim  - 16x16       - 256    341     Uint8Array (255)
// 5 dim  - 32x32       - 1024   1365
// 6 dim  - 64x64       - 4096   5461
// 7 dim  - 128x128     - 16384  21845
// 8 dim  - 256x256     - 65536  87381    Uint16Array (65535)

// bits (16)  shape, solidity, light, heat, thermal, sound
/// shapes - 2 bits
/// substance - 2 bits



// 9 dim  - 512x512     - 262144  349525
// 10 dim - 1024x1024   - 1048576 1398101    



// 11 dim - 2048x2048   - 4194304  
// 12 dim - 4096x4096   - 16777216   tiles - 67108864   subtiles
// 13 dim - 8192x8192   - 67108864   tiles - 268435456  subtiles
// 14 dim - 16384x16384 - 268435456  tiles - 1073741824 subtiles
// 14 dim - 32768x32768 - 1073741824 tiles - 4294967296 subtiles - BigUint64Array

// Bits
// 0 - solidity
// 1
// 2
// 3
// 4
// 5
// 6
// 7

class GameSpace {
  dimensions: number;
  levels

  constructor(dimensions: number) {
    this.dimensions = 4;
  }
}

const gf = new GameSpace(4)

document.addEventListener("DOMContentLoaded", function (event) {

  const domNode = document.getElementById('react-root');
  if (domNode) {
    createRoot(domNode).render(<p>hello gamespace</p>);
  }

});
