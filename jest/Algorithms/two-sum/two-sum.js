const twoSum = (array, target) => {
  const valueMap = {};
  const getMin = (a, b) =>  a < b ? a : b;

  const resultArray = array.reduce((acc, current, i) => {
    const remaining = target - current;
    if (valueMap[remaining] !== undefined) {
      const indexTotal = i + valueMap[remaining];
      acc[0] = getMin(i, valueMap[remaining]);
      acc[1] = indexTotal - acc[0];
    }
    valueMap[current] = i;
    return acc;
  }, []);

  return resultArray;
};

export default twoSum;
