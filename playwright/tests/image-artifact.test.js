import { test, expect } from '@playwright/test';
import testomat from '@testomatio/reporter';

test.describe('upload artifact 2', () => {
  test('upload image', async () => {
    testomat.artifact('artifacts/artifact-test-image.png');

    expect(false).toBe(true);
  });
});