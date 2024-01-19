import assert from 'assert';
import { When, Then } from '@cucumber/cucumber';
import { Greeter } from '../../src/index.js';
import testomat, { logger, log } from '@testomatio/reporter';

logger;

When('the greeter says hello', function () {
  this.whatIHeard = new Greeter().sayHello();
});

Then('I should have heard {string}', function (expectedResponse) {
  assert.equal(this.whatIHeard, expectedResponse);
});

When('The logger intercepts console message', function () {
  console.error('This is error message');
  log`This is log message`;
});

Then('log message should be added to report', function () {
  assert.equal(true, true);
});

When('I add the step', function () {
  testomat.step('This is step');
});

Then('step should be added to report', function () {
  assert.equal(true, true);
});

When('I add the artifact', function () {
  testomat.artifact('artifacts/artifact-test-image.png');
});

Then('artifact should be attached to report', function () {
  assert.equal(true, true);
});
