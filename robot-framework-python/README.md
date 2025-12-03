# Library Management System

A comprehensive library management system for testing Robot Framework integration with Testomat.io

## Installation
```bash
pip install robot-framework-reporter
```

## Running Tests
```bash
# Run all tests
robot tests/

# Run specific test suite
robot tests/test_book_management.robot
robot tests/test_borrowing.robot

# Run tests with specific tags
robot --include positive tests/
robot --include borrow tests/
robot --include fine tests/
```
## Load Tests To Testomat.io
1. Create empty project in Testomat.io
2. Obtain API key from Testomat.io
```bash
robot --listener reporter.listener.ImportListener tests/
```

## Reporting Tests To Testomat.io
```bash
robot --listener reporter.listener.ReportListener tests/
```
