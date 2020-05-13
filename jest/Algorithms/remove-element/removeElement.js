const removeElement = function (nums, val) {
  let length = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] !== val) {
      length += 1;
      nums[length - 1] = nums[i];
    }
  }

  return length;
};

export default removeElement;
