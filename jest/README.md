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
TESTOMATIO={apiKey} npx check-tests jest "**/*{.,_}test.js"  -d Algorithms
```

## Publishing Test Results to Testomat.io

Get API key from a project in Testomat.io and set it as environment variable `TESTOMATIO`:

```
TESTOMATIO={apiKey} npx jest run  -t "Mark as completed"
```

### Configuration

Testomatio reporter is a plugin and should be enabled in `jest.conf.js`:

```js
module.exports = {
  testEnvironment: "node",
  reporters: ['default', ['@testomatio/reporter/lib/adapter/jest.js', { apiKey: process.env.TESTOMATIO }]],
};
```