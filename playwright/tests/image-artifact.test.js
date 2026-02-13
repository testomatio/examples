import { test, expect } from '@playwright/test';
import testomat from '@testomatio/reporter';

test.describe('upload artifact 2 @S5034889c', () => {
  test('upload image @T47b21888', async () => {
    testomat.artifact('artifacts/artifact-test-image.png');

    expect(false).toBe(true);
  });
});