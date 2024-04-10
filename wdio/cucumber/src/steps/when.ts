import { When } from '@cucumber/cucumber';
import { addTwoNumbers } from './script';

When(
  /I add two numbers (\d+) and (\d+)/,
  addTwoNumbers
);
