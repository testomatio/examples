import minPathSum from './minPathSum';

describe('Minimum Path Sum', () => {
  test('It should return correct value', () => {
    expect(minPathSum([
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1],
    ])).toStrictEqual(7);
  });
});
