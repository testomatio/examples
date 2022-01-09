This repo contains tests for **Cypress.io test application in Gherkin language** with Testomat.io plugins

# Installation

This is a playground for your first steps in testing, so instead of installing it from NPM it is recommended to clone it from repo instead.

1) Clone this repository

```
git clone git@github.com:testomatio/examples.git && cd examples/cypress
```

2) Install dependencies via npm:

```
npm i
```

This will install cypress & Testomat.io reporter

## Loading Tests to Testomat.io

1. Create empty project in Testomat.io
2. Obtain API key from Testomat.io
2. Run `npx check-cucumber` to upload tests data into testomat.io. Pass api key as `TESTOMATIO` environment variable:

```
TESTOMATIO={apiKey} npx check-cucumber@latest "**/*.feature" --dir features 
```
> **Environment variables** It is recommended to store Testomatio API Key as environment variable and never save it in the source code. Set them directly when running tests or use [dotenv](https://www.npmjs.com/package/dotenv) package to save environment variable in a file and load them for tests. 

## Publishing Test Results to Testomat.io

Get API key from a project in Testomat.io:

```
npx cypress run -r ./node_modules/@testomatio/reporter/lib/adapter/mocha.js --reporter-options apiKey={apiKey}
```
