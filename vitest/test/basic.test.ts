import { describe, expect, it, test } from 'vitest';

describe('suite name', () => {
  describe('nested suite', () => {
    it('test inside nested suite', () => {
      expect(1 + 1).eq(2);
    });
  });

  test('failing test', () => {
    expect(1 + 1).eq(3)
  })
});

test('Test in file @42033b7c', ({ task }) => {
});

test('Test with console.log', ({ task }) => {
});
