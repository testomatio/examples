/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = nums => {
  let count = 0;
  let prev = -1;
  let len = 0;
  for (const [i, num] of Object.entries(nums)) {
    len += 1;
    if (prev === num) {
      count += 1;
    } else {
      count = 0;
    }
    if (count > 1) {
      len -= 1;
      nums.splice(len, 1);
      nums.push(num);
    }
    prev = num;
  }

  return len;
};

export default removeDuplicates;
