import groupBySize from './groupPeople';

describe('Group People', () => {
  test('Should return correct value', () => {
    expect(groupBySize([3, 3, 3, 3, 3, 1, 3])).toStrictEqual([[0, 1, 2], [5], [3, 4, 6]]);
    expect(groupBySize([2, 1, 3, 3, 3, 2])).toStrictEqual([[1], [2, 3, 4], [0, 5]]);
  });
});
