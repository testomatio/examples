const findContainer = (containerArray) => {
  let resultArea = 0;
  let left = 0;
  let right = containerArray.length - 1;
  const getMax = (a, b) => a > b ? a : b;

  while (left < right) {
    const distance = right - left;
    if (containerArray[left] < containerArray[right]) {
      resultArea = getMax(resultArea, (distance * containerArray[left]));
      left += 1;
    } else {
      resultArea = getMax(resultArea, (distance * containerArray[right]));
      right -= 1;
    }
  }

  return resultArea;
};

export default findContainer;
