This repo contains tests for TodoMVC application.
Tests can be executed via different backends.


# Installation

This is a playground for your first steps in testing, so instead of installing it from NPM it is recommended to clone it from repo instead.

1. Clone this repository.
2. Install ALL dependencies:

```
npm i
```

This will install codeceptjs with puppeteer & reporter


# Publishing Results to Testomat.io

Get API key from a project in Testomat.io and set it as environment variable `TESTOMATIO`:

```
TESTOMATIO={apiKey} npx codeceptjs run --steps --grep "Mark as completed"
```

## Configuration

Testomatio repoter is a plugin and should be enabled in `codecept.conf.js`:

```js
plugins: {
  testomatio: {
    enabled: true,
    require: '@testomatio/reporter/lib/adapter/codecept',
    apiKey: process.env.TESTOMATIO,
  },
},
```