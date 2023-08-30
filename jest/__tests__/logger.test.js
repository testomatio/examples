import { logger } from '@testomatio/reporter';

describe('Looger test @S115af7e1', function () {
  it('logs should be added to the testomatio report @T9b799166', async function () {
    console.log('this is console log message from Jest');
    logger.warn('this is logger warn message from Jest');
  });
});
