/**
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate = numsOrig => {
  let prev = null;
  const nums = numsOrig.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] === prev) {
      return nums[i];
    }
    prev = nums[i];
  }

  return null;
};

export default findDuplicate;
