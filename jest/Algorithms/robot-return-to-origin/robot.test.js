import isReturnToOrigin from './robot';

describe('Robot return to origin', () => {
  test('Should return correct value', () => {
    expect(isReturnToOrigin('UD')).toBe(true);
    expect(isReturnToOrigin('LL')).toBe(false);
  });
});
