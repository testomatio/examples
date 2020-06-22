import stoneGame from './stoneGame';

describe('Stone game', () => {
  test('Should play the stone game', () => {
    expect(stoneGame([1, 4, 5, 5, 7, 6])).toStrictEqual(true);
  });
});
