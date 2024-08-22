import { PlaywrightTestConfig } from '@playwright/test';
import 'dotenv/config'

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  testMatch: '*smoke-tests/*.spec.ts',
  reporter: [
    ['list'],
    ['@testomatio/reporter/lib/adapter/playwright.js', {
      apiKey: process.env.TESTOMATIO,
    }]
  ]
};
export default config;
