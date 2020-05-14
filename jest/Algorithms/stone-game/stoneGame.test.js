import stoneGame from './stoneGame';

describe('Minimum Path Sum', () => {
  test('It should return correct value', () => {
    expect(stoneGame([1, 4, 5, 5, 7, 6])).toStrictEqual(true);
  });
});
