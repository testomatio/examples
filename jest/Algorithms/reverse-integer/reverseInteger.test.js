import reverse from './reverseInteger';

describe('Reverse Integer', () => {
  test('Should return reversed integers for Integers', () => {
    expect(reverse(123)).toBe(321);
    expect(reverse(-123)).toBe(-321);
    expect(reverse(120)).toBe(21);
  });
  test('Should return 0 if it is more than 32 bit', () => {
    expect(reverse(6999999999999999)).toBe(0);
  });
});
