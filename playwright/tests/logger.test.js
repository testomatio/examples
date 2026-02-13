import { test } from '@playwright/test';
import { logger, log } from '@testomatio/reporter';

logger.configure({
  level: 'info',
  prettyObjects: true,
});

test.describe('Logger @S5a1a655a', () => {
  test(`logger @T1aec9398`, async () => {
    logger.warn('testomatio logger warn message');
    console.log('console log message');


  });

  test(`simple log @Td5ca7452`, async () => {
    log`This is log message`;
  });
});
