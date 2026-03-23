import { describe, expect, it } from 'vitest';

function getNumberAsync(isPositive: boolean): Promise<number> {
  return new Promise((resolve, reject) => {
    if (isPositive) {
      resolve(42);
    } else {
      reject(new Error('Negative number'));
    }
  });
}

describe('getNumberAsync', () => {
  it('should resolve with 42 if isPositive is true', async () => {
    const result = await getNumberAsync(true);
    expect(result).toBe(42);
  });

  it('should reject with an error if isPositive is false', async () => {
    await expect(getNumberAsync(false)).rejects.toThrow('Negative number');
  });
});
