import groupBySize from './groupPeople';

describe('Group People @S25db7c10', () => {
  test('Should return correct group people @T2fcf4853', () => {
    expect(groupBySize([3, 3, 3, 3, 3, 1, 3])).toStrictEqual([[0, 1, 2], [5], [3, 4, 6]]);
    expect(groupBySize([2, 1, 3, 3, 3, 2])).toStrictEqual([[1], [2, 3, 4], [0, 5]]);
  });
});
