import { logger } from '@testomatio/reporter';

describe('Logger test 2', function () {
  it('logs should be added to the testomatio report 2', async function () {
    console.log('this is 2nd console log message from Jest');
    logger.warn('this is 2nd logger warn message from Jest');
  });
});
