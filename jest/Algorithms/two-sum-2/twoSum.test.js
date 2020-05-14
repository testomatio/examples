import twoSum from './twoSum';

describe('Two sum II', () => {
  test('Should return correct values', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toStrictEqual([1, 2]);
  });
});
