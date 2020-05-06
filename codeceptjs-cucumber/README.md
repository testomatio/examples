This repo contains tests for TodoMVC application with Testomat.io plugins

# Installation

This is a playground for your first steps in testing, so instead of installing it from NPM it is recommended to clone it from repo instead.

1) Clone this repository

```
git clone git@github.com:testomatio/examples.git && cd examples/codeceptjs-cucumber
```

2) Install dependencies via npm:

```
npm i
```

This will install codeceptjs+cucumber with puppeteer & Testomat.io reporter

## Loading Tests to Testomat.io

1. Create empty project in Testomat.io
2. Obtain API key from Testomat.io
2. Run `npx check-cucumber -c true` to upload tests data into testomat.io. Pass api key as `TESTOMATIO` environment variable:

```
TESTOMATIO={apiKey} npx check-cucumber -c true -d todomvc-tests
```

## Publishing Test Results to Testomat.io

Get API key from a project in Testomat.io and set it as environment variable `TESTOMATIO`:

```
TESTOMATIO={apiKey} npx codeceptjs run
```

### Configuration

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
