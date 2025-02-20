import pytest
import pytest_html
from selenium.common.exceptions import WebDriverException

@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()

    if report.when == "call":
        driver = None
        for fixture_name in item.funcargs:
            if fixture_name == "driver":
                driver = item.funcargs[fixture_name]
            elif hasattr(item.funcargs[fixture_name], "driver"):
                driver = item.funcargs[fixture_name].driver

        if driver is not None:
            try:
                screenshot = driver.get_screenshot_as_base64()
                if not hasattr(report, "extras"):
                    report.extras = []
                report.extras.append(pytest_html.extras.image(screenshot, "Screenshot"))
            except WebDriverException:
                print("Failed to take screenshot")
