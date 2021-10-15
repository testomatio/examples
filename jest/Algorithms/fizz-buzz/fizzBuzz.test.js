import fizzBuzz from './fizzBuzz';

describe('FizzBuzz @Sa5b47f02', () => {
  test('It should return FizBuzz array @T42aa8d8f', () => {
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
