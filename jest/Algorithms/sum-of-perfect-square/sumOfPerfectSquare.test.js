import sumOfPerfectSquares from './sumOfPerfectSquare';

describe('sumOfPerfectSquares', () => {
  it('returns the length of the smallest list of perfect squares', () => {
    expect(sumOfPerfectSquares(16)).toEqual(1);
    expect(sumOfPerfectSquares(15)).toEqual(4);
    expect(sumOfPerfectSquares(17)).toEqual(2);
    expect(sumOfPerfectSquares(18)).toEqual(2);
    expect(sumOfPerfectSquares(19)).toEqual(3);
  });
});
