/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
const corpFlightBookings = (bookings, n) => {
  const result = new Array(n);
  result.fill(0, 0, n);
  for (const booking of bookings) {
    const [i, j, k] = booking;
    for (let point = i; point <= j; point += 1) {
      result[point - 1] = result[point - 1] ? result[point - 1] + k : k;
    }
  }

  return result;
};

export default corpFlightBookings;
