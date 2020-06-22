import findJewels from './jewelAndStone';

describe('Jewels and Stones', () => {
  test('Should return jewels from jewels and stones', () => {
    expect(findJewels('aA', 'aAAbbbb')).toBe(3);
  });
});
