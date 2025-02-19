export function maybeFail(probability: number = 0.3): void {
  if (Math.random() < probability) {
    const errors = [
      'Random network error occurred',
      'Unexpected null reference encountered',
      'Data validation error: invalid input',
      'Timeout while waiting for element',
      'Unknown error in processing request'
    ];
    const error = errors[Math.floor(Math.random() * errors.length)];
    throw new Error(error);
  }
}
