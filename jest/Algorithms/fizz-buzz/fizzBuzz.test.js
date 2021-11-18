import fizzBuzz from './fizzBuzz';

describe('FizzBuzz', () => {
  test('It should return FizBuzz array', () => {
    expect(fizzBuzz(15)).toStrictEqual([
      "1",
      "2",
      "Fizz",
      "4",
      "Buzz",
      "Fizz",
      "7",
      "8",
      "Fizz",
      "Buzz",
      "11",
      "Fizz",
      "13",
      "14",
      "FizzBuzz"
    ]);
  });
});
