# Pytest bdd tests example
this repo contains pytest-bdd tests for Shop application with Testomat.io plugins


## Installation

```bash
pip install -r requirements.txt
```

## Loading tests to Testomat.io
1. Create empty project in Testomat.io
2. Obtain API key from Testomat.io
3. Run `npx check-cucumber` to upload tests data into testomat.io. Pass api key as `TESTOMATIO` environment variable:
```bash
TESTOMATIO={apiKey} npx check-cucumber@latest "**/*.feature" --dir features --update-ids
```
## Reporting tests results to Testomat.io:
```bash
TESTOMATIO={apiKey} pytest --testomatio report
```
