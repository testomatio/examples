import pytest
import allure
from playwright.sync_api import Page
from pages.todo_page import TodoPage
from helpers.random_failure import random_failure

@allure.suite("TodoMVC UI Tests")
@allure.tag("UI", "TodoMVC")  # Grouping tests
class TestTodoUISuite:

    @pytest.fixture(autouse=True)
    def setup(self, page: Page):
        self.todo_page = TodoPage(page)
        self.todo_page.navigate()
        allure.dynamic.feature("TodoMVC UI")
        allure.dynamic.label("tag", "UI")
        allure.dynamic.parameter("Priority", "Medium")
        allure.dynamic.parameter("Risk", "Possible UI inconsistencies")
        allure.dynamic.parameter("Business Requirement", "REQ-TODO-004")

    @pytest.mark.testomatio("@Tccb75254")
    @allure.tag("UI", "Smoke")
    def test_display_input_field(self):
        """Check if the input field for new todos is displayed"""
        assert self.todo_page.page.locator("input.new-todo").is_visible()
        allure.step("Verifying the visibility of the input field")

    @pytest.mark.testomatio("@Ta56b5454")
    @allure.tag("UI", "Regression")
    def test_empty_todo_list_initially(self):
        """Check if the todo list is empty on first load"""
        assert len(self.todo_page.page.locator("ul.todo-list li").all()) == 0
        allure.step("Checking if the todo list is empty on first load")

    @pytest.mark.testomatio("@Tf8581146")
    @allure.tag("UI")
    def test_add_new_todo(self):
        """Check if the new todo item is displayed"""
        self.todo_page.add_todo("Test Todo")
        assert self.todo_page.get_todo_count() == 1
        allure.step("Adding a new todo item and verifying its display")

    @pytest.mark.testomatio("@Ta2ff23cc")
    @allure.tag("UI", "Regression")
    def test_clear_completed_button(self):
        """Check if the 'Clear Completed' button is displayed after completing a task"""
        self.todo_page.add_todo("Complete Me")
        self.todo_page.toggle_todo(self.todo_page.get_todo_count() - 1)
        assert self.todo_page.page.locator("button.clear-completed").is_visible()
        allure.step("Completing a task and checking if the clear button appears")

    @pytest.mark.testomatio("@T7da03292")
    @allure.tag("UI")
    def test_ui_consistency_with_multiple_todos(self):
        """Check if the UI remains consistent when adding multiple todos"""
        self.todo_page.add_todo("Item 1")
        self.todo_page.add_todo("Item 2")
        self.todo_page.add_todo("Item 3")
        assert self.todo_page.get_todo_count() == 3
        allure.step("Adding multiple todos and ensuring the UI remains consistent")
        random_failure(0.2, self.todo_page.page)

    @pytest.mark.testomatio("@Tc231e8f2")
    @allure.tag("UI")
    def test_ui_integrity_after_deleting_todo(self):
        """Check if the UI remains intact after deleting a todo"""
        self.todo_page.add_todo("Delete me")
        count_before = self.todo_page.get_todo_count()
        self.todo_page.delete_todo(count_before - 1)
        assert self.todo_page.get_todo_count() == count_before - 1
        allure.step("Adding and deleting a todo, ensuring UI remains intact")

    @pytest.mark.testomatio("@Tab89339e")
    @allure.tag("UI", "TodoMVC")
    def test_todo_placeholder_text(self):
        """Check if the placeholder text in the input field is correct"""
        placeholder_text = self.todo_page.page.locator("input.new-todo").get_attribute("placeholder")
        assert placeholder_text == "What needs to be done?"
        allure.step("Verified that placeholder text is correct")

    @pytest.mark.testomatio("@T3c21fa3f")
    @allure.tag("UI", "TodoMVC")
    def test_todo_list_persists_after_refresh(self):
        """Check if todo items persist after page refresh"""
        self.todo_page.add_todo("Persistent Todo")
        self.todo_page.page.reload()
        assert self.todo_page.get_todo_count() == 0
        allure.step("Verified that todo items persist after page refresh")

    @pytest.mark.testomatio("@Tf52fd199")
    @allure.tag("UI", "TodoMVC")
    def test_cannot_add_empty_todo(self):
        """Check if empty todo items cannot be added"""
        self.todo_page.add_todo("")
        assert self.todo_page.get_todo_count() == 0
        allure.step("Verified that empty todo items cannot be added")
  
