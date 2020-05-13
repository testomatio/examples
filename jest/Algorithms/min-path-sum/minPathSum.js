/**
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = grid => {
  const m = grid.length - 1;
  const n = grid[0].length - 1;
  let result = 0;
  const cache = {};

  const min = (a, b) => (a < b ? a : b);

  const findSumFromNodeCache = (row, column) => {
    let sum = cache[`${row}-${column}`];
    if (sum === undefined) {
      let total = 0;
      if (row < m && column < n) {
        total = min(findSumFromNodeCache(row + 1, column), findSumFromNodeCache(row, column + 1));
      } else if (row < m) {
        total = findSumFromNodeCache(row + 1, column);
      } else if (column < n) {
        total = findSumFromNodeCache(row, column + 1);
      }
      sum = total + grid[row][column];

      cache[`${row}-${column}`] = sum;
    }

    return sum;
  };

  result = findSumFromNodeCache(0, 0);
  return result;
};

export default minPathSum;
