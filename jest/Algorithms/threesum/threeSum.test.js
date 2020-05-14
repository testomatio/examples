import threeSum from './threeSum';

describe('Should perform three sum', () => {
  test('Should return correct value', () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4], 0)).toStrictEqual([0, 1, 2]);
    expect(threeSum([2, 7, 1, 11, 15], 18)).toStrictEqual([0, 2, 4]);
    expect(threeSum([10, 12, 12, 15, 12], 37)).toEqual([0, 1, 3]);
  });

  test('should return null when no such triplets found', () => {
    expect(threeSum([1, 2, 3], 4)).toBeNull();
  });
});
