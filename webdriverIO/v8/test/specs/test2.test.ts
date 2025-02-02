import { expect } from '@wdio/globals'

function sum(a: number, b: number): number {
  return a + b;
}

describe('Function test', () => {
  it('1+2', async () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('3+4', async () => {
    expect(sum(3, 4)).toBe(7);
  });

  it('5+6', async () => {
    expect(sum(5, 6)).toBe(11);
  });
})
