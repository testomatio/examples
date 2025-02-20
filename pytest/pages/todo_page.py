from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

class TodoPage:
    """Page object for Todo MVC application."""
    
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://todomvc.com/examples/react/dist/"
        
        # Locators
        self.TODO_INPUT = "input.new-todo"
        self.TODO_ITEMS = "ul.todo-list li"
        self.TOGGLE_CHECKBOX = "input.toggle"
        self.DESTROY_BUTTON = ".destroy"
        
    def navigate(self) -> None:
        """Navigate to the TodoMVC application."""
        self.driver.get(self.url)

    def add_todo(self, todo_text: str) -> None:
        """
        Add a new todo item.
        
        Args:
            todo_text (str): Text of the todo item
        """
        input_element = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, self.TODO_INPUT))
        )
        input_element.send_keys(todo_text)
        input_element.send_keys(Keys.RETURN)

    def get_todo_count(self) -> int:
        """Get the number of todo items."""
        items = self.driver.find_elements(By.CSS_SELECTOR, self.TODO_ITEMS)
        return len(items)

    def toggle_todo(self, index: int = 0) -> None:
        """
        Toggle the completion status of a todo item.
        
        Args:
            index (int): Index of the todo item
        
        Raises:
            Exception: If todo item or checkbox not found
        """
        items = WebDriverWait(self.driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, self.TODO_ITEMS))
        )
        
        if not items or index >= len(items):
            raise Exception("Todo item not found")
            
        checkbox = items[index].find_element(By.CSS_SELECTOR, self.TOGGLE_CHECKBOX)
        if not checkbox:
            raise Exception("Checkbox not found")
            
        checkbox.click()

    def delete_todo(self, index: int) -> None:
        """
        Delete a todo item.
        
        Args:
            index (int): Index of the todo item to delete
        """
        items = WebDriverWait(self.driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, self.TODO_ITEMS))
        )
        
        todo_item = items[index]
        
        # Hover over item to make delete button visible
        from selenium.webdriver.common.action_chains import ActionChains
        actions = ActionChains(self.driver)
        actions.move_to_element(todo_item).perform()
        
        # Wait for and click delete button
        delete_button = WebDriverWait(todo_item, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, self.DESTROY_BUTTON))
        )
        delete_button.click()
