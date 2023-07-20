#!/bin/bash

npx codeceptjs run > test-results.txt
fail_tests=$(grep -oE '\b[0-9]+\s+failed\b' test-results.txt | grep -oE '[0-9]+')
echo "Number of failed tests: $fail_tests"
if [ "$fail_tests" -gt 9 ]; then
  echo "More than 9 failed tests. Exiting with error."
  exit 1
else
  exit 0
fi
