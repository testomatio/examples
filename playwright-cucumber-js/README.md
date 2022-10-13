This repo contains **CucumberJS tests with Playwright** with Testomat.io plugins

# Installation

This is a playground for your first steps in testing, so instead of installing it from NPM it is recommended to clone it from repo instead.

1) Clone this repository

```
git clone git@github.com:testomatio/examples.git && cd examples/playwright-cucumber-js
```

2) Install dependencies via npm:

```
npm i
```

This will install cucumber & Testomat.io reporter

## Loading Tests to Testomat.io

1. Create empty project in Testomat.io
2. Obtain API key from Testomat.io
2. Run `npx check-cucumber` to upload tests data into testomat.io. Pass api key as `TESTOMATIO` environment variable:

```
TESTOMATIO={apiKey} npx check-cucumber -d features
```

> **Environment variables** It is recommended to store Testomatio API Key as environment variable and never save it in the source code. Set them directly when running tests or use [dotenv](https://www.npmjs.com/package/dotenv) package to save environment variable in a file and load them for tests.

## Publishing Test Results to Testomat.io

Get API key from a project in Testomat.io and set it as environment variable `TESTOMATIO`:

```
TESTOMATIO={apiKey} npx cucumber-js
```
