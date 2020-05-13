import findDuplicate from './findDuplicate';

describe('Find the Duplicate Number', () => {
  test('It should return correct value', () => {
    expect(findDuplicate([1, 3, 4, 2, 2])).toStrictEqual(2);
    expect(findDuplicate([3, 1, 3, 4, 2])).toStrictEqual(3);

  });
});
