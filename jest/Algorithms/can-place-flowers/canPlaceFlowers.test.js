import canPlaceFlowers from './canPlaceFlowers';

describe('Can place flowers', () => {
  test('Should return correct value', () => {
    expect(canPlaceFlowers([1, 0, 0, 0, 1], 1)).toBe(true);
    expect(canPlaceFlowers([1, 0, 0, 0, 1], 2)).toBe(false);
    expect(canPlaceFlowers([0, 0, 1, 0, 1], 1)).toBe(true);
    expect(canPlaceFlowers([0, 0, 1, 0, 0], 1)).toBe(true);

  });
});
