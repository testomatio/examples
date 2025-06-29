# Java reporter integration with TestNG

## Overview

This simple demo shows how Testomat.io Java reporter works in your project.

- Includes a pack of 50 tests. Some will fail on purpose and other will be disabled for demo.

## Structure

```

├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── library/
│   │   │           ├── util/
│   │   │           │   └── BookUtils.java
│   │   │           ├── Author.java
│   │   │           ├── Book.java
│   │   │           ├── Genre.java
│   │   │           ├── Library.java
│   │   │           ├── LibraryCard.java
│   │   │           ├── Loan.java
│   │   │           ├── Publisher.java
│   │   │           └── Reader.java
│   │   └── resources/
│   │       └── testomatio.properties
│   └── test/
│       └── java/
│           └── com/
│               └── library/
│                   ├── AuthorTest.java
│                   ├── BookTest.java
│                   ├── BookUtilsTest.java
│                   ├── GenreTest.java
│                   └── LibraryTest.java
├── pom.xml
└── README.md
```

## Installation

1. Clone the repository

```sh
  git clone <repo-url>
  cd java-testng-maven-0.1.0
```

2. Install dependencies (run it in Bash)

```sh
    mvn install:install-file -Dfile=lib/java-reporter-0.1.0.jar -Dversion=0.1.0 -Dpackaging=jar -Dgroup=com.testomatio.reporter -DartifactId=java-reporter
```

```sh
    mvn clean
```

```sh
    mvn install -DskipTests
```

## Configurations

**By default, the library runs with properties default values except `testomatio.api.key`**

You can pass your custom properties as JVM properties, OS env variables or in the `testomatio.properties` file.

The file, if you want to use this approach, must be created int the `main/resources` folder.

The extension will run if you provide `testomatio.api.key` as a property in test run config or `mvn test`

- Optionally, in the `testomatio.properties` file can configure run parameters:

```properties
testomatio.batch.size=5
testomatio.url=https://app.testomat.io/
testomatio.run.title=
testomatio.api.key=
## (OFF, SEVERE, WARNING, INFO, FINE, FINER, FINEST, ALL)
testomatio.log.level=INFO
testomatio.log.file=logs/testomatio.log
testomatio.log.console=true
```

And the default is "Default run title", so you might want to change it.

## Run

Run tests with

```sh 
   mvn test -Dtestomatio.api.key=tstmt_key
```

where `tstmt_key` is your Testomat.io key from a particular project.

As a result, you will see a run report in your Project tab -> Runs on Testomat.io.

<div align="center">
  <img src="img/runReport.png" alt="demo report result png" style="max-width: 70%; max-height: 420px;">
</div>

