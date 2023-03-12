### Example project for newman-reporter-testomatio

This is example project for [newman-reporter-testomatio](https://www.npmjs.com/package/newman-reporter-testomatio) package usage.

# Usage

### Running in this project
1. Install modules:
\
`npm i`

2. Run tests
- `TESTOMATIO=<token> npm run test`
- `TESTOMATIO=<token> npm run test:fail`


### Running in **your** project
1. Install package
\
`npm i newman-reporter-testomatio`

2. Run collection and specify `testomatio` as reporter:
\
`TESTOMATIO=<token> npx newman run <collection_name> -e <environment> -r testomatio `
\
> -e (environment) is optional param; others are required

Examples:
\
`TESTOMATIO=<token> npx newman run collection.json -e env.json -r testomatio`
\
`TESTOMATIO=<token> npx newman run collection_fail.json -e env.json -r testomatio`

> No need to pass `TESTOMATIO_CREATE=1`. This param is already set by default when using `newman-reporter-testomatio`.

## Troubleshoting
### If you got an error running your collection, read next
\
`newman` and `newman-reporter-testomatio` should be installed in the same directory.
- If you run your tests using **globally** installed newman (`newman run ...`):
\
intall `newman-reporter-testomatio` globally too (`npm i newman-reporter-testomatio -g`).
- If you use **locally** installed newman (within the project) (`npx newman run ...`):
\
Follow default flow – just `npm i`

You can verify installed packages via `npm list` or `npm list -g`
