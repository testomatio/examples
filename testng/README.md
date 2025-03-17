# TestNG Maven Example

A demonstration project for web application test automation using Java, TestNG, and Selenium WebDriver.

## Project Description

This project is an example of test automation for a TODO List web application using the following technologies:

- Java 11
- Maven
- TestNG
- Selenium WebDriver
- WebDriverManager

## Project Structure

```
testng-maven-example/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── example/
│   │               └── demo/
│   │                   └── TodoPage.java
│   └── test/
│       ├── java/
│       │   └── com/
│       │       └── example/
│       │           └── demo/
│       │               ├── BaseTest.java
│       │               └── TodoPageTest.java
│       └── resources/
│           └── testng.xml
└── pom.xml
```

## Functionality

The project demonstrates test automation for the following TODO application features:

1. Adding a new task
2. Marking a task as completed
3. Deleting a task
4. Working with multiple tasks

## Running Tests

To run the tests, execute the following command:

```bash
mvn clean test
```

## Requirements

- Java 11 or higher
- Maven 3.6.0 or higher
- Internet connection (for downloading browser drivers)

## Additional Information

Tests run in Chrome headless mode. To change browser settings, edit the `BaseTest.java` class.

## Future Development

Possible directions for expanding the project:

- Adding Allure reports
- Parallel test execution
- Adding support for other browsers
- Implementing the Page Object Model pattern for more complex applications
- Integration with CI/CD systems 