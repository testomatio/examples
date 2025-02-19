import random
import allure
import os
from datetime import datetime
import pytest
from typing import Optional
from playwright.sync_api import Page

def random_failure(probability: float = 0.2, page: Optional[Page] = None) -> None:
    """
    Simulates a random test failure with specified probability.
    
    Args:
        probability (float): Probability of failure (0.0 to 1.0)
        page (Optional[Page]): Playwright page object for screenshot
    
    Raises:
        Exception: When random failure is triggered
    """
    if not 0 <= probability <= 1:
        raise ValueError("Probability must be between 0 and 1")
        
    if random.random() < probability:
        if page:
            try:
                take_screenshot(page, "random_failure")
            except Exception as e:
                print(f"Failed to take screenshot: {e}")
        
        allure.attach("Simulated failure triggered.", 
                     name="Failure Log", 
                     attachment_type=allure.attachment_type.TEXT)
        raise Exception("Simulated random failure for testing reporting")

def take_screenshot(page: Page, name: str) -> None:
    """
    Takes a screenshot of the current page state.
    
    Args:
        page (Page): Playwright page object
        name (str): Name for the screenshot file
    """
    try:
        screenshot_dir = 'screenshots'
        os.makedirs(screenshot_dir, exist_ok=True)
        
        timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        screenshot_path = os.path.join(os.getcwd(), 
                                     screenshot_dir, 
                                     f'failure_{name}_{timestamp}.png')
        
        # Ensure page is loaded
        page.wait_for_load_state('load')
        
        # Take full page screenshot
        page.screenshot(
            path=screenshot_path,
            full_page=True,
            timeout=5000
        )
        
        # Attach to Allure if file exists
        if os.path.exists(screenshot_path):
            with open(screenshot_path, 'rb') as screenshot_file:
                allure.attach(
                    screenshot_file.read(),
                    name=f"Screenshot_{name}",
                    attachment_type=allure.attachment_type.PNG
                )
            
    except Exception as e:
        print(f"Error taking screenshot: {str(e)}")
        import traceback
        print(f"Traceback:\n{traceback.format_exc()}")
        raise

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item: pytest.Item, call) -> None:
    """
    PyTest hook to take screenshots on test failures.
    """
    outcome = yield
    rep = outcome.get_result()
    
    if rep.when == "call" and rep.failed:
        try:
            page = item.funcargs.get('page')
            if page:
                take_screenshot(page, item.name)
        except Exception as e:
            print(f"Failed to take screenshot in hook: {str(e)}")
