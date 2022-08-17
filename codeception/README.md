Testomatio Demo Tests for Codeception.

## Requirements

* PHP 8.0+ with pdo_sqlite extension is required.
* [Composer](https://getcomposer.org) Package Manager

## Installation

Clone this repository:

```
git clone git@github.com:testomatio/examples.git && cd examples/codeception
```

Install dependencies 

```
composer install
```


## Loading Tests to Testomat.io

1. Create empty project in Testomat.io
2. Obtain API key from Testomat.io
2. Run `php vendor/bin/list-tests tests` to upload tests data into testomat.io. Pass api key as `TESTOMATIO` environment variable:

```
TESTOMATIO={apiKey} php vendor/bin/list-tests tests
```

> **Environment variables** It is recommended to store Testomatio API Key as environment variable and never save it in the source code. Set them directly when running tests or within .env file to save environment variable in a file and load them for tests. 

## Publishing Test Results to Testomat.io

Get API key from a project in Testomat.io and set it as environment variable `TESTOMATIO`:

```
TESTOMATIO={apiKey} php vendor/bin/codecept run --ext "Testomatio\Reporter\Codeception"
```
