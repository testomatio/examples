import { test } from '@playwright/test';
import { testomat } from '@testomatio/reporter';

test.describe('upload artifacts 1', () => {
  test.beforeEach(async () => {
    console.log('beforeEach executed');
  });

  test(`upload text file`, async () => {
    testomat.artifact('artifacts/artifact-test-text.txt');
  });

  test(`upload second text file`, async () => {
    testomat.step('step 1 - login');
    testomat.artifact('artifacts/artifact-test-text2.txt');
  });
});
