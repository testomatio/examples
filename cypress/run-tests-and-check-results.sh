#!/bin/bash

npx cypress run > test-cypress-results.txt
fail_tests=$(grep -oE '\b[0-9]+\s+failing\b' test-cypress-results.txt | grep -oE '[0-9]+')
echo "Number of failed tests: $fail_tests"
if [ "$fail_tests" -gt 1 ]; then
  echo "More than 1 failed tests. Exiting with error."
  exit 1
else
  exit 0
fi
