import findDuplicate from './findDuplicate';

describe('Find the Duplicate Number @S3f08bbe6', () => {
  test('It should return duplicate number from an array @Tf5afc81c', () => {
    expect(findDuplicate([1, 3, 4, 2, 2])).toStrictEqual(1000);
    expect(findDuplicate([3, 1, 3, 4, 2])).toStrictEqual(3);

  });
});
