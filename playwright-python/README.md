# 🎭 Playwright Python Example 🎭

This project contains end-to-end tests written in **Python** using **Playwright**. The tests demonstrate advanced usage of the Allure reporter (steps, logs, attachments, custom tags, etc.) and integrate with **Testomat.io** for enhanced reporting, categorization, and CI/CD analytics.

---

## 🚀 Project Description

This project is designed to:

- Validate web applications using the Page Object Model (POM) for maintainability.
- Provide detailed and categorized test reports with custom steps, logs, screenshots, artifacts, and tags.
- Demonstrate integration with Testomat.io for advanced test analytics.
- Ensure fast test execution with minimal timeouts (e.g., under 1 minute) while simulating random test failures to improve error reporting robustness.

---

## 🛠️ Features

- **Page Object Model (POM):** Separates page interactions from test logic.
- **Advanced Reporting:** Utilizes Allure steps, custom labels (e.g., `@Smoke`, `@Regression`, `@Critical`, `@UI`, `@API`), and attachments (screenshots, logs) for detailed test documentation.
- **Random Failure Simulation:** Uses helper functions to inject random failures, allowing you to test the robustness of error reporting.
- **Testomat.io Integration:** Automatically uploads test results via CI/CD pipelines.
- **Fast Execution:** Minimal timeouts (e.g., 5000 ms) ensure all tests complete quickly.

---
## 🛠️ Tech Stack

| Tool                                                                     | Description                                                                                         |
|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| [allure-pytest](https://pypi.org/project/allure-pytest/)                 | Allure reporting with your Pytest tests for better reporting                                        |
| [axe-playwright-python](https://pypi.org/project/axe-playwright-python/) | Python library for running accessibility checks with Playwright                                     |
| [playwright](https://pypi.org/project/playwright/)                       | Python library to automate the Chromium, WebKit, and Firefox browsers through a single API.         |
| [pytest](https://pypi.org/project/pytest/)                               | Popular testing framework for Python                                                                |
| [pytest-base-url](https://pypi.org/project/pytest-base-url/)             | Pytest plugin for setting a base URL for your tests                                                 |
| [pytest-playwright](https://pypi.org/project/pytest-playwright/)         | Pytest plugin for Playwright integration for browser automation testing                             |
| [pytest-split](https://pypi.org/project/pytest-split/)                   | Pytest plugin which splits the test suite to equally sized sub suites based on test execution time. |
| [requests](https://pypi.org/project/requests/)                           | Versatile library for making HTTP requests in Python                                                |

## ⚙️ Setup Instructions

### Clone the project

```bash
git clone https://github.com/nirtal85/Playwright-Python-Example
cd playwright-python
```

### Create and activate a virtual environment

#### For Windows:
```bash
py -m pip install --user virtualenv
py -m venv env
source env/Scripts/activate
```

#### For Mac:
```bash
python3 -m pip install --user virtualenv
python3 -m venv env
source env/bin/activate
```

### Install Poetry

```bash
pip install poetry
```

### Install Project Dependencies

```bash
poetry install --no-root
```

### Install playwright

```bash
playwright install
```

## 🏃‍♂️ Running Tests

```bash
pytest
```

When no browser was selected then chrome will be used.

* Run according to tags:

```bash
pytest -m <tag_name>
```

## 📊 Viewing Test Results

### Install Allure Commandline To View Test results

#### For Windows:

Follow the instructions [here](https://scoop.sh/) to install Scoop.<br>
Run the following command to install Allure using Scoop:

```bash
scoop install allure
```

#### For Mac:

```bash
brew install allure
```

### View Results Locally:

```bash
allure serve allure-results
```
## ℹ️ View Help And Other CLI Options

```bash
pytest --help
```
## ⚙️ Configuration

### Run with Testomat.io Integration

To run tests and automatically upload results to Testomat.io, use the following command:


```bash
TESTOMATIO_PRIVATE_ARTIFACTS=1 TESTOMATIO={YOUR_TESTOMATIO_API_KEY} TESTOMATIO_ENV="windows, Chrome" pytest --testomatio report
```

---

## 📄 Project Structure

```plaintext
├── tests
│   ├── helpers
│   │      └── random_failure_helper.py   # Helper to simulate random test failures
│   ├── pages
│   │      ├── checkout_page.py           # POM for the checkout page
│   │      └── todo_page.py               # POM for the TodoMVC page
│   └── test_cases
│          ├── checkout
│          │      ├── test_form.py        # Checkout form tests
│          │      └── test_ui.py          # Checkout UI tests
│          ├── todo
│          │      ├── test_add_remove.py  # TodoMVC add/remove tests
│          └── test_random_failures.py     # Tests with random failure simulation
├── pytest.ini                            # Pytest configuration file
├── pyproject.toml                        # Project metadata and dependencies
└── README.md                            # Project documentation
```

## 🧪 CI/CD Integration

The project includes a YAML file for CI/CD pipelines (e.g., GitHub Actions) that:

- Installs dependencies.
- Runs WebdriverIO tests.
- Generates the Allure report.
- Uploads results to Testomat.io.

The project includes a GitHub Actions workflow in `.github/workflows/testomatio.yml` that:

- Runs on push/PR to master branch
- Uses Ubuntu 24.04 and Node.js 22
- Executes WebdriverIO tests with Testomat.io integration
- Generates and uploads Allure reports as artifacts
- Configures timeouts and permissions

---

## 📞 Support

If you have any questions or issues, please contact the project maintainer or refer to the [Testomat.io Documentation](https://help.testomat.io/).

---

## 🔗 Useful Links

- [WebdriverIO Documentation](https://webdriver.io/docs/gettingstarted/)
- [Testomat.io Documentation](https://help.testomat.io/)
- [FAQ](https://help.testomat.io/faq)

---

✨ *Testing made simple!*

