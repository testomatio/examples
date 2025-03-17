package com.example.demo;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class TodoPage {
    
    private final WebDriver driver;
    private final WebDriverWait wait;
    private final Actions actions;
    
    // Locators for React version of TodoMVC
    private final By newTodoInput = By.className("new-todo");
    private final By todoItems = By.cssSelector(".todo-list li");
    private final By todoItemLabel = By.tagName("label");
    private final By todoItemToggle = By.className("toggle");
    private final By todoItemDeleteButton = By.className("destroy");
    private final By clearCompletedButton = By.className("clear-completed");
    private final By todoCount = By.className("todo-count");
    
    public TodoPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        this.actions = new Actions(driver);
    }
    
    public void navigateTo(String url) {
        driver.get(url);
        // Wait until the page is fully loaded
        wait.until(webDriver -> ((JavascriptExecutor) webDriver)
                .executeScript("return document.readyState").equals("complete"));
        
        // Additional pause for stability
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // Output URL for debugging
        System.out.println("Current URL: " + driver.getCurrentUrl());
        
        // Check for the presence of main elements on the page
        try {
            boolean inputExists = !driver.findElements(newTodoInput).isEmpty();
            System.out.println("Input field found: " + inputExists);
        } catch (Exception e) {
            System.out.println("Error checking elements: " + e.getMessage());
        }
    }
    
    public void addTodo(String todoText) {
        try {
            // Wait until the element is visible and clickable
            WebElement input = wait.until(ExpectedConditions.presenceOfElementLocated(newTodoInput));
            
            // Use JavaScript to focus on the element
            ((JavascriptExecutor) driver).executeScript("arguments[0].focus();", input);
            
            // Clear the input field
            input.clear();
            
            // Enter text and press Enter using Actions
            actions.sendKeys(input, todoText).sendKeys(Keys.ENTER).perform();
            
            // Small pause for stability
            Thread.sleep(500);
            
            System.out.println("Task added: " + todoText);
        } catch (Exception e) {
            System.out.println("Error adding task: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public List<WebElement> getTodoItems() {
        try {
            // Check for elements before waiting
            if (!driver.findElements(todoItems).isEmpty()) {
                // Wait until elements appear on the page
                wait.until(ExpectedConditions.presenceOfElementLocated(todoItems));
                List<WebElement> items = driver.findElements(todoItems);
                System.out.println("Tasks found: " + items.size());
                return items;
            } else {
                System.out.println("Task list is empty");
                return driver.findElements(todoItems);
            }
        } catch (Exception e) {
            System.out.println("Error getting task list: " + e.getMessage());
            return driver.findElements(todoItems);
        }
    }
    
    public String getTodoText(WebElement todoItem) {
        try {
            return todoItem.findElement(todoItemLabel).getText();
        } catch (Exception e) {
            System.out.println("Error getting task text: " + e.getMessage());
            return "";
        }
    }
    
    public void toggleTodo(int index) {
        try {
            List<WebElement> items = getTodoItems();
            if (index < items.size()) {
                WebElement item = items.get(index);
                WebElement toggle = item.findElement(todoItemToggle);
                
                // Use JavaScript for clicking
                ((JavascriptExecutor) driver).executeScript("arguments[0].click();", toggle);
                
                // Small pause for stability
                Thread.sleep(500);
                
                System.out.println("Toggled status of task with index: " + index);
            } else {
                System.out.println("Task index out of range: " + index);
            }
        } catch (Exception e) {
            System.out.println("Error toggling task status: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public void deleteTodo(int index) {
        try {
            List<WebElement> items = getTodoItems();
            if (index < items.size()) {
                WebElement item = items.get(index);
                
                // Hover over the element to make the delete button visible
                actions.moveToElement(item).perform();
                
                // Find the delete button
                WebElement deleteButton = item.findElement(todoItemDeleteButton);
                
                // Use JavaScript for clicking
                ((JavascriptExecutor) driver).executeScript("arguments[0].click();", deleteButton);
                
                // Small pause for stability
                Thread.sleep(500);
                
                System.out.println("Deleted task with index: " + index);
            } else {
                System.out.println("Task index out of range: " + index);
            }
        } catch (Exception e) {
            System.out.println("Error deleting task: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public void clearCompleted() {
        try {
            if (!driver.findElements(clearCompletedButton).isEmpty()) {
                WebElement clearButton = driver.findElement(clearCompletedButton);
                clearButton.click();
                System.out.println("Completed tasks cleared");
            } else {
                System.out.println("'Clear completed' button not found");
            }
        } catch (Exception e) {
            System.out.println("Error clearing completed tasks: " + e.getMessage());
        }
    }
    
    public int getRemainingCount() {
        try {
            if (!driver.findElements(todoCount).isEmpty()) {
                String countText = driver.findElement(todoCount).getText();
                int count = Integer.parseInt(countText.replaceAll("[^0-9]", ""));
                System.out.println("Number of remaining tasks: " + count);
                return count;
            } else {
                System.out.println("Task counter not found");
                return 0;
            }
        } catch (Exception e) {
            System.out.println("Error getting remaining task count: " + e.getMessage());
            return 0;
        }
    }
    
    public boolean isTodoCompleted(int index) {
        try {
            List<WebElement> items = getTodoItems();
            if (index < items.size()) {
                boolean isCompleted = items.get(index).getAttribute("class").contains("completed");
                System.out.println("Task with index " + index + " is completed: " + isCompleted);
                return isCompleted;
            } else {
                System.out.println("Task index out of range: " + index);
                return false;
            }
        } catch (Exception e) {
            System.out.println("Error checking task status: " + e.getMessage());
            return false;
        }
    }
} 