import { test } from '@playwright/test';
import { testomat } from '@testomatio/reporter';

test.describe('Testomat functions', () => {
  test('artifact @T64346bdd', async () => {
    testomat.artifact('artifacts/artifact-test-image.png');
  });

  test('testomat log', async () => {
    testomat.log`This is log message`;
  });
});
