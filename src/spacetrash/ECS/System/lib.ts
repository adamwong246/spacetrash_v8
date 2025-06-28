import { MapSize } from "../../Constants";
import {
  generateRandomHexColor,
  HeatConductorComponent,
} from "../Components/v3/heat";
import { SetPieceComponent, SetPieceStore } from "../Components/v3/setPieces";
import { ThermalColors, getColorGrade } from "./ThermalColors";

let largest = 0;

let colors = [
    "#0000FF",  // Blue
    "#1A00E5",
    "#3300CC",
    "#4D00B2",
    "#660099",
    "#800080",
    "#990066",
    "#B2004D",
    "#CC0033",
    "#E5001A",
    "#FF0000"   // Red
]
  
export function averageNeighborsInPlace(s: SetPieceStore, GAME) {
  const numRows = MapSize;
  const numCols = MapSize;

  // Create a new array to store the averaged values
  const averagedArr = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(0));

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let sum = 0;
      let count = 0;

      // Iterate through the 3x3 neighborhood centered on the current cell
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const neighborRow = row + i;
          const neighborCol = col + j;

          // Check if the neighbor is within the array bounds
          if (
            neighborRow >= 0 &&
            neighborRow < numRows &&
            neighborCol >= 0 &&
            neighborCol < numCols
          ) {
            // sum += arr[neighborRow][neighborCol];
            sum += s.store[neighborCol][neighborRow].heat;

            count++;
          }
        }
      }

      if (sum > largest) {
        largest = sum
        // console.log("largest", largest)
      }
      // console.log("sum", sum)
      // Calculate the average and store it in the temporary array
      averagedArr[row][col] = sum / count;
    }
  }

  // Update the original array with the averaged values
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const oldHeat = s.store[col][row].heat;
      const oldGrade = getColorGrade(oldHeat);
      const newHeat = averagedArr[row][col];

      // if (newHeat > 0) debugger;

      const newGrade = getColorGrade(newHeat);

      // s.store[col][row].heatConductor?.pixiThermalGraphic.tint = 0xFF0000;
      // s.store[col][row].heatConductor.pixiThermalGraphic.tint = 0xFF0000;

      // ThermalColors[newGrade];
      // console.log(generateRandomHexColor(), ThermalColors[newGrade])
      // debugger
      console.log(oldHeat, newHeat, oldGrade,newGrade)
      if (oldGrade !== newGrade) {
        // console.log("mark1", newGrade, ThermalColors.get(newGrade));
        // debugger
        GAME.pixi2dThermalApp.stage.addChild(
          HeatConductorComponent.thermalGraphic(
            col,
            row,
            colors[Math.round(newHeat)]
            // ThermalColors.get(1)
            // generateRandomHexColor()
            // ThermalColors[5]
            // "#800080"
          )
        );
        // s.store[col][row].heatConductor.pixiThermalGraphic.tint = 0xFF0000; //ThermalColors[newGrade];
      }
    }
  }

  // nothing to return, as we have edited in-place;
}

export function interpolateColor(
  LOWER_BOUND: number,
  HIGHER_BOUND: number,
  X: number,
  COLD_COLOR: string,
  HOT_COLOR: string
): string {
  // Assertions (can be implemented as runtime checks if needed)
  console.assert(LOWER_BOUND < 0, "LOWER_BOUND must be less than 0");
  console.assert(HIGHER_BOUND > 0, "HIGHER_BOUND must be greater than 0");
  console.assert(
    X >= LOWER_BOUND && X <= HIGHER_BOUND,
    "X must be between LOWER_BOUND and HIGHER_BOUND"
  );
  // Assuming well-formed hex color values for simplicity as asserted in prompt.
  // Real-world implementation might include validation.

  // Normalize X to a value between 0 and 1
  const normalizedX = (X - LOWER_BOUND) / (HIGHER_BOUND - LOWER_BOUND) * 4;

  // Convert hex colors to RGB values
  const coldRgb = hexToRgb(COLD_COLOR);
  const hotRgb = hexToRgb(HOT_COLOR);

  if (!coldRgb || !hotRgb) {
    // Handle invalid color format if needed
    return "#000000"; // Return a default color or throw an error
  }

  // Interpolate RGB values
  const r = Math.round(coldRgb.r + (hotRgb.r - coldRgb.r) * normalizedX);
  const g = Math.round(coldRgb.g + (hotRgb.g - coldRgb.g) * normalizedX);
  const b = Math.round(coldRgb.b + (hotRgb.b - coldRgb.b) * normalizedX);

  // Convert interpolated RGB back to hex
  return rgbToHex(r, g, b);
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Helper function to convert RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  const componentToHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

// // Example Usage:
// const LOWER_BOUND = -10;
// const HIGHER_BOUND = 10;
// const X = 5;
// const COLD_COLOR = "#0000ff"; // Blue
// const HOT_COLOR = "#ff0000"; // Red

// const interpolatedColor = interpolateColor(LOWER_BOUND, HIGHER_BOUND, X, COLD_COLOR, HOT_COLOR);
// console.log(`Interpolated color for X=${X}: ${interpolatedColor}`); // Should be something like "#7f007f" (Purple)

// const X2 = -5;
// const interpolatedColor2 = interpolateColor(LOWER_BOUND, HIGHER_BOUND, X2, COLD_COLOR, HOT_COLOR);
// console.log(`Interpolated color for X=${X2}: ${interpolatedColor2}`); // Should be something like "#2a00d5" (Bluish)

// const X3 = 0;
// const interpolatedColor3 = interpolateColor(LOWER_BOUND, HIGHER_BOUND, X3, COLD_COLOR, HOT_COLOR);
// console.log(`Interpolated color for X=${X3}: ${interpolatedColor3}`); // Should be something like "#800080" (Exactly in between)
