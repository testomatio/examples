import { PlaywrightTestConfig } from '@playwright/test';

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: 'node ./e2e-tests/server',
    port: 4345,
    cwd: __dirname,
  },
  testMatch: '*e2e-tests/*.spec.ts',
  reporter: [
    ['list'],
    ['@testomatio/reporter/lib/adapter/playwright.js', {
      apiKey: process.env.TESTOMATIO,
    }]
  ]
};
export default config;
