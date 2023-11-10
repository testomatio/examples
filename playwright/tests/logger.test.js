import { test } from '@playwright/test';
import { logger, log } from '@testomatio/reporter';

logger.configure({
  level: 'info',
  prettyObjects: true,
});

test.describe('Logger', () => {
  test(`logger`, async () => {
    logger.warn('testomatio logger warn message');
    console.log('console log message');


  });

  test(`simple log`, async () => {
    log`This is log message`;
  });
});
