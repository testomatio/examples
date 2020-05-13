const twoSum = (numbers, target) => {
  const map = {};
  for (let i = 0; i < numbers.length; i += 1) {
    if (map[target - numbers[i]] !== undefined) {
      return [map[target - numbers[i]] + 1, i + 1];
    }
    map[numbers[i]] = i;
  }
  return null;
};

export default twoSum;
