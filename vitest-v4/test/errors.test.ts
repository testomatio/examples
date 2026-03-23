import { describe, expect, it } from 'vitest';

function throwErrorIfNeeded(shouldThrow: boolean): void {
  if (shouldThrow) {
    throw new Error('An error occurred');
  }
}

describe('throwErrorIfNeeded', () => {
  it('should throw an error if shouldThrow is true', () => {
    expect(() => throwErrorIfNeeded(true)).toThrow('An error occurred');
  });

  it('should not throw an error if shouldThrow is false', () => {
    expect(() => throwErrorIfNeeded(false)).not.toThrow();
  });
});
