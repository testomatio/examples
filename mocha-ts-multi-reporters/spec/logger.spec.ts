import { logger, log } from '@testomatio/reporter';

describe('Logger test @S2f6e76f8', function () {
  it('logs should be added to the testomatio report @T7f509392', async function () {
    console.log('this is console log message');
    logger.warn('this is logger warn message');
    log`This is log message`
  });
});
