import { Then } from '@cucumber/cucumber';
import { addTwoNumbers } from './script';
import assert from 'assert';

// result should correspond to the sum of the two numbers
Then(/^return the sum of (\d+) and (\d+) as (\d+)$/, (num1: number, num2: number, result: number) => {
  assert(addTwoNumbers(num1, num2) === result, 'The result is not correct');
});
