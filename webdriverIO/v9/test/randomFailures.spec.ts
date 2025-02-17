import { maybeFail } from './helpers/RandomFailureHelper';
import type AllureReporter from '@wdio/allure-reporter';

declare const allure: typeof AllureReporter;

describe('Random Failure Tests @S4a8c1266', () => {
  beforeEach(() => {
    if (typeof allure !== 'undefined') {
      allure.addFeature('Random Failures');
    }
  });

  it('random failure test 1 @Random @T8469630b', () => {
    maybeFail(0.5);
    if (typeof allure !== 'undefined') {
      allure.addStep('Test 1 passed without random failure');
    }
  });

  it('random failure test 2 @Random @T707a4197', () => {
    maybeFail(0.5);
    if (typeof allure !== 'undefined') {
      allure.addStep('Test 2 passed without random failure');
    }
  });
});
