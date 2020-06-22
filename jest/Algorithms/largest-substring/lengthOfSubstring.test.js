import lengthOfLongestSubString from './lengthOfSubstring';

describe('Length of substring', () => {
  test('Should return largest length of a string', () => {
    expect(lengthOfLongestSubString('koushik')).toBe(6);
    expect(lengthOfLongestSubString('hello')).toBe(3);
    expect(lengthOfLongestSubString('abcabcbb')).toBe(3);
    expect(lengthOfLongestSubString('aabcabcbb')).toBe(3);
    expect(lengthOfLongestSubString('pewwkew')).toBe(3);
    expect(lengthOfLongestSubString('testsetqay')).toBe(6);
  });
});
