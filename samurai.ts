import sharp from "sharp";

import { BasePolygons } from "./src/spacetrash/physics/BasePolygon";

const SIZE = 32;

const HEIGHT = 1;
const MARGIN = 2;

// Function to process the SVG grid with sharp (e.g., convert to PNG)
async function processSvgGrid(
  squareSize,
  gap,
  fill,
  stroke,
  strokeWidth,
  outputPath
) {

  const WIDTH = Object.keys(BasePolygons).length

  let svgContent = `<svg width="${WIDTH * (SIZE + MARGIN)}" height="${
    HEIGHT * SIZE
  }" xmlns="http://www.w3.org/2000/svg">`;

  svgContent += `<g >`;

  Object.values(BasePolygons).forEach((sp, n) => {
    svgContent += `<g transform="translate(${SIZE * n + (n * MARGIN)} 0)  ">`;

    svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="white"  />`;

    const points = sp().vectors.reduce((mm, lm, ndx) => {
      mm += `${lm.x},${lm.y} `
      return mm

    }, ``)
    svgContent += ` <polygon points="${points}" style="fill:grey" />`;
    


    svgContent += `</g>`;
  });

  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // svgContent += ` <polygon points="0,0 ${SIZE},${SIZE} 0,${SIZE}" style="fill:grey" />`;
  // // svgContent += `<line x1="0" y1="0" x2="${SIZE}" y2="${SIZE}" style="stroke:red" />`;
  // svgContent += `</g>`;

  // // svgContent += `<g transform="translate(${SIZE * 1 + MARGIN} 0)  ">`;
  // // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // // svgContent += ` <polygon points="0,0 ${SIZE},${SIZE} 0,${SIZE}" style="fill:grey" />`;
  // // svgContent += `<line x1="0" y1="0" x2="${SIZE}" y2="${SIZE}" style="stroke:red" />`;
  // // svgContent += `<line x1="${SIZE}" y1="${SIZE}" x2="0" y2="${SIZE}" style="stroke:red" />`;
  // // svgContent += `</g>`;

  // // svgContent += `<g transform="translate(${SIZE * 2 + MARGIN + 2} 0)  ">`;
  // // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // // svgContent += ` <polygon points="0,0 ${SIZE},${SIZE} 0,${SIZE}" style="fill:grey" />`;
  // // svgContent += `<line x1="0" y1="0" x2="${SIZE}" y2="${SIZE}" style="stroke:red" />`;
  // // svgContent += `<line x1="${SIZE}" y1="${SIZE}" x2="0" y2="${SIZE}" style="stroke:red" />`;
  // // svgContent += `<line x1="0" y1="${SIZE}" x2="0" y2="0" style="stroke:red" />`;
  // // svgContent += `</g>`;

  // /////////////////////////////////////////////////////////////////////////////

  // svgContent += `<g transform="translate(0, ${SIZE + MARGIN})  ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // svgContent += `</g>`;

  // svgContent += `<g transform="translate(${SIZE + MARGIN}, ${
  //   SIZE + MARGIN
  // })  ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="grey"  />`;
  // svgContent += `</g>`;

  // /////////////////////////////////////////////////////////////////////////////

  // svgContent += `<g transform="translate(0, ${SIZE * 2 + (MARGIN + 2)})  ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // svgContent += ` <polygon points="0,0 ${SIZE},0 ${SIZE},${SIZE / 2} 0,${
  //   SIZE / 2
  // }" style="fill:grey" />`;
  // svgContent += `</g>`;

  // svgContent += `<g transform="translate(${SIZE + MARGIN}, ${
  //   SIZE * 2 + (MARGIN + 2)
  // })  ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // svgContent += ` <polygon points="0,0 ${SIZE / 2},0 ${SIZE / 2},${
  //   SIZE / 2
  // } 0,${SIZE / 2}" style="fill:grey" />`;
  // svgContent += `</g>`;

  // svgContent += `<g transform="translate(${SIZE * 2 + MARGIN + 2}, ${
  //   SIZE * 2 + (MARGIN + 2)
  // })  ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // svgContent += ` <polygon points="
  // 0,0
  // ${SIZE / 2},0

  // ${SIZE / 2},${SIZE / 2}
  // ${SIZE},${SIZE / 2}
  // ${SIZE},${SIZE},
  // ${0},${SIZE}
  // "

  //   style="fill:grey" />`;

  // svgContent += `</g>`;

  // svgContent += `<g transform="translate(${SIZE * 3 + MARGIN + 4}, ${
  //   SIZE * 2 + (MARGIN + 2)
  // })  ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // svgContent += ` <polygon points="
  // 0,0
  // ${SIZE / 2},0
  // ${SIZE / 2},${SIZE / 2}

  // ${SIZE},${SIZE},
  // ${0},${SIZE}
  // "

  //   style="fill:grey" />`;

  // svgContent += `</g>`;

  // svgContent += `<g transform="translate(${SIZE * 4 + MARGIN + 6}, ${
  //   SIZE * 2 + (MARGIN + 2)
  // })  ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="grey"  />`;
  // svgContent += ` <polygon points="
  // 0,0
  // ${SIZE / 2},0
  // ${SIZE / 2},${SIZE / 2}

  // ${SIZE},${SIZE},
  // ${0},${SIZE}
  // "

  //   style="fill:lightgrey" />`;

  // svgContent += `</g>`;

  // //   svgContent += `<g transform=" translate(${SIZE * 2 + MARGIN}, ${SIZE * 2 + (MARGIN + 2)}) rotate(90)  ">`;
  // // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // // svgContent += ` <polygon points="0,0 ${SIZE},0 ${SIZE},${SIZE / 2} 0,${
  // //   SIZE / 2
  // // }" style="fill:grey" />`;
  // // svgContent += `<line x1="0" y1="${SIZE / 2}" x2="${SIZE}" y2="${
  // //   SIZE / 2
  // // }" style="stroke:blue" />`;
  // // svgContent += `</g>`;

  // // svgContent += `<g transform="translate(${SIZE * 2 + MARGIN}, ${
  // //   SIZE * 2 + (MARGIN + 2)
  // // }) rotate(90)  ">`;
  // // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // // svgContent += ` <polygon points="0,0 ${SIZE},0 ${SIZE},${SIZE / 2} 0,${
  // //   SIZE / 2
  // // }" style="fill:grey" />`;
  // // svgContent += `<line x1="0" y1="${SIZE / 2}" x2="${SIZE}" y2="${
  // //   SIZE / 2
  // // }" style="stroke:red" />`;
  // // svgContent += `</g>`;

  // // svgContent += `<g transform="translate(${SIZE * 3 + (MARGIN + 2)}, ${
  // //   SIZE * 3 + (MARGIN + 2)
  // // }) rotate(180)  ">`;
  // // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // // svgContent += ` <polygon points="0,0 ${SIZE},0 ${SIZE},${SIZE / 2} 0,${
  // //   SIZE / 2
  // // }" style="fill:grey" />`;
  // // svgContent += `<line x1="0" y1="${SIZE / 2}" x2="${SIZE}" y2="${
  // //   SIZE / 2
  // // }" style="stroke:red" />`;
  // // svgContent += `</g>`;

  // // svgContent += `<g transform="translate(${SIZE * 3 + (MARGIN + 4)}, ${
  // //   SIZE * 3 + (MARGIN + 2)
  // // }) rotate(270)  ">`;
  // // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // // svgContent += ` <polygon points="0,0 ${SIZE},0 ${SIZE},${SIZE / 2} 0,${
  // //   SIZE / 2
  // // }" style="fill:grey" />`;
  // // svgContent += `<line x1="0" y1="${SIZE / 2}" x2="${SIZE}" y2="${
  // //   SIZE / 2
  // // }" style="stroke:red" />`;
  // // svgContent += `</g>`;

  // /////////////////////////////////////////////////////////////////////////////

  // svgContent += `<g transform="translate(0, ${SIZE * 3 + (MARGIN + 4)})  ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // svgContent += ` <polygon points="0,0 ${SIZE / 2},0 0,${
  //   SIZE / 2
  // } " style="fill:grey" />`;
  // // svgContent += `<line x1="${SIZE / 2}" y1="0" x2="0" y2="${
  // //   SIZE / 2
  // // }" style="stroke:red" />`;
  // svgContent += `</g>`;

  // svgContent += `<g transform="translate(${SIZE * 1 + MARGIN}, ${
  //   SIZE * 3 + (MARGIN + 4)
  // })   ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // svgContent += ` <polygon points="0,0 ${
  //   SIZE / 2
  // },0 0,${SIZE} " style="fill:grey" />`;
  // // svgContent += `<line x1="${SIZE / 2}" y1="0" x2="0" y2="${
  // //   SIZE
  // // }" style="stroke:red" />`;
  // svgContent += `</g>`;

  // svgContent += `<g transform="translate(${SIZE * 2 + MARGIN + 2}, ${
  //   SIZE * 3 + (MARGIN + 4)
  // })   ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // svgContent += ` <polygon points="${
  //   SIZE / 2
  // },0 ${SIZE},0 ${SIZE},${SIZE}  0, ${SIZE}" style="fill:grey" />`;
  // // svgContent += `<line x1="${SIZE / 2}" y1="0" x2="0" y2="${
  // //   SIZE
  // // }" style="stroke:red" />`;
  // svgContent += `</g>`;

  // svgContent += `<g transform="translate(${SIZE * 3 + MARGIN + 4}, ${
  //   SIZE * 3 + (MARGIN + 4)
  // })   ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="grey"  />`;
  // svgContent += ` <polygon points="

  // ${SIZE / 2},0
  // ${SIZE},0
  // ${SIZE},${SIZE / 2}
  // ${SIZE / 2},0 "

  // style="fill:lightgrey" />`;

  svgContent += `</g>`;

  // svgContent += `<g transform="translate(${SIZE * 2 + MARGIN + 2}, ${
  //   SIZE * 4 + (MARGIN + 4)
  // }) rotate(270)  ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // svgContent += ` <polygon points="0,0 ${SIZE / 2},0 0,${
  //   SIZE / 2
  // } " style="fill:grey" />`;
  // svgContent += `<line x1="${SIZE / 2}" y1="0" x2="0" y2="${
  //   SIZE / 2
  // }" style="stroke:red" />`;
  // svgContent += `</g>`;

  // svgContent += `<g transform="translate(${SIZE * 4 + MARGIN + 4}, ${
  //   SIZE * 4 + (MARGIN + 4)
  // }) rotate(180)  ">`;
  // svgContent += `<rect x="${0}" y="${0}" width="${SIZE}" height="${SIZE}" fill="lightgrey"  />`;
  // svgContent += ` <polygon points="0,0 ${SIZE / 2},0 0,${
  //   SIZE / 2
  // } " style="fill:grey" />`;
  // svgContent += `<line x1="${SIZE / 2}" y1="0" x2="0" y2="${
  //   SIZE / 2
  // }" style="stroke:red" />`;
  // svgContent += `</g>`;

  ////////////////////////////////////////////////
  svgContent += `</svg>`;

  // const svg = generateSvgGrid(squareSize, gap, fill, stroke, strokeWidth);
  const svgBuffer = Buffer.from(svgContent);

  try {
    await sharp(svgBuffer)
      .png() // Convert to PNG format
      .toFile(outputPath);

    console.log(`SVG grid saved as ${outputPath}`);
  } catch (error) {
    console.error("Error processing SVG grid:", error);
  }
}

// Example usage:
processSvgGrid(
  32,
  10,
  "#f0f0f0",
  "#333333",
  1,
  "./src/spacetrash/tiled/tileset3.png"
);
