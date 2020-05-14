const lengthOfLongestSubString = (string) => {
  let result = 0;
  const indexObj = {};
  // eslint-disable-next-line no-confusing-arrow
  const getMax = (a, b) => a > b ? a : b;

  for (let i = 0, start = 0; i < string.length; i += 1) {
    const currentChar = string.charAt(i);
    if (indexObj[currentChar] !== undefined) {
      start = getMax((indexObj[currentChar] + 1), start);
    }
    indexObj[currentChar] = i;
    result = getMax(result, (i - start));
  }

  return result + 1;
};

export default lengthOfLongestSubString;
