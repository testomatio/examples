import removeElement from './removeElement';

describe('Remove element', () => {
  test('Should return correct values', () => {
    expect(removeElement([3, 2, 2, 3], 3)).toBe(2);
    expect(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)).toBe(5);
  });
});
