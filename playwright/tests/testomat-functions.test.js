import { test } from '@playwright/test';
import testomat from '@testomatio/reporter';

test.describe('Testomat functions @Se31218e3', () => {
  test('artifact @T64346bdd', async () => {
    testomat.artifact('artifacts/artifact-test-image.png');
  });

  test('testomat log @T917de9d8', async () => {
    testomat.log`This is log message`;
  });
});
