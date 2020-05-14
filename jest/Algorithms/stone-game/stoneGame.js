/**
 * @param {number[]} piles
 * @return {boolean}
 */
const stoneGame = piles => {
  const total = piles.reduce((acc, val) => acc + val, 0);
  const map = {};
  const playRound = (start, end) => {
    if (map[`${start}-${end}`]) {
      return map[`${start}-${end}`];
    }
    const diff = end - start;
    let max = 0;
    if (diff === 0) {
      return piles[start];
    }
    if (diff === 1) {
      return Math.max(piles[start], piles[end]);
    }
    const takenFromStart = piles[start] + Math.min(playRound(start + 2, end), playRound(start + 1, end - 1));
    const takenFromEnd = piles[end] + Math.min(playRound(start + 1, end - 1), playRound(start, end - 2));

    max = Math.max(takenFromStart, takenFromEnd);
    map[`${start}-${end}`] = max;

    return max;
  };

  const alexSum = playRound(0, piles.length - 1);
  return alexSum > (total - alexSum);
};

export default stoneGame;
