# Karate Testomat.io Integration Example

This example demonstrates how to properly integrate Karate tests with Testomat.io using unique test IDs for Scenario Outline examples.

## Overview

This project contains a simple Karate test that demonstrates:
- Testing the Swagger Petstore API (https://petstore.swagger.io/v2/)
- Proper use of unique `@T...` test IDs in Scenario Outline examples
- Correct integration with Testomat.io for individual test tracking

## Features

### Test Scenarios
1. **Get pet by ID** - Tests retrieving pets with different IDs (existing and non-existing)
2. **Add new pet** - Tests creating new pets with different data

### Unique Test IDs
Each Scenario Outline example has a unique test ID in the format `@T[8 alphanumeric characters]`:
- `T1a2b3c4d`, `T5e6f7g8h`, `T9i0j1k2l` (GET scenarios)
- `Tm3n4o5p6`, `Tq7r8s9t0`, `Tu1v2w3x4` (POST scenarios)

## 🚀 Setup Framework From Scratch (In a Nutshell)

### Quick Setup (5 minutes)

```bash
# 1. Create project directory
mkdir my-karate-project
cd my-karate-project

# 2. Create Maven directory structure
mkdir -p src/test/java/com/example/karate
mkdir -p src/test/resources

# 3. Create pom.xml with Karate dependencies
cat > pom.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>karate-project</artifactId>
    <version>1.0.0</version>
    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <karate.version>1.4.1</karate.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>com.intuit.karate</groupId>
            <artifactId>karate-junit5</artifactId>
            <version>${karate.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <testResources>
            <testResource>
                <directory>src/test/java</directory>
                <excludes><exclude>**/*.java</exclude></excludes>
            </testResource>
        </testResources>
    </build>
</project>
EOF

# 4. Create test runner
cat > src/test/java/com/example/karate/TestRunner.java << 'EOF'
package com.example.karate;
import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestRunner {
    @Test
    void testAll() {
        Results results = Runner.path("classpath:")
                .outputJunitXml(true)
                .parallel(1);
        assertTrue(results.getFailCount() == 0, results.getErrorMessages());
    }
}
EOF

# 5. Create your first .feature file
cat > src/test/resources/sample-test.feature << 'EOF'
Feature: Sample API Test

Background:
  * url 'https://petstore.swagger.io/v2'

Scenario Outline: Get pet - <testCase> @<testId>
  Given path 'pet', <petId>
  When method get
  Then status <expectedStatus>

Examples:
| testCase    | petId | expectedStatus | testId     |
| existing    | 1     | 200           | T1a2b3c4d  |
| nonexistent | 999   | 404           | T5e6f7g8h  |
EOF

# 6. Run your first test
mvn test
```

### That's it! You now have:
✅ Working Karate framework  
✅ Sample API test with unique test IDs  
✅ JUnit XML reports in `target/karate-reports/`  
✅ Ready for Testomat.io integration

### Next Steps
```bash
# Install report-xml tool (if not installed)
npm install -g @testomatio/reporter

# Import to Testomat.io
TESTOMATIO=your_key TESTOMATIO_TITLE_IDS=1 npx report-xml "target/karate-reports/**/*.xml"
```

## Prerequisites

- Java 11+
- Maven 3.6+
- Internet connection (to access Petstore API)
- Node.js (for Testomat.io import)

## Running Tests

### Local Execution

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=KarateTest

# Run with specific Karate options
mvn test -Dkarate.options="--tags @T1a2b3c4d"
```

### Alternative Feature File Execution

```bash
# Run specific feature file directly
mvn test -Dkarate.options="classpath:simple-api-test.feature"
```

## Testomat.io Integration

### 1. Generate JUnit XML Reports

Tests automatically generate JUnit XML reports in `target/karate-reports/` when executed.

### 2. Import to Testomat.io

```bash
# Import test results using unique test IDs
TESTOMATIO=your_project_key TESTOMATIO_TITLE_IDS=1 npx report-xml "target/karate-reports/**/*.xml"
```

### Key Integration Points

- **TESTOMATIO_TITLE_IDS=1**: Ensures Testomat.io uses the `@T...` IDs from scenario titles
- **Unique Test IDs**: Each example in Scenario Outline has a unique `@T...` ID
- **Proper Naming**: Scenario titles include `@<testId>` placeholder

## Project Structure

```
karate-example/
├── pom.xml
├── README.md
└── src/
    └── test/
        ├── java/
        │   └── com/
        │       └── testomat/
        │           └── karate/
        │               └── KarateTest.java
        └── resources/
            └── simple-api-test.feature
```

## API Details

### Swagger Petstore API
- **Base URL**: https://petstore.swagger.io/v2
- **Endpoints Used**:
  - `GET /pet/{petId}` - Retrieve pet by ID
  - `POST /pet` - Add new pet
- **Expected Behavior**:
  - Pet IDs 1-10 typically exist (status 200)
  - Pet ID 999+ typically don't exist (status 404)
  - POST requests create new pets (status 200)

## Test ID Format

Test IDs follow the pattern: `T` + 8 alphanumeric characters
- Must be unique within the project
- Used in scenario titles via `@<testId>` placeholder
- Enables proper test tracking in Testomat.io

## Troubleshooting

### Common Issues

1. **Tests fail due to network**: Ensure internet access to petstore.swagger.io
2. **XML reports not generated**: Check `target/karate-reports/` directory exists
3. **Testomat.io import issues**: Verify `TESTOMATIO_TITLE_IDS=1` is set

### Verification

1. **Run tests successfully**: `mvn test` should show 6 scenarios passed
2. **Check XML reports**: Verify unique test case names contain `@T...` IDs
3. **Testomat.io import**: Each scenario should appear as separate test

## Example Output

When tests run successfully, you should see:
```
6 scenarios (6 passed)
```

JUnit XML will contain entries like:
```xml
<testcase name="Get pet by ID - Pet 1 @T1a2b3c4d" .../>
<testcase name="Get pet by ID - Pet 2 @T5e6f7g8h" .../>
```

This ensures each test appears separately in Testomat.io rather than as retries of the same test.