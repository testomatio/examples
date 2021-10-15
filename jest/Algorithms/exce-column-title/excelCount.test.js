import convertToTitle from './excelColumnTitle';

describe('Convert Excel title @S2d4e9c53', () => {
  test('Should convert number to excel title @T7a370885', () => {
    expect(convertToTitle(1)).toBe('A');
    expect(convertToTitle(2)).toBe('B');
    expect(convertToTitle(28)).toBe('AB');
    expect(convertToTitle(701)).toBe('ZY');
    expect(convertToTitle(703)).toBe('AAA');

  });
});
