import { describe, expect, it, vi } from 'vitest';

function getRandomNumber(): number {
  return Math.floor(Math.random() * 100);
}

function isNumberEven(): boolean {
  const num = getRandomNumber();
  return num % 2 === 0;
}

describe('isNumberEven', () => {
  it('should return true if the random number is even', () => {
    const mockGetRandomNumber = vi.fn(() => 4);
    vi.stubGlobal('getRandomNumber', mockGetRandomNumber);

    const result = isNumberEven();
    expect(result).toBe(true);

    vi.restoreAllMocks();
  });

  it('should return false if the random number is odd', () => {
    const mockGetRandomNumber = vi.fn(() => 3);
    vi.stubGlobal('getRandomNumber', mockGetRandomNumber);

    const result = isNumberEven();
    expect(result).toBe(false);

    vi.restoreAllMocks();
  });
});
