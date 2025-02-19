import sys
import pytest
import random
import os
from typing import Dict
from pytest import StashKey, CollectReport
from playwright.sync_api import Page
import allure
from datetime import datetime
import platform

phase_report_key = StashKey[Dict[str, CollectReport]]()

@pytest.hookimpl(wrapper=True, tryfirst=True)
def pytest_runtest_makereport(item, call):
    rep = yield
    item.stash.setdefault(phase_report_key, {})[rep.when] = rep
    return rep

@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    
    if report.when == "call":
        # Додаємо timestamp
        allure.attach(
            str(datetime.now()),
            name="Timestamp",
            attachment_type=allure.attachment_type.TEXT
        )
        
        # Додаємо результат тесту
        if report.failed:
            allure.attach(
                str(call.excinfo),
                name="Error",
                attachment_type=allure.attachment_type.TEXT
            )

@pytest.fixture(scope="function")
def handle_artifacts(page: Page, request):
    yield
    report = request.node.stash[phase_report_key]
    if ("call" not in report) or report["setup"].failed or report["call"].failed:
        random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=8))

        filename = f"{random_string}.png"
        screenshot_path = os.path.join(artifacts_dir, filename)
        page.screenshot(path=screenshot_path)
        # file_path - required, path to file to be uploaded
        # file_bytes - required, bytes of the file to be uploaded
        # key - required, file name in the s3 bucket
        # bucket_name - optional,name of the bucket to upload file to. Default value is taken from testomat.io
        artifact_url = pytest.testomatio.upload_file(screenshot_path, filename)
        # or
        # artifact_url = pytest.testomatio.upload_file_object(file_bytes, key, bucket_name)
        pytest.testomatio.add_artifacts(request.node, [artifact_url])
    page.close()

# def pytest_runtest_makereport(item, call):
#     artifact_url = pytest.testomatio.upload_file(screenshot_path, filename)
#     pytest.testomatio.add_artifacts([artifact_url])
    
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
