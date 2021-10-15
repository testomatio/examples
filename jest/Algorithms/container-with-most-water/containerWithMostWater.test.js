import findContainer from './containerwithMostWater';

describe('It should find the container with most water @S853201b1', () => {
  test('It should return container with most water @T41c2761e', () => {
    expect(findContainer([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
    expect(findContainer([3, 9, 3, 4, 7, 2, 12, 6])).toBe(45);
  });
});
