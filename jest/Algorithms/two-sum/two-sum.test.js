import twoSum from './two-sum';

describe('Should perform two sum', () => {
  test('Should return value of two sum', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toStrictEqual([0, 1]);
    expect(twoSum([3, 7, 11, 15], 18)).toStrictEqual([0, 3]);
  });
});
