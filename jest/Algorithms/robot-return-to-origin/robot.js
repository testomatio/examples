const isReturnToOrigin = moves => {
  const [x, y] = moves.split('').reduce((acc, move) => {
    if (move === 'U') {
      acc[1] += 1;
    } else if (move === 'D') {
      acc[1] -= 1;
    } else if (move === 'R') {
      acc[0] += 1;
    } else if (move === 'L') {
      acc[0] -= 1;
    }

    return acc;
  }, [0, 0]);

  return x === 0 && y === 0;
};

export default isReturnToOrigin;
