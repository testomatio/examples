const fizzBuzz = number => {
  const result = [];
  for (let i = 1; i <= number; i += 1) {
    let entry = '';
    if (i % 3 === 0) {
      entry = 'Fizz';
    } if (i % 5 === 0) {
      entry += 'Buzz';
    }
    const data = entry === '' ? i : entry;
    result.push(data.toString());
  }

  return result;
};

export default fizzBuzz;
