# Selenium Python Example

## 🛠️ Tech Stack

| Tool                                                                               | Description                                                                                         |
|------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| [pytestomatio](https://github.com/testomatio/pytestomatio)                     | Pytest plugin for Testomatio                                                                       |
| [assertpy](https://pypi.org/project/assertpy/)                                     | An expressive assertion library for Python                                                          |
| [dataclasses-json](https://pypi.org/project/dataclasses-json/)                     | A library for serialization of dataclasses to and from JSON                                         |
| [deprecated](https://pypi.org/project/deprecated/)                                 | A library for emitting warnings about deprecated code                                               |
| [pytest](https://pypi.org/project/pytest/)                                         | A popular testing framework for Python                                                              |
| [pytest-base-url](https://pypi.org/project/pytest-base-url/)                       | Pytest plugin for setting a base URL for your tests                                                 |
| [pytest-check](https://pypi.org/project/pytest-check/)                             | Provides additional checking functionality for your Pytest tests                                    |
| [pytest-dependency](https://pypi.org/project/pytest-dependency/)                   | Pytest plugin that allows declaring dependencies between tests                                      |
| [pytest-ordering](https://pypi.org/project/pytest-ordering/)                       | Pytest plugin for ordering test functions                                                           |
| [pytest-rerunfailures](https://pypi.org/project/pytest-rerunfailures/)             | Pytest plugin to rerun failed tests automatically                                                   |
| [pytest-split](https://pypi.org/project/pytest-split/)                             | Pytest plugin which splits the test suite to equally sized sub suites based on test execution time. |
| [python-dotenv](https://pypi.org/project/python-dotenv/)                           | Loads environment variables from a .env file, simplifying configuration                             |
| [requests](https://pypi.org/project/requests/)                                     | A versatile library for making HTTP requests in Python                                              |
| [requests-toolbelt](https://pypi.org/project/requests-toolbelt/)                   | Collection of utilities for python-requests                                                         |
| [selenium](https://pypi.org/project/selenium/)                                     | A powerful tool for automating web browsers and conducting web tests                                |
| [tenacity](https://pypi.org/project/tenacity/)                                     | Retrying library                                                                                    |
| [visual-regression-tracker](https://pypi.org/project/visual-regression-tracker/)   | Performs visual regression testing                                                                  |
| [xlrd](https://pypi.org/project/xlrd/)                                             | Library for reading data and formatting information from Excel files                                |

## ⚙️ Setup Instructions

### Clone the project

```bash
git clone https://github.com/nirtal85/Selenium-Python-Example.git
cd selenium-python-example
```

### Create and activate a virtual environment

#### For Windows:
```bash
py -m pip install --user virtualenv
py -m venv .venv
source .venv/Scripts/activate
```

#### For Mac:
```bash
python3 -m pip install --user virtualenv
python3 -m venv venv
source venv/bin/activate
```

### Install Poetry

```bash
pip install poetry
```

### Install Project Dependencies

```bash
poetry install --no-root
```

## 🏃‍♂️ Running Tests

```bash
pytest --driver <firefox/chrome_headless>
```

When no browser was selected then chrome will be used.

* Run according to tags:

```bash
pytest -m <tag_name> --browser <firefox/chrome_headless>
```

## 📊 Viewing Test Results
We have a testomatio dashboard that you can view the results of the tests.

## ℹ️ View Help And Other CLI Options

```bash
pytest --help
```

### Pre Commit

#### Run Pre Commit Checks Automatically

```bash
pre-commit install
pre-commit install --hook-type commit-msg
```

#### Bump Pre Commit Hooks Version

```bash
pre-commit autoupdate
```

#### Run Pre Commit Checks Manually On The Entire Project

```bash
pre-commit run --all-files
```
