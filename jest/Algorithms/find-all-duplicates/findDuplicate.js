const findDuplicate = array => {
  const map = {};
  return array.filter((number, index) => {
    if (map[number] === undefined) {
      map[number] = index;
      return false;
    }
    return true;
  });
};

export default findDuplicate;
