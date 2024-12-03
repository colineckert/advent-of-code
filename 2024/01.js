const fs = require("node:fs");

fs.readFile("01-input.txt", "utf8", (err, data) => {
  if (err) throw err;

  const lines = data.split("\n");

  const column1 = [];
  const column2 = [];

  lines.forEach((line) => {
    const [num1, num2] = line.trim().split(/\s+/).map(Number);
    if (!isNaN(num1) && !isNaN(num2)) {
      column1.push(num1);
      column2.push(num2);
    }
  });

  // const total = calcDistance(column1, column2);
  // console.log("TOTAL:", total);

  const score = calcSimilariy(column1, column2);
  console.log("SCORE:", score);
});

/**
 * Adds two numbers together.
 * @param {number[]} list1
 * @param {number[]} list2
 * @returns {number} The sum of the distances.
 */
function calcDistance(list1, list2) {
  const sorted1 = list1.sort();
  const sorted2 = list2.sort();

  let total = 0;
  for (let i = 0; i < sorted1.length; i++) {
    const distance = Math.abs(sorted1[i] - sorted2[i]);
    total += distance;
  }

  return total;
}

/**
 * Adds two numbers together.
 * @param {number[]} list1
 * @param {number[]} list2
 * @returns {number} The similarity score
 */
function calcSimilariy(list1, list2) {
  const hash = {};

  for (let i = 0; i < list2.length; i++) {
    const val = list2[i];
    if (hash[val]) {
      hash[val] = hash[val] + 1;
    } else {
      hash[val] = 1;
    }
  }

  let score = 0;
  for (let i = 0; i < list1.length; i++) {
    const val = list1[i];
    const increase = hash[val] ? hash[val] * val : 0;
    score += increase;
  }

  return score;
}
