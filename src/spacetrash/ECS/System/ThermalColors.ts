import { interpolateColor } from "./lib";

export const ThermalColors: Map<number, string> = new Map();

const GRADES = 10;
const COLDEST = -100;
const HOTTEST = 100;
const RED = "#FF0000";
const BLUE = "#0000FF";

for (let i = 0; i < GRADES; i++) {
  ThermalColors.set(i, interpolateColor(COLDEST, HOTTEST, i, BLUE, RED));
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Write me a function that accepts 3 arguments.
// 1) a number X
// 2) a number COLDEST
// 3) a number HOTTEST
// 4) a number GRADES
// It should return an integer between zero and GRADES.
// The return values should correspond to the ratio of X to COLDEST and X to HOTTEST, given a range of COLDEST to HOTTEST divided into a series GRADES.
// The function should assert that COLDEST is less than zero.
// The function should assert that HOTTEST is greater than zero.
// The function should assert that X is greater than COLDEST and less than HOTTEST.
export function getColorGrade(X: number): number {
  /**
   * Calculates a grade based on the position of X within the range [COLDEST, HOTTEST],
   * divided into GRADES intervals.
   *
   * @param X The number to be graded.
   * @returns An integer between 0 and GRADES (inclusive), representing the grade.
   */

  // Using assertion functions for runtime validation
  // In TypeScript, assertion functions (like `assert` from Node's assert module)
  // are useful for runtime checks and type narrowing,
  // or you can implement your own custom assertion functions.
  // For this example, we'll use simple checks and throw errors,
  // which effectively serves the purpose of assertion in a runtime context.

  if (COLDEST >= 0) {
    throw new Error("COLDEST must be less than zero");
  }
  if (HOTTEST <= 0) {
    throw new Error("HOTTEST must be greater than zero");
  }
  if (X < COLDEST || X > HOTTEST) {
    throw new Error("X must be within the range [COLDEST, HOTTEST]");
  }
  if (GRADES <= 0 || !Number.isInteger(GRADES)) {
    throw new Error("GRADES must be a positive integer");
  }

  // Normalize X to a 0-1 range within the COLDEST to HOTTEST range
  // First, shift the range so COLDEST becomes 0
  const shiftedX = X - COLDEST;
  const shiftedRange = HOTTEST - COLDEST;

  // Normalize to a 0-1 range
  const normalizedX = shiftedX / shiftedRange;

  // Map the normalized value to the GRADES range
  let grade = normalizedX * GRADES;

  // Round the result to the nearest integer and ensure it's within the 0 to GRADES range
  // Use Math.round() for standard rounding.
  grade = Math.round(grade);

  // Ensure the grade is within the valid range [0, GRADES]
  grade = Math.max(0, Math.min(grade, GRADES));

  return grade;
}
