# Cypress

This repo contains tests for **Cypress.io test application** with [Testomat.io](https://testomat.io/) plugins.

## Installation

This is a playground for your first steps in testing, so instead of installing it from [NPM](https://www.npmjs.com/) it is recommended to clone it from repo instead.

```bash
git clone git@github.com:testomatio/examples.git && cd examples/cypress
```

Install dependencies.
```bash
npm i
```

## Usage

## Loading Tests

1. Create empty project in [Testomat.io](https://testomat.io/).
2. Obtain `{API_KEY}` from [Testomat.io](https://testomat.io/).
2. Run `npx check-tests` to upload tests data into testomat.io. Pass `{API_KEY}` as `TESTOMATIO` environment variable:

```bash
TESTOMATIO={API_KEY} npx check-tests cypress "**/**.spec.js" -d cypress/**
```
> **Environment variables** It is recommended to store Testomatio `{API_KEY}` as environment variable and never save it in the source code. Set them directly when running tests or use [dotenv](https://www.npmjs.com/package/dotenv) package to save environment variable in a file and load them for tests. 

## Publishing Test Results

```bash
TESTOMATIO={API_KEY} npx cypress run
```