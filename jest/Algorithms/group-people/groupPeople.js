const groupBySize = groupArray => {
  const result = [];
  const groupMap = {};
  for (const [index, element] of groupArray.entries()) {
    if (groupMap[element] === undefined) {
      groupMap[element] = [index];
    } else {
      groupMap[element].push(index);
    }

    if (groupMap[element].length === element) {
      result.push(groupMap[element]);
      groupMap[element] = undefined;
    }
  }
  return result;
};

export default groupBySize;
