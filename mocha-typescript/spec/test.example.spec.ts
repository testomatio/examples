import { expect } from 'chai';

describe('Simple Mocha + TypeScript example.', () => {
  before(() => {
    console.log('Running before hook');
    // You can add any code here...
  })
  beforeEach(() => {
    console.log('Running beforeEach hook');
    // You can add any code here...
  })

  it('[Positive case]: Should be true.', () => {
    console.log('Running test 1');
    expect(true).to.equal(true);
  })
  it.skip('[Positive case]: Should be skipped.', () => {
    console.log('Running test 2');
    expect(true).to.equal(true);
  })

  afterEach(() => {
    console.log('Running afterEach hook');
    // You can add any code here...
  })

  after(() => {
    console.log('Running afterEach hook');
    // You can add any code here...
  })
})
