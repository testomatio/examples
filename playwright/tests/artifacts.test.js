import { test } from '@playwright/test';
import { testomat } from '@testomatio/reporter';

test(`upload text file @T50c9c7d7`, async ({}, testInfo) => {
  testomat.artifact('artifacts/artifact-test-text.txt');
});

test(`upload image @Tc5c3fc3e`, async () => {
  testomat.artifact({
    path: 'artifacts/artifact-test-image.png',
  });
});
