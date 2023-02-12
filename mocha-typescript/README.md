This repo contains simple template for testing project with Mocha + TypeScript + Testomat.io plugins.

# Installation
This is a playground for your first steps in testing, so instead of installing it from NPM it is recommended to clone it from repo instead.

1) Clone this repository:

```
git clone git@github.com:testomatio/examples.git && cd examples/mocha-typescript
```
## Requirements:
 **in order to run this project, NodeJS (version 18+) must be installed**


2) Install dependencies via npm:

```
npm i
```

_This will install mocha & typescript env + Testomat.io reporter_

3) Run tests localy without sending report to the Testomat.io:

```
npm tests
```
_(if the tests are completed => you can start setting up the testomat.io reporter)_

## Loading Tests to Testomat.io

1. Create empty project in Testomat.io
2. Obtain API key from Testomat.io
2. Run `npx check-tests` to upload tests data into testomat.io. Pass api key as `TESTOMATIO` environment variable:

```
TESTOMATIO={apiKey} npx check-tests@latest mocha "**/*{.,_}{test,spec}.ts" --typescript -d spec
```

## Publishing Test Results to Testomat.io

1. Get API key from a project in Testomat.io.

2. Create a specific .env file:
> **Environment variables** 
```.env``` file using ```env.example``` as a template
### SET key variable
**(if you don't want to use the TESTOMATIO API key when running testomatIO, then you can store the <API TestomatIO> token in the ```.env``` file (see env.example example))**

3. Run tests and generate reports(Testomat.io):

```
npx mocha
```
OR
```
npm test
```

### reporterOptions additinal options
**In our case, we use multiple reporters: spec & testomatio.**

_!! Pay Attantion on the rpConfgi.js file. Using key-name should be equal path to the testomatio adapter(testomatio/reporter/lib/adapter/mocha.js)._
 Like:
```
testomatioReporterLibAdapterMochaJsReporterOptions
```