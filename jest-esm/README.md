This repo contains tests for Jest application with Testomat.io plugins

# Installation

This is a playground for your first steps in testing, so instead of installing it from NPM it is recommended to clone it from repo instead.

1) Clone this repository

```
git clone git@github.com:testomatio/examples.git && cd examples/jest
```

2) Install dependencies via npm:

```
npm i
```

This will install jest & Testomat.io reporter

## Loading Tests to Testomat.io

1. Create empty project in Testomat.io
2. Obtain API key from Testomat.io
2. Run `npx check-tests` to upload tests data into testomat.io. Pass api key as `TESTOMATIO` environment variable:

```
TESTOMATIO={apiKey} npx check-tests jest "**/*{.,_}test.js"
```

> **Environment variables** It is recommended to store Testomatio API Key as environment variable and never save it in the source code. Set them directly when running tests or use [dotenv](https://www.npmjs.com/package/dotenv) package to save environment variable in a file and load them for tests. 

## Publishing Test Results to Testomat.io

Get API key from a project in Testomat.io and set it as environment variable `TESTOMATIO`:

```
TESTOMATIO={apiKey} npx jest run  -t "Mark as completed"
```

### Configuration

Testomatio reporter is a plugin and should be enabled in `jest.conf.js`:

Do not hard code apiKey and always use it as environment variable.

```js
import dotenv from 'dotenv'
dotenv.config()

export default {
  // ./ is required before the path;
  reporters: [
    'default',
    ['./node_modules/@testomatio/reporter/lib/adapter/jest.js', { apiKey: process.env.TESTOMATIO }],
  ],
  transform: {},
};

```
