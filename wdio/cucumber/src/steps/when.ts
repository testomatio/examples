import { When } from '@cucumber/cucumber';

function addTwoNumbers(a: number, b: number) {
  return a + b;
}

When(
  /I add two numbers (\d+) and (\d+)/,
  addTwoNumbers
);
