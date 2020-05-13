import largestNumber from './largestNumber';

describe('Largest number', () => {
  it('Should pass all test cases', () => {
    expect(largestNumber([10, 2])).toEqual('210');
    expect(largestNumber([3, 30, 34, 5, 9])).toEqual('9534330');
    expect(largestNumber([0, 0])).toEqual('0');
  });
});
