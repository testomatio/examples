const isPerfectSquare = (number) => {
  const sqrt = Math.sqrt(number);
  return sqrt - Math.floor(sqrt) === 0;
};

const sumOfPerfectSquares = (number) => {
  let count = number;
  if (isPerfectSquare(number)) {
    return 1;
  }
  for (let i = (number - 1); i > 0; i -= 1) {
    if (isPerfectSquare(i)) {
      const newSum = number - i;
      const newCount = sumOfPerfectSquares(newSum);
      if (count > newCount) {
        count = newCount + 1;
      }
    }
  }

  return count;
};

export default sumOfPerfectSquares;
