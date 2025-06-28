// // Example usage:
// const jaggedArray: (number | string)[][] = [
//   [1, 2, 3],
//   ["a", "b"],
//   [true, false, true, false],
//   [100]
// ];

// enumerateJaggedArray(jaggedArray, (element, row, col) => {
//   console.log(`Element at [${row}][${col}]: ${element}`);
// });

// /*
// Expected Output:
// Element at [0][0]: 1
// Element at [0][1]: 2
// Element at [0][2]: 3
// Element at [1][0]: a
// Element at [1][1]: b
// Element at [2][0]: true
// Element at [2][1]: false
// Element at [2][2]: true
// Element at [2][3]: false
// Element at [3][0]: 100
// */

function enumerateJaggedArray<T>(
  arr: T[][],
  callback: (element: T, rowIndex: number, colIndex: number) => void
): void {
  // Check if the input is a valid array of arrays
  if (!Array.isArray(arr)) {
    console.error("Input is not an array.");
    return;
  }

  for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
    const row = arr[rowIndex];

    // Check if the row is a valid array
    if (!Array.isArray(row)) {
      console.warn(`Row ${rowIndex} is not an array. Skipping.`);
      continue; // Skip to the next row
    }

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const element = row[colIndex];

      // Call the callback function for each element
      callback(element, rowIndex, colIndex);
    }
  }
}

