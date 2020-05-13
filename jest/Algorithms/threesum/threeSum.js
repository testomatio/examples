const twoSum = (array, target, skipIndex) => {
  const valueMap = {};
  const getMin = (a, b) => a < b ? a : b;
  const acc = [];

  for (let i = 0; i < array.length; i += 1) {
    const current = array[i];
    if (skipIndex !== i) {
      const remaining = target - current;
      if (valueMap[remaining] !== undefined) {
        const indexTotal = i + valueMap[remaining];
        acc[0] = getMin(i, valueMap[remaining]);
        acc[1] = indexTotal - acc[0];
        return acc;
      }
      if (valueMap[current] === undefined) {
        valueMap[current] = i;
      }
    }
  }

  return acc;
};

const threeSum = (array, target) => {
  for (let i = 0; i < array.length; i += 1) {
    const newTarget = target - array[i];
    const twoSUmArray = twoSum(array, newTarget, i);
    if (twoSUmArray.length !== 0) {
      return [i, ...twoSUmArray];
    }
  }
  return null;
};

export default threeSum;
