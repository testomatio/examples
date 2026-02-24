import { PlaywrightTestConfig, devices } from '@playwright/test';
import 'dotenv/config'

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  timeout: 300 * 1000,
  retries: process.env.CI ? 0 : 0,
  fullyParallel: true,
  reporter: [
    ['list'],
    ['json'],
    ['@testomatio/reporter/playwright', {
      apiKey: process.env.TESTOMATIO,
    }]
  ],

  use: {
    trace: 'retain-on-failure',
    contextOptions: {
      ignoreHTTPSErrors: true,
    },

    screenshot: 'on',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ]
};
export default config;
