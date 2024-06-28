import { describe, it, expect } from 'vitest';

async function delayedHello(name: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Hello, ${name}!`);
    }, 1000);
  });
}

describe('delayedHello', () => {
  it('should return a greeting message after a delay', async () => {
    const result = await delayedHello('Alice');
    expect(result).toBe('Hello, Alice!');
  });
});
