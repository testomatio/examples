const largestNumber = numbers => {
  const alphabeticalCompare = (a, b) => (`${a}${b}` > `${b}${a}` ? -1 : 1);
  const alphabeticallySorted = numbers.sort(alphabeticalCompare);
  let result = alphabeticallySorted.join('');
  if (result < '1') {
    result = '0';
  }
  return result;
};

export default largestNumber;
