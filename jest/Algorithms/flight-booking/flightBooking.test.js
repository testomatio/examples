import flightBooking from './flightBooking';

describe('Minimum Path Sum', () => {
  test('It should return correct value', () => {
    expect(flightBooking([[1, 2, 10], [2, 3, 20], [2, 5, 25]], 5))
      .toStrictEqual([10, 55, 45, 25, 25]);
  });
});
