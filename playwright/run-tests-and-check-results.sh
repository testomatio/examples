#!/bin/bash

npx TESTOMATIO=tstmt_qmj-XjR8NsE8LGdcn_7PSONmm3zj6swJ1g1698341001 TESTOMATIO_URL=https://beta.testomat.io playwright test > test-playwright-results.txt
fail_tests=$(grep -oE '\b[0-9]+\s+failed\b' test-playwright-results.txt | grep -oE '[0-9]+')
echo "Number of failed tests: $fail_tests"
if [ "$fail_tests" -gt 7 ]; then
  echo "More than 7 failed tests. Exiting with error."
  exit 1
else
  exit 0
fi
