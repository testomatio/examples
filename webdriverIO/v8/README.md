This repo contains tests for Webdriverio + mocha application with Testomat.io plugins

# Installation

```
npm i
```

This will install wdio cli & Testomat.io reporter

## Loading Tests to Testomat.io

1. Create empty project in Testomat.io
2. Obtain API key from Testomat.io
2. Run `npx check-tests` to upload tests data into testomat.io. Pass api key as `TESTOMATIO` environment variable:

```
TESTOMATIO={apiKey} npx check-tests@latest Mocha "**/*{.,_}{test,spec,cy}.js" 
```

or if you are using TypeScript:

```
TESTOMATIO={apiKey} npx check-tests@latest Mocha "**/*{.,_}{test,spec,cy}.ts" --typescript 
```

> **Environment variables** It is recommended to store Testomatio API Key as environment variable and never save it in the source code. Set them directly when running tests or use [dotenv](https://www.npmjs.com/package/dotenv) package to save environment variable in a file and load them for tests. 

## Publishing Test Results to Testomat.io

Get API key from a project in Testomat.io and set it as environment variable `TESTOMATIO`:

```
TESTOMATIO={apiKey} npx start-test-run -c 'npx wdio wdio.conf.js'
```

of `wdio.conf.ts` if you are using TypeScript


### Configuration

Testomatio reporter is a plugin and should be enabled in `wdio.conf.js`:

Do not hard code apiKey and always use it as environment variable.

```js
const testomatio = require('@testomatio/reporter/lib/adapter/webdriver');
// or import { testomatio } from '@testomatio/reporter/lib/adapter/webdriver'; // if using ES6 modules
// or import testomatio from '@testomatio/reporter/webdriver'; // for Testomatio reporter versions 2.0+

reporters: [
  ...,
  [testomatio, {
    apiKey: ${process.env.TESTOMATIO}
  }]
],
```

### Attaching Test Artifacts

Test artifacts will be uploaded automatically.
For uploading screenshots on failed tests to your report add the following hook to `wdio.conf.js`:

```js
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if (error) {
            browser.takeScreenshot()
        }
    },
```
