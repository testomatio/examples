import { assert } from "nightwatch";


it('test inside a file', function () {
  assert.ok(true);
});

describe('suite name for positive tests', function () {
  this.tags = ['demo'];

  it('test inside a suite', function () {
    assert.ok(true);
  });

  describe('nested suite name', function () {
    it('test inside nested suite', function () {
      assert.ok(true);
    });
  });

});


describe('suite name for negative tests', function () {

  it.skip('skipped test', function () {
    assert.ok(true);
  });

  it('failed test', function () {
    assert.ok(false);
  });

  it('test throwing an error', function () {
    throw new Error('Test error');
  });
});

