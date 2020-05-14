const checkFromCenter = (string, left, right) => {
  while (left >= 0 && right <= string.length && string.charAt(left) === string.charAt(right)) {
    left -= 1;
    right += 1;
  }

  return right - left - 1;
};

const longestPalindrome = (string) => {
  let start = 0;
  let end = 0;

  for (let i = 0; i < string.length; i += 1) {
    const checkAsOdd = checkFromCenter(string, i, i);
    const checkAsEven = checkFromCenter(string, i, i + 1);
    const length = checkAsOdd > checkAsEven ? checkAsOdd : checkAsEven;
    if (length > end - start) {
      start = i - Math.floor(length / 2);
      end = i + Math.floor(length / 2) + 1;
    }
  }

  return string.substring(start, end);
};

export default longestPalindrome;
