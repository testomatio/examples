import { maybeFail } from './helpers/RandomFailureHelper';
import { step, meta } from '@testomatio/reporter'


describe('Random Failure Tests @S4a8c1266', () => {
  beforeEach(() => {
    meta('FEATURE','Random Failures');
    step('Open Random Failures');
  });

  it('random failure test 1 @Random @T8469630b', () => {
    maybeFail(0.5);
    step('Test 1 passed without random failure');
  });

  it('random failure test 2 @Random @T707a4197', () => {
    maybeFail(0.5);
    step('Test 2 passed without random failure');
  });
});
