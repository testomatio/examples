const reverse = x => {
  let isNegative = false;
  if (x < 0) {
    isNegative = true;
    x = -x;
  }
  let result = 0;
  while (x > 0) {
    result = (result * 10) + (x % 10);
    x = Math.floor(x / 10);
  }
  if (result > 0x7FFFFFFF) {
    return 0;
  }

  return isNegative ? -result : result;
};

export default reverse;
