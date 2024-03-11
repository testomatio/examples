import { Then } from '@cucumber/cucumber';

function log(result: number) {
  console.log(result);
}

Then(
    /print result (\d+)/,
    log
);
