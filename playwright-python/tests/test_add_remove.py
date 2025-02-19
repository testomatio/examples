import pytest
import allure
from playwright.sync_api import Page
from pages.todo_page import TodoPage
from helpers.random_failure import random_failure

@allure.suite("TodoMVC Add/Remove Tests")
class TestAddRemoveSuite:

    @pytest.fixture(autouse=True)
    def setup(self, page: Page):
        self.todo_page = TodoPage(page)
        self.todo_page.navigate()
        allure.dynamic.feature("TodoMVC Add/Remove")

    @pytest.mark.testomatio("@Tf8581146")
    @allure.tag("Todo", "Functional")
    def test_add_new_todo(self):
        """Test adding a new todo item"""
        self.todo_page.add_todo("Buy groceries")
        assert self.todo_page.get_todo_count() > 0
        allure.step("Added new todo and verified list length")

    @pytest.mark.testomatio("@T622661b4")
    @allure.tag("Todo", "Functional") 
    def test_add_multiple_todos(self):
        """Test adding multiple todo items"""
        self.todo_page.add_todo("Walk the dog")
        self.todo_page.add_todo("Write tests")
        assert self.todo_page.get_todo_count() >= 2
        random_failure(0.2)
        allure.step("Added multiple todos")

    @pytest.mark.testomatio("@T068ebcff")
    @allure.tag("Todo", "Functional")
    def test_toggle_todo_completed(self):
        """Test toggling todo completion state"""
        self.todo_page.add_todo("Complete assignment")
        initial_count = self.todo_page.get_todo_count()
        self.todo_page.toggle_todo(initial_count - 1)
        allure.step("Toggled todo item completion state")

    @pytest.mark.testomatio("@T354c4667")
    @allure.tag("Todo", "Functional")
    def test_delete_todo(self):
        """Test deleting a todo item"""
        self.todo_page.add_todo("Delete me")
        count_before = self.todo_page.get_todo_count()
        self.todo_page.delete_todo(count_before - 1)
        assert self.todo_page.get_todo_count() == count_before - 1
        allure.step("Deleted a todo item successfully")

    @pytest.mark.testomatio("@T2b705289")
    @allure.tag("Todo", "Functional")
    def test_clear_completed_todos(self):
        """Test clearing completed todos"""
        self.todo_page.add_todo("Completed task")
        self.todo_page.toggle_todo(self.todo_page.get_todo_count() - 1)
        self.todo_page.page.locator("button.clear-completed").click()
        random_failure(0.2)
        allure.step("Cleared completed todos")
