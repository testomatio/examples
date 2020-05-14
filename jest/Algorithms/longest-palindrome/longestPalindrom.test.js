import longestPalindrome from './longestPalindrome';

describe('Should pass all the tests', () => {
  test('Should return largest length of a string', () => {
    expect(longestPalindrome('abba')).toBe('abba');
    expect(longestPalindrome('ababa')).toBe('ababa');
    expect(longestPalindrome('yesadasgh')).toBe('sadas');
  });
});
