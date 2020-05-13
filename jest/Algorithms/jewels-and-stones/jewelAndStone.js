const findJewels = (jewels, stones) => {
  let result = 0;

  for (const letter of stones) {
    if (jewels.includes(letter)) {
      result += 1;
    }
  }

  return result;
};

export default findJewels;
