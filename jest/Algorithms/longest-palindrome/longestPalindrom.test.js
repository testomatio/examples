import longestPalindrome from './longestPalindrome';

describe('Longest palindrome', () => {
  test('Should return largest length of a string that makes a palindrome', () => {
    expect(longestPalindrome('abba')).toBe('abba');
    expect(longestPalindrome('ababa')).toBe('ababa');
    expect(longestPalindrome('yesadasgh')).toBe('sadas');
  });
});
