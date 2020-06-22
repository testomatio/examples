import isReturnToOrigin from './robot';

describe('Robot return to origin', () => {
  test('Should return if robot return to origin', () => {
    expect(isReturnToOrigin('UD')).toBe(true);
    expect(isReturnToOrigin('LL')).toBe(false);
  });
});
