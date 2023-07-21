#!/bin/bash

npx playwright test > test-playwright-results.txt
fail_tests=$(grep -oE '\b[0-9]+\s+failed\b' test-playwright-results.txt | grep -oE '[0-9]+')
echo "Number of failed tests: $fail_tests"
if [ "$fail_tests" -gt 2 ]; then
  echo "More than 2 failed tests. Exiting with error."
  exit 1
else
  exit 0
fi
