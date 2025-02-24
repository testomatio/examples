from playwright.sync_api import Page
from typing import List

class TodoPage:
    """Page object for Todo MVC application."""
    
    def __init__(self, page: Page):
        self.page = page
        self.url = "https://todomvc.com/examples/react/dist/"
        
        # Locators
        self.TODO_INPUT = "input.new-todo"
        self.TODO_ITEMS = "ul.todo-list li"
        self.TOGGLE_CHECKBOX = "input.toggle"
        self.DESTROY_BUTTON = ".destroy"
        
    def navigate(self) -> None:
        """Navigate to the TodoMVC application."""
        self.page.goto(self.url, timeout=10000)
        allure.attach(
            self.page.title(), 
            name="Page Title", 
            attachment_type=allure.attachment_type.TEXT
        )

    def add_todo(self, todo_text: str) -> None:
        """
        Add a new todo item.
        
        Args:
            todo_text (str): Text of the todo item
        """
        self.page.fill(self.TODO_INPUT, todo_text)
        self.page.keyboard.press("Enter")

    def get_todo_count(self) -> int:
        """Get the number of todo items."""
        return len(self.page.query_selector_all(self.TODO_ITEMS))

    def toggle_todo(self, index: int = 0) -> None:
        """
        Toggle the completion status of a todo item.
        
        Args:
            index (int): Index of the todo item
        
        Raises:
            Exception: If todo item or checkbox not found
        """
        items = self.page.query_selector_all(self.TODO_ITEMS)
        if not items or index >= len(items):
            raise Exception("Todo item not found")
            
        checkbox = items[index].query_selector(self.TOGGLE_CHECKBOX)
        if not checkbox:
            raise Exception("Checkbox not found")
            
        checkbox.click()

    def delete_todo(self, index: int) -> None:
        """
        Delete a todo item.
        
        Args:
            index (int): Index of the todo item to delete
        """
        todo_item = self.page.locator(self.TODO_ITEMS).nth(index)
        todo_item.wait_for(state="visible")
        
        todo_item.hover()
        
        destroy_button = todo_item.locator(self.DESTROY_BUTTON)
        destroy_button.wait_for(state="visible")
        destroy_button.click()
