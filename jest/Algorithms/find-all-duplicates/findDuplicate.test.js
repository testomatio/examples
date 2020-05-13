import findDuplicate from './findDuplicate';

describe('Should find duplicate', () => {
  test('Should return correct value', () => {
    expect(findDuplicate([4, 3, 2, 7, 8, 2, 3, 1])).toStrictEqual([2, 3]);
    expect(findDuplicate([4, 3, 2, 7, 8, 3, 8])).toStrictEqual([3, 8]);
  });
});
