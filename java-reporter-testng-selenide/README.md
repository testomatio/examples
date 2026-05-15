# Java reporter integration with TestNG

## Overview

This simple demo shows how Testomat.io Java reporter works in your project.

## Installation

1. Clone the repository

```sh
  git clone https://github.com/testomatio/examples.git
  ```
2. Change the directory

```sh
  cd java-reporter-testng
```
3. Install dependencies with test skip

```sh
  mvn clean install -DskipTests
```


## Configurations

**By default, the library runs with properties default values except `testomatio.api.key` and `testomatio.listening`**

![properties img](img/properties.png)

Add your project API key to the `testomatio.properties` file ad `testomatio.api.key`

## Configure TestNG Before Running

Before running tests, make sure your TestNG suites are configured in the testng.xml file.
Runs test methods in parallel using 7 threads simultaneously.
```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="UI Tests" parallel="methods" thread-count="7">

    <test name="Smoke Tests">
        <classes>
            <class name="tests.InventoryTest"/>
            <class name="tests.LoginTest"/>
            <class name="tests.ProductDetailsTest"/>
        </classes>
    </test>

</suite>
```

## Run

Run tests with

```bash
   mvn test -Dtestomatio.api.key=tstmt_key #if you did not provide it in the `testomatio.properties` file
```

where `tstmt_key` is your Testomat.io key from a particular project.
