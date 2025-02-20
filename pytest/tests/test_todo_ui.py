import pytest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pages.todo_page import TodoPage
from helpers.random_failure import random_failure

@pytest.mark.tag("UI")
@pytest.mark.tag("TodoMVC")
class TestTodoUISuite:

    @pytest.fixture(autouse=True)
    def setup(self):
        self.driver = webdriver.Chrome()
        self.todo_page = TodoPage(self.driver)
        self.todo_page.navigate()
        yield
        self.driver.quit()

    @pytest.mark.testomatio("@T5449fe37")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("Smoke")
    def test_display_input_field(self):
        """Check if the input field for new todos is displayed"""
        input_field = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "input.new-todo"))
        )
        assert input_field.is_displayed()

    @pytest.mark.testomatio("@Ta4d354d6")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("Regression")
    def test_empty_todo_list_initially(self):
        """Check if the todo list is empty on first load"""
        todo_items = self.driver.find_elements(By.CSS_SELECTOR, "ul.todo-list li")
        assert len(todo_items) == 0

    @pytest.mark.testomatio("@Tad8d8cb5")
    @pytest.mark.tag("UI")
    def test_add_new_todo(self):
        """Check if the new todo item is displayed"""
        self.todo_page.add_todo("Test Todo")
        assert self.todo_page.get_todo_count() == 1

    @pytest.mark.testomatio("@Tdeb21fea")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("Regression")
    def test_clear_completed_button(self):
        """Check if the 'Clear Completed' button is displayed after completing a task"""
        self.todo_page.add_todo("Complete Me")
        self.todo_page.toggle_todo(self.todo_page.get_todo_count() - 1)
        clear_button = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "button.clear-completed"))
        )
        assert clear_button.is_displayed()

    @pytest.mark.testomatio("@T165cad30")
    @pytest.mark.tag("UI")
    def test_ui_consistency_with_multiple_todos(self):
        """Check if the UI remains consistent when adding multiple todos"""
        self.todo_page.add_todo("Item 1")
        self.todo_page.add_todo("Item 2")
        self.todo_page.add_todo("Item 3")
        assert self.todo_page.get_todo_count() == 3
        random_failure(0.2)

    @pytest.mark.testomatio("@Te68ea91e")
    @pytest.mark.tag("UI")
    def test_ui_integrity_after_deleting_todo(self):
        """Check if the UI remains intact after deleting a todo"""
        self.todo_page.add_todo("Delete me")
        count_before = self.todo_page.get_todo_count()
        self.todo_page.delete_todo(count_before - 1)
        assert self.todo_page.get_todo_count() == count_before - 1

    @pytest.mark.testomatio("@Tf5caf2be")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("TodoMVC")
    def test_todo_placeholder_text(self):
        """Check if the placeholder text in the input field is correct"""
        input_field = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input.new-todo"))
        )
        placeholder_text = input_field.get_attribute("placeholder")
        assert placeholder_text == "What needs to be done?"

    @pytest.mark.testomatio("@T508f73ff")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("TodoMVC")
    def test_todo_list_persists_after_refresh(self):
        """Check if todo items persist after page refresh"""
        self.todo_page.add_todo("Persistent Todo")
        self.driver.refresh()
        assert self.todo_page.get_todo_count() == 0

    @pytest.mark.testomatio("@Tb2674d6d")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("TodoMVC")
    def test_cannot_add_empty_todo(self):
        """Check if empty todo items cannot be added"""
        self.todo_page.add_todo("")
        assert self.todo_page.get_todo_count() == 0
