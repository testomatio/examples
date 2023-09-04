import { testomatioLogger } from '@testomatio/reporter';
import { expect } from 'chai';

describe("Array", function() {
  let arr;

  beforeEach(function() {
    arr = [1, 2, 3];
  });

  // Test Case 1
  it("should return -1 when the value is not present", function() {
    expect(arr.indexOf(4)).to.equal(-1);
  });

  // Test Case 2
  it("should return the index of the element when it is present", function() {
    expect(arr.indexOf(2)).to.equal(1);
  });

  // Test Case 3
  it("should return the length of the array after adding an element", function() {
    arr.push(4);
    expect(arr.length).to.equal(4);
  });

  it("should fail and return -1 as the value is not present", function() {
    expect(arr.indexOf(4)).to.equal(3);
  });
  
  it.skip("should be skipped", function() {
    arr.push(4);
    expect(arr.length).to.equal(4);
  });  
    
  // Test Case 4
  it("should return the first element of the array", function() {
    expect(arr[0]).to.equal(1);
  });

  // Test Case 5
  it("should return the sum of all elements in the array", function() {
    expect(arr.reduce((a, b) => a + b, 0)).to.equal(6);
  });

  // Test Case 6
  it("should return the last element of the array", function() {
    expect(arr[2]).to.equal(3);
  });

  // Test Case 7
  it("should return a reversed array", function() {
    expect(arr.reverse()).to.deep.equal([3, 2, 1]);
  });

  // Test Case 8
  it("should return the array after removing the first element", function() {
    expect(arr.slice(1)).to.deep.equal([2, 3]);
  });

  // Test Case 9
  it("should return a new array with all elements multiplied by 2", function() {
    expect(arr.map(x => x * 2)).to.deep.equal([2, 4, 6]);
  });

  // Test Case 10
  it("should return a sorted array in ascending order", function() {
    expect([3, 2, 1].sort()).to.deep.equal([1, 2, 3]);
  });


  // Test Case 11
  it("should attach logs", function () {
    console.warn('console warn message');
    testomatioLogger.debug('testomatio logger debug message');
    expect(arr.indexOf(4)).to.equal(-1);
  });
});

