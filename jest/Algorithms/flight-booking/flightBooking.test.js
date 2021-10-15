import flightBooking from './flightBooking';

describe('Flight booking @S89c94074', () => {
  test('It should book the flight @Td1c4eac4', () => {
    expect(flightBooking([[1, 2, 10], [2, 3, 20], [2, 5, 25]], 5))
      .toStrictEqual([10, 55, 45, 25, 25]);
  });
});
