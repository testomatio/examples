import { test, expect } from '@playwright/test'

test.describe("Suite 1 @Sff5e0016", () => {
  test('Test 1 (10 seconds) @Tbd91a4a2', async () => {
    console.log('Test 1 (10 seconds) started: ' + new Date().toLocaleString());
    // await new Promise(resolve => setTimeout(resolve, 10_000));
    expect(1 + 1).toBe(2)
    console.log('Test 1 (10 seconds) finished: ' + new Date().toLocaleString());
  });
  test('Test 2 (110 seconds) @Tec827edd', async () => {
    console.log('Test 2 (110 seconds) started: ' + new Date().toLocaleString());
    // await new Promise(resolve => setTimeout(resolve, 110_000));
    expect(1 + 1).toBe(2)
    console.log('Test 2 (110 seconds) finished: ' + new Date().toLocaleString());
  });
  test('Test 3 (120 seconds) @T0cbac05e', async () => {
    console.log('Test 3 (120 seconds) started: ' + new Date().toLocaleString());
    // await new Promise(resolve => setTimeout(resolve, 120_000));
    expect(1 + 1).toBe(2)
    console.log('Test 3 (120 seconds) finished: ' + new Date().toLocaleString());
  });
  test('Test 4 (150 seconds) @T96632266', async () => {
    console.log('Test 4 (150 seconds) started: ' + new Date().toLocaleString());
    // await new Promise(resolve => setTimeout(resolve, 150_000));
    expect(1 + 1).toBe(2)
    console.log('Test 4 (150 seconds) finished: ' + new Date().toLocaleString());
  });
});
