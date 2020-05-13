import removeDuplicates from './removeDuplicate';

describe(' Remove Duplicates from Sorted Array II', () => {
  test('It should return correct value', () => {
    expect(removeDuplicates([1, 1, 1, 2, 2, 3])).toStrictEqual(5);
    expect(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3])).toStrictEqual(7);
  });
});
