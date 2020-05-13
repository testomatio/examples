const convertToGoatLatin = string => {
  const strings = string.split(' ');
  let endString = 'a';

  return strings.reduce((acc, currentString) => {
    if ('aeiouAEIOU'.includes(currentString[0])) {
      acc.push(`${currentString}ma${endString}`);
    } else {
      const modifiedString = currentString.slice(1, currentString.length) + currentString[0];
      acc.push(`${modifiedString}ma${endString}`);
    }
    endString += 'a';

    return acc;
  }, []).join(' ');
};

export default convertToGoatLatin;
