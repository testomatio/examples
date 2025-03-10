# Java JUnit + Maven Demo Project

## Overview
This is a demo Java project using JUnit and Maven with an advanced testing setup. It includes:
- **5 test suites** containing **20 diverse tests**
- Random failures in **5-7 tests** to simulate real-world issues
- Use of **Testomat.io reporter** for logs, steps, key-values, and artifacts
- **Artifacts capture** including screenshots and video recordings
- **GitHub Workflow** setup for automated test execution and reporting
- **Comprehensive README** to assist beginners in setting up and running the tests

## Project Structure
```
java-junit-maven-demo/
│── src/
│   ├── main/
│   ├── test/
│   │   ├── suites/
│   │   │   ├── BaseTest.java
│   │   │   ├── UiTestSuite.java
│   │   │   ├── ApiTestSuite.java
│   │   │   ├── PerformanceTestSuite.java
│   │   │   ├── SecurityTestSuite.java
│   │   │   ├── IntegrationTestSuite.java
│   ├── resources/
│── .github/workflows/
│── pom.xml
│── README.md
```

## Test Suites Overview

### 1. UI Test Suite
- Login functionality
- Add to cart
- Search functionality
- Random element not found failures
- Random timeout failures

### 2. API Test Suite
- Create/Read/Update/Delete operations
- Status management
- Random invalid ID failures
- Random invalid status failures

### 3. Performance Test Suite
- Response time measurements
- Concurrent user simulation
- Load testing
- Random slow response failures
- Random high load failures

### 4. Security Test Suite
- SQL injection testing
- XSS attack testing
- Authentication/Authorization
- Rate limiting
- Random security test failures

### 5. Integration Test Suite
- Pet and order flow
- User and order integration
- Status update integration
- Random invalid order flow failures
- Random inventory check failures

## Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- Chrome browser (for UI tests)
- Testomat.io account and API key

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd java-junit-maven-demo
   ```

2. Set up Testomat.io API key:
   ```sh
   # For local development
   export TESTOMAT_API_KEY=your_api_key_here
   
   # For Windows
   set TESTOMAT_API_KEY=your_api_key_here
   ```

3. Install dependencies:
   ```sh
   mvn clean install -U
   ```

4. Run tests locally:
   ```sh
   mvn test
   ```

## Test Execution

### Running All Tests
```sh
mvn test
```

### Running Specific Test Suite
```sh
mvn test -Dtest=UiTestSuite
mvn test -Dtest=ApiTestSuite
mvn test -Dtest=PerformanceTestSuite
mvn test -Dtest=SecurityTestSuite
mvn test -Dtest=IntegrationTestSuite
```

### Running with Different Parameters
```sh
# Run tests with specific browser
mvn test -Dbrowser=chrome

# Run tests with specific environment
mvn test -Denv=staging

# Run tests with specific test type
mvn test -DtestType=ui
```

## Test Reports and Artifacts

### Testomat.io Reports
- Access your Testomat.io dashboard to view:
  - Test execution results
  - Test steps and logs
  - Screenshots and videos
  - Key-value pairs and metadata
  - Test execution timeline

### Local Reports
- Find test reports in `target/surefire-reports/`


## How to add test to the Testomat.io

You should install Testomat.io to your system with npm install -g testomatio, read more [documentation](https://docs.testomat.io/project/runs/reporter/junit/#junit)

### To upload test run to the Testomat.io you should run the following command:

But all depends how setuped your project, adn your pom.xml file. Report can be different. and in few files.
```sh
TESTOMATIO={API_KEY} npx report-xml "target/surefire-reports/*.xml" --java-tests
```
