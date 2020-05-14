import hello from './sample';

describe('Hello', () => {
  test('Should say hello with passed parameter', () => {
    expect(hello('Koushik')).toBe('Hello Koushik');
  });
});