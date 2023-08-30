import { logger } from '@testomatio/reporter';

describe('Looger test 2 @Sdcf9db34', function () {
  it('logs should be added to the testomatio report 2 @Tf2418f0e', async function () {
    console.log('this is 2nd console log message from Jest');
    logger.warn('this is 2nd logger warn message from Jest');
  });
});
