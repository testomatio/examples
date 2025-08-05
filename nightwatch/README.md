# Nightwatch test project for Testomat.io

### Install dependencies

`npm install`

### Import Tests

```
TESTOMATIO={apiKey} npx check-tests@latest nightwatch "nightwatch/*.ts" --typescript
````


### Run tests

````
TESTOMATIO={apiKey} npx nightwatch --reporter @testomatio/reporter/nightwatch
```

