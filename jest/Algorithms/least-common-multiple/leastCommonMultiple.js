const leastCommonMultiple = (num1, num2) => {
  if (num1 === 0 || num2 === 0) {
    return 0;
  }
  num1 = num1 < 0 ? -(num1) : num1;
  num2 = num2 < 0 ? -(num2) : num2;
  let i = 1;
  const large = num1 > num2 ? num1 : num2;
  const small = (num1 + num2) - large;
  while (i <= small) {
    if ((large * i) % small === 0) {
      break;
    }
    i += 1;
  }

  return large * i;
};

export default leastCommonMultiple;
