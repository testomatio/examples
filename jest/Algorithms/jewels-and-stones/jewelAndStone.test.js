import findJewels from './jewelAndStone';

describe('Jewels and Stones', () => {
  test('Should return correct value', () => {
    expect(findJewels('aA', 'aAAbbbb')).toBe(3);
  });
});
