const fs = require('node:fs');

fs.readFile('02-input.txt', 'utf8', (err, data) => {
  if (err) throw err;

  const lines = data.split('\n');
  const numberArrays = lines
    .map((line) => line.trim().split(/\s+/).map(Number)) // Split and convert to numbers
    .filter(
      (arr) =>
        arr.length > 0 && // Ensure the array is not empty
        arr.some((num) => num !== 0) && // Exclude arrays containing only 0
        arr.every((num) => !Number.isNaN(num)) // Ensure all elements are numbers
    );

  let safeTotal = 0;
  for (const nums of numberArrays) {
    if (isSafe(nums)) safeTotal += 1;
  }

  console.log('TOTAL:', safeTotal);
});

/**
 * Determines if nums array is "safe"
 * @param {number[]} nums
 * @returns {boolean} true if array is safe
 */
function isSafe(nums) {
  let trend;
  let flip = 0;

  for (let i = 1; i < nums.length; i++) {
    let currTrend = 'inc';
    const curr = nums[i];
    const prev = nums[i - 1];

    if (curr === prev || Math.abs(curr - prev) > 3) {
      return false;
    }

    if (curr > prev) {
      currTrend = 'inc';
    } else {
      currTrend = 'dec';
    }

    if (currTrend !== trend) {
      trend = currTrend;
      flip += 1;
      if (flip > 1) return false;
    }
  }

  return true;
}
