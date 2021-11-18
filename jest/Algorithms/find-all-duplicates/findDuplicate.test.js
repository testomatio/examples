import findDuplicate from './findDuplicate';

describe('Should find duplicate', () => {
  test('Should return duplicate array from an array', () => {
    expect(findDuplicate([4, 3, 2, 7, 8, 2, 3, 1])).toStrictEqual([2, 3]);
    expect(findDuplicate([4, 3, 2, 7, 8, 3, 8])).toStrictEqual([3, 8]);
  });
});
