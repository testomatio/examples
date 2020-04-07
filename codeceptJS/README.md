This repo contains tests for TodoMVC application.
Tests can be executed via different backends.


# Installation

This is a playground for your first steps in testing, so instead of installing it from NPM it is recommended to clone it from repo instead.

1. Clone this repository.
2. Install ALL dependencies:

```
npm i
```

This will install codeceptjs with puppeteer, webdriverio & testcafe packages. 

# Running Tests

## Puppeteer

Use `codecept.conf.js` to run tests with Puppeteer:

```
npx codeceptjs run --steps 
```

Run tests in headless mode:

```
HEADLESS=true npx codeceptjs run --steps 
```

Run tests in parallel with 3 workers (headless mode):

```
HEADLESS=true npx codeceptjs run-workers 3 
```
