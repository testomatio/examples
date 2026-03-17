# Vitest v4 + Testomatio Reporter Example

Quick smoke project for validating `@testomatio/reporter` on Vitest 4.

## Install

```bash
npm install
```

## Run locally

```bash
npm run test:run
```

## Run with Testomatio reporting

```bash
TESTOMATIO_URL=https://beta.testomat.io TESTOMATIO=<project_api_key> npm run test:run
```

## Notes

- Reporter import must be: `@testomatio/reporter/vitest`
- This project uses Vitest `4.0.18`
- Test set mirrors the main `examples/vitest` scenario for quick regression checks
