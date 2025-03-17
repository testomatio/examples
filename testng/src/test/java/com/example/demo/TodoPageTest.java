package com.example.demo;

import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.util.List;

public class TodoPageTest extends BaseTest {
    
    private TodoPage todoPage;
    private final String TODO_APP_URL = "https://todomvc.com/examples/react/dist/";
    
    @BeforeMethod
    public void setUpPage() {
        todoPage = new TodoPage(driver);
        todoPage.navigateTo(TODO_APP_URL);
        
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    @Test
    public void testAddTodo() {
        // Add a task
        String todoText = "Buy milk";
        todoPage.addTodo(todoText);
        
        // Check that the task is added
        List<WebElement> todoItems = todoPage.getTodoItems();
        Assert.assertEquals(todoItems.size(), 1, "One task should be added");
        Assert.assertEquals(todoPage.getTodoText(todoItems.get(0)), todoText, "Task text should match");
    }
    
    @Test
    public void testToggleTodo() {
        // Add a task
        todoPage.addTodo("Task for toggling");
        
        // Toggle task status
        todoPage.toggleTodo(0);
        
        // Check that the task is marked as completed
        Assert.assertTrue(todoPage.isTodoCompleted(0), "Task should be marked as completed");
    }
    
    @Test
    public void testDeleteTodo() {
        // Add a task
        todoPage.addTodo("Task for deletion");
        
        // Check that the task is added
        Assert.assertEquals(todoPage.getTodoItems().size(), 1, "One task should be added");
        
        // Delete the task
        todoPage.deleteTodo(0);
        
        // Check that the task is deleted
        Assert.assertEquals(todoPage.getTodoItems().size(), 0, "Task should be deleted");
    }
    
    @Test
    public void testMultipleTodos() {
        // Add multiple tasks
        todoPage.addTodo("Task 1");
        todoPage.addTodo("Task 2");
        todoPage.addTodo("Task 3");
        
        // Check that all tasks are added
        List<WebElement> todoItems = todoPage.getTodoItems();
        Assert.assertEquals(todoItems.size(), 3, "Three tasks should be added");
        
        // Mark first and third tasks as completed
        todoPage.toggleTodo(0);
        todoPage.toggleTodo(2);
        
        // Check task statuses
        Assert.assertTrue(todoPage.isTodoCompleted(0), "First task should be marked as completed");
        Assert.assertFalse(todoPage.isTodoCompleted(1), "Second task should not be marked as completed");
        Assert.assertTrue(todoPage.isTodoCompleted(2), "Third task should be marked as completed");
        
        // Check remaining tasks counter
        Assert.assertEquals(todoPage.getRemainingCount(), 1, "One uncompleted task should remain");
    }
} 