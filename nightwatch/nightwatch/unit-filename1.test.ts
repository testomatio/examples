import { assert } from "nightwatch";


it('test inside a file @T5a545278', function () {
  assert.ok(true);
});

describe('suite name for positive tests', function () {
  this.tags = ['demo'];

  it('test inside a suite @T85167c7a', function () {
    assert.ok(true);
  });

  describe('nested suite name', function () {
    it('test inside nested suite @T63699dc1', function () {
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

