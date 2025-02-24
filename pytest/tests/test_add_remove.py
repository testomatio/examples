import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pages.todo_page import TodoPage
from helpers.random_failure import random_failure

class TestAddRemoveSuite:

    @pytest.fixture(autouse=True)
    def setup(self):
        self.driver = webdriver.Chrome()
        self.todo_page = TodoPage(self.driver)
        self.todo_page.navigate()
        yield
        self.driver.quit()

    @pytest.mark.testomatio("@Tad8d8cb5")
    @pytest.mark.tag("Todo")
    @pytest.mark.tag("Functional")
    def test_add_new_todo(self):
        """Test adding a new todo item"""
        self.todo_page.add_todo("Buy groceries")
        todos = self.driver.find_elements(By.CSS_SELECTOR, "ul.todo-list li")
        assert len(todos) > 0

    @pytest.mark.testomatio("@T8af72184")
    @pytest.mark.tag("Todo")
    @pytest.mark.tag("Functional")
    def test_add_multiple_todos(self):
        """Test adding multiple todo items"""
        self.todo_page.add_todo("Walk the dog")
        self.todo_page.add_todo("Write tests")
        todos = self.driver.find_elements(By.CSS_SELECTOR, "ul.todo-list li")
        assert len(todos) >= 2
        random_failure(0.2)

    @pytest.mark.testomatio("@T68902a19")
    @pytest.mark.tag("Todo")
    @pytest.mark.tag("Functional")
    def test_toggle_todo_completed(self):
        """Test toggling todo completion state"""
        self.todo_page.add_todo("Complete assignment")
        todos = self.driver.find_elements(By.CSS_SELECTOR, "ul.todo-list li")
        initial_count = len(todos)
        toggle = self.driver.find_elements(By.CSS_SELECTOR, ".toggle")[initial_count - 1]
        toggle.click()

    @pytest.mark.testomatio("@T7889c041")
    @pytest.mark.tag("Todo")
    @pytest.mark.tag("Functional")
    def test_delete_todo(self):
        """Test deleting a todo item"""
        self.todo_page.add_todo("Delete me")
        todos = self.driver.find_elements(By.CSS_SELECTOR, "ul.todo-list li")
        count_before = len(todos)
        delete_button = self.driver.find_elements(By.CSS_SELECTOR, ".destroy")[count_before - 1]
        delete_button.click()
        todos_after = self.driver.find_elements(By.CSS_SELECTOR, "ul.todo-list li")
        assert len(todos_after) == count_before - 1

    @pytest.mark.testomatio("@T25daead1")
    @pytest.mark.tag("Todo")
    @pytest.mark.tag("Functional")
    def test_clear_completed_todos(self):
        """Test clearing completed todos"""
        self.todo_page.add_todo("Completed task")
        todos = self.driver.find_elements(By.CSS_SELECTOR, "ul.todo-list li")
        toggle = self.driver.find_elements(By.CSS_SELECTOR, ".toggle")[len(todos) - 1]
        toggle.click()
        clear_completed = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button.clear-completed"))
        )
        clear_completed.click()
        random_failure(0.2)
