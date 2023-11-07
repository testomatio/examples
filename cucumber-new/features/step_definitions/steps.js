import assert from 'assert';
import { When, Then } from '@cucumber/cucumber';
import { Greeter, Testomat } from '../../src/index.js';
import { Logger } from '../../src/index.js';

When('the greeter says hello', function () {
  this.whatIHeard = new Greeter().sayHello();
});

Then('I should have heard {string}', function (expectedResponse) {
  assert.equal(this.whatIHeard, expectedResponse);
});

When('The logger intercepts console message', function () {
  new Logger().intercept(console);
  console.error('This is error message');
});

Then('log message should be added to report', function () {
  assert.equal(true, true);
});

When('I add the step', function () {
  new Testomat().step();
  console.error('This is error message');
});

Then('step should be added to report', function () {
  assert.equal(true, true);
});

When('I add the artifact', function () {
  new Testomat().step();
  console.error('This is error message');
});

Then('artifact should be attached to report', function () {
  assert.equal(true, true);
});

