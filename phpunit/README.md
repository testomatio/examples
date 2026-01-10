# PHPUnit Example with Testomat.io

This is an example project demonstrating how to integrate PHPUnit tests with Testomat.io using JUnit XML reports.

## 🛠️ Tech Stack

| Tool | Description |
|------|-------------|
| [PHPUnit](https://phpunit.de/) | PHP testing framework |
| [Testomat.io](https://testomat.io/) | Test management system |
| PHP 8.0+ | Programming language |

## Requirements

### Required
- **PHP 8.0 or higher** - For running PHPUnit tests
- **[Composer](https://getcomposer.org)** - PHP package manager for installing dependencies

### Optional (for Testomat.io integration)
- **Testomat.io API Key** - specific to your project

### Installation Instructions

#### Installing PHP

**macOS:**
```bash
# Using Homebrew
brew install php

# Verify installation
php --version
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install php php-mbstring php-xml php-curl

# Verify installation
php --version
```

**Windows:**
- Download PHP from [windows.php.net](https://windows.php.net/download/)
- Or use [XAMPP](https://www.apachefriends.org/) / [WAMP](https://www.wampserver.com/)

#### Installing Composer

**macOS/Linux:**
```bash
# Download and install
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer

# Verify installation
composer --version
```

**Windows:**
- Download installer from [getcomposer.org](https://getcomposer.org/download/)
- Run the installer and follow instructions

#### Installing Node.js

**macOS:**
```bash
# Using Homebrew
brew install node

# Verify installation
node --version
npm --version
```

**Ubuntu/Debian:**
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

**Windows:**
- Download installer from [nodejs.org](https://nodejs.org/)
- Run the installer and follow instructions

## ⚙️ Installation

Clone the examples repository and navigate to the phpunit directory:

```bash
git clone https://github.com/testomatio/examples.git
cd examples/phpunit
```

Install dependencies:

```bash
composer install
```

## 🏃‍♂️ Running Tests

Run all tests:

```bash
./vendor/bin/phpunit
```

Run tests with verbose output:

```bash
./vendor/bin/phpunit --testdox
```

Run specific test file:

```bash
./vendor/bin/phpunit tests/CalculatorTest.php
```

## 📊 Integration with Testomat.io

This project uses the native **Testomat.io PHP Reporter** to report results directly.

### Step 1: Install Reporter

The reporter is included in `composer.json`. If you need to install it manually:

```bash
composer require --dev testomatio/reporter
```

### Step 2: Configure PHPUnit

The reporter is enabled in `phpunit.xml`:

```xml
<listeners>
    <listener class="Testomatio\Reporter\PHPUnit" file="vendor/testomatio/reporter/src/PHPUnit.php" />
</listeners>
```

### Step 3: Run Tests and Report Results

Run tests passing the `TESTOMATIO` environment variable:

```bash
TESTOMATIO={your-api-key} ./vendor/bin/phpunit
```

### Step 4: Import Test Structure

To import test structure into Testomat.io:

```bash
TESTOMATIO={your-api-key} ./vendor/bin/phpunit --list-tests
```
Note: The reporter captures the list of tests and uploads them when the API key is present.

> **Environment Variables**: It is recommended to store the Testomat.io API Key as an environment variable and never save it in source code.

### Note on Data Providers

PHPUnit's data providers create multiple test executions from a single test method. In this example:
- PHPUnit executes **22 tests** (13 test methods with data provider variations)
- JUnit XML report contains all 22 test case entries
- Testomat.io may show fewer tests due to how it parses nested `<testsuite>` elements for data providers

This is expected behavior when using data providers with JUnit XML format. All test results are captured correctly.

## 📝 Test Examples

This project includes:

### CalculatorTest.php
- Basic arithmetic operations (add, subtract, multiply, divide)
- Exception handling (division by zero)
- Data providers for parameterized tests
- Edge cases with negative and decimal numbers

### UserRegistrationTest.php
- Email validation
- Password strength validation
- Username validation with data providers

## 🔄 CI/CD Integration

The project includes a GitHub Actions workflow (`.github/workflows/testomatio.yml`) that:

1. Sets up PHP environment
2. Installs Composer dependencies
3. Runs PHPUnit tests
4. Generates JUnit XML report
5. Uploads results to Testomat.io

To use it, add these secrets to your GitHub repository:
- `TESTOMATIO` - Your Testomat.io API key
- `TESTOMATIO_URL` - Your Testomat.io instance URL (optional)

## 📖 Test Annotations

Tests can be annotated with Testomat.io IDs in docblocks:

```php
/**
 * Test description
 * @testomatio @T123abc
 */
public function testExample(): void
{
    // test code
}
```

## 🧪 Project Structure

```
phpunit/
├── src/
│   └── Calculator.php          # Example class to test
├── tests/
│   ├── CalculatorTest.php     # Unit tests
│   └── UserRegistrationTest.php # Feature tests
├── build/
│   └── logs/
│       └── junit.xml          # Generated test report
├── composer.json              # PHP dependencies
├── phpunit.xml               # PHPUnit configuration
└── README.md                 # This file
```

## 📚 Learn More

- [PHPUnit Documentation](https://docs.phpunit.de/)
- [Testomat.io Documentation](https://docs.testomat.io/)
- [JUnit XML Format](https://llg.cubic.org/docs/junit/)
