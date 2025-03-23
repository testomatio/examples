import { assert } from "nightwatch";

describe('suite name for positive tests 2', function () {
  this.tags = ['demo'];

  it('test inside a suite 2', function () {
    assert.ok(true);
    console.log('its fine');
  });
});

describe('suite name for positive tests 2', function () {
  this.tags = ['demo'];

  it('test inside a suite 2', function () {
    assert.ok(true);
  });
});
