This repo contains **Playwright tests in TypeScript** with Testomat.io plugins

# Installation

This is a playground for your first steps in testing, so instead of installing it from NPM it is recommended to clone it from repo instead.

1) Clone this repository

```
git clone git@github.com:testomatio/examples.git && cd examples/playwright
```

2) Install dependencies via npm:

```
npm i
```

2.1) Run tests to check if they work (via npm):

```
npm run test:e2e
```

2.2) Run only smoke tests (via npm):

```sh
npm run test:smoke-examples
```

2.3) Run only e2e tests (via npm):

```sh
npm run test:e2e-examples
```

This will install Playwright with puppeteer & Testomat.io reporter

## Loading Tests to Testomat.io

1. Create empty project in Testomat.io
2. Obtain API key from Testomat.io
2. Run `npx check-tests` to upload tests data into testomat.io. Pass api key as `TESTOMATIO` environment variable:

```
TESTOMATIO={apiKey} npx check-tests@latest Playwright "**/*{.,_}{test,spec,cy}.ts" --typescript
```

> **Environment variables** It is recommended to store Testomatio API Key as environment variable and never save it in the source code. Set them directly when running tests or use [dotenv](https://www.npmjs.com/package/dotenv) package to save environment variable in a file and load them for tests.

## Publishing Test Results to Testomat.io (all available tests)

Get API key from a project in Testomat.io and set it as environment variable `TESTOMATIO`:

```
TESTOMATIO={apiKey} npx playwright test
```

_or only smoke tests:_
```
TESTOMATIO={key} npx playwright test --config e2e-examples/playwright-smoke.config.ts
```

### Configuration

Testomatio repoter is enabled in `playwright.config.ts`:

```js
reporter: [
  ['list'],
  ['@testomatio/reporter/lib/adapter/playwright.js', {
    apiKey: process.env.TESTOMATIO,
  }]
],
```

### Pay attention

> [!WARNING]
> Two tests has a "FAIL" status... to fix it, see the instructions in the TODO section in files 
> * => e2e-examples/e2e-tests/1-getting-started.spec.ts
> * => e2e-examples/e2e-tests/2-actions.spec.ts