# Java reporter integration with JUnit5

## Overview

This simple demo shows how Testomat.io Java reporter works in your project.

>NOTE: Some will fail on purpose and other will be disabled for demo.  
---

## Installation

1. Clone the repository

```sh
  git clone https://github.com/testomatio/examples.git
  ```
2. Change the directory
  
```sh
  cd java-reporter-junit
```
3. Install dependencies with test skip

```sh
  mvn clean install -DskipTests ##Skip tests as there are some tests to fail on purpose, but you need to install the dependencies though.
```

For correct handling of tests structure, artifact handling and tests source code importing to the Testomat.io 
you need to sync your tests with Testomat.io server.
It's easy to do with Java-Check-Tests CLI. Now there already is the **testomatio.jar** in the root of the project and you don't need  
to download it. Just run the command:

```bash
    java -jar testomatio.jar sync --apikey=... ##provide your project api key
```
> NOTE: more details about Java-Check-Tests you can find in its [repository](https://github.com/testomatio/java-check-tests)

---
## Configurations

**By default, the reporter runs when Testomat.io api key is provided in any way:**
Reporting can be disabled with property `testomatio.reporting.disable=1`

1. As **ENV_VARIABLE** as `TESTOMATIO`
2. Add your project API key to the **testomatio.properties** file as `testomatio` (in the `src/main/resources/testomatio.properties`)
3. As JVM property on as `-Dtestomatio=...`
>NOTE: JVM property will take precedence over ENV variable, ENV variable will take precedence over property file.  

---
## Artifacts
The reporter supports test artifacts.  
As you can see in the `src/test/java/artifact` folder, there are some tests that produce artifacts.  
The artifacts are passed to the facade method `Testomatio.artifact(String ...)` as path to the file including extensions.  
Artifacts handling is enabled by default and can be disabled with `testomatio.artifact.disable=1` property usage.  
If artifacts are not disabled but there are no artifacts passed to the facade method - it won't affect reporting and is ok to use.  

---
## Run

Run tests with

```bash
   mvn test -Dtestomatio.api.key=tstmt_key #if you did not provide it in any other way
```

where `tstmt_key` is your Testomat.io key from a particular project.

As a result, you will see a run report in your Project tab -> Runs on Testomat.io.

<div>
  <img src="img/runReport.png" alt="demo report result png" style="max-width: 70%; max-height: 420px;">
</div>



