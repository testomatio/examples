package com.example.demo;

import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class UiTestSuite {
    private static final Random random = new Random();
    private static WebDriver driver;
    private static WebDriverWait wait;
    private static Map<String, String> keyValues = new HashMap<>();
    private static Map<String, String> metadata = new HashMap<>();
    private static String screenshotDir;

    @BeforeClass
    public static void setup() {
        // Create directory for screenshots
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        screenshotDir = "test-output/screenshots_" + timestamp;
        new File(screenshotDir).mkdirs();

        // Setup WebDriver
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @AfterClass
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    private void logStep(String message) {
        System.out.println("[TEST] Step: " + message);
    }

    private void logInfo(String message) {
        System.out.println("[TEST] Info: " + message);
    }

    @SuppressWarnings("unused")
    private void logError(String message) {
        System.out.println("[TEST] Error: " + message);
    }

    private void addKeyValue(String key, String value) {
        keyValues.put(key, value);
        System.out.println("[TEST] Key-Value: " + key + " = " + value);
    }

    private void addMetadata(String key, String value) {
        metadata.put(key, value);
        System.out.println("[TEST] Metadata: " + key + " = " + value);
    }

    private void takeScreenshot(String name) {
        try {
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String screenshotPath = screenshotDir + "/" + name + "_" + timestamp + ".png";
            
            File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            Files.copy(screenshot.toPath(), Paths.get(screenshotPath));
            
            logInfo("Screenshot saved: " + screenshotPath);
        } catch (IOException e) {
            logError("Failed to take screenshot: " + e.getMessage());
        }
    }

    @Test
    public void successfulLoginTest() {
        logStep("Starting successful login test");
        
        driver.get("https://petstore.octoperf.com/actions/Account.action?signonForm=");
        addKeyValue("test_type", "ui");
        addMetadata("browser", "chrome");
        
        logStep("Entering login credentials");
        WebElement usernameField = wait.until(ExpectedConditions.presenceOfElementLocated(By.name("username")));
        WebElement passwordField = wait.until(ExpectedConditions.presenceOfElementLocated(By.name("password")));
        
        usernameField.clear();
        usernameField.sendKeys("j2ee");
        passwordField.clear();
        passwordField.sendKeys("j2ee");
        
        logStep("Clicking login button");
        WebElement signonButton = wait.until(ExpectedConditions.elementToBeClickable(By.name("signon")));
        signonButton.click();
        
        logStep("Verifying successful login");
        try {
            WebElement signOutLink = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//a[contains(text(), 'Sign Out')]")));
            Assert.assertTrue(signOutLink.isDisplayed(), "Sign Out link should be visible");
            logInfo("Login successful");
            takeScreenshot("login_success");
        } catch (Exception e) {
            logError("Login verification failed: " + e.getMessage());
            takeScreenshot("login_failure");
            throw e;
        }
    }

    @Test
    public void randomElementNotFoundTest() {
        logStep("Starting random element not found test");
        
        driver.get("https://petstore.octoperf.com/actions/Catalog.action");
        addKeyValue("test_type", "ui_random");
        
        boolean shouldFail = random.nextBoolean();
        logInfo("Random failure probability: " + shouldFail);
        
        if (shouldFail) {
            logStep("Attempting to find non-existent element");
            try {
                wait.until(ExpectedConditions.presenceOfElementLocated(By.id("non_existent_element")));
                Assert.fail("Expected NoSuchElementException but element was found");
            } catch (Exception e) {
                logInfo("Expected exception caught: " + e.getMessage());
            }
        } else {
            logStep("Finding existing element");
            WebElement searchContent = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("SearchContent")));
            Assert.assertTrue(searchContent.isDisplayed(), "Search content should be visible");
        }
        
        takeScreenshot("random_element_result");
    }

    @Test
    public void addToCartTest() {
        logStep("Starting add to cart test");
        
        driver.get("https://petstore.octoperf.com/actions/Catalog.action?viewProduct=&productId=K9-BD-01");
        addKeyValue("test_type", "ui_cart");
        
        logStep("Adding item to cart");
        WebElement addToCartButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[contains(@class, 'Button') and contains(text(), 'Add to Cart')]")));
        addToCartButton.click();
        
        logStep("Verifying item in cart");
        try {
            WebElement cartItem = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//td[contains(text(), 'Bulldog')]")));
            Assert.assertTrue(cartItem.isDisplayed(), "Cart should contain Bulldog");
        } catch (Exception e) {
            logError("Cart verification failed: " + e.getMessage());
            takeScreenshot("cart_failure");
            throw e;
        }
        
        takeScreenshot("cart_result");
    }

    @Test
    public void randomTimeoutTest() {
        logStep("Starting random timeout test");
        
        driver.get("https://petstore.octoperf.com/actions/Catalog.action");
        addKeyValue("test_type", "ui_timeout");
        
        boolean shouldFail = random.nextBoolean();
        logInfo("Random timeout probability: " + shouldFail);
        
        if (shouldFail) {
            logStep("Simulating slow page load");
            try {
                Thread.sleep(15000); // Simulate slow page load
            } catch (InterruptedException e) {
                logError("Sleep interrupted: " + e.getMessage());
            }
        }
        
        logStep("Verifying page load");
        WebElement searchContent = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("SearchContent")));
        Assert.assertTrue(searchContent.isDisplayed(), "Search content should be visible");
        
        takeScreenshot("timeout_result");
    }

    @Test
    public void searchFunctionalityTest() {
        logStep("Starting search functionality test");
        
        driver.get("https://petstore.octoperf.com/actions/Catalog.action");
        addKeyValue("test_type", "ui_search");
        
        logStep("Entering search term");
        WebElement searchField = wait.until(ExpectedConditions.presenceOfElementLocated(By.name("keyword")));
        searchField.clear();
        searchField.sendKeys("dog");
        
        logStep("Clicking search button");
        WebElement searchButton = wait.until(ExpectedConditions.elementToBeClickable(By.name("searchProducts")));
        searchButton.click();
        
        logStep("Verifying search results");
        try {
            // Wait for the page to load and stabilize
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                logError("Sleep interrupted: " + e.getMessage());
            }
            
            // Wait for the search results to appear
            WebElement searchResults = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("Catalog")));
            Assert.assertTrue(searchResults.isDisplayed(), "Search results should be visible");
            
            // Look for any product links that contain 'dog' in their text
            List<WebElement> productLinks = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(
                By.xpath("//a[contains(@href, 'viewProduct') and contains(translate(text(), 'DOG', 'dog'), 'dog')]")));
            
            Assert.assertTrue(!productLinks.isEmpty(), "Should find at least one dog product");
            
            // Log the found products
            logInfo("Found " + productLinks.size() + " dog products");
            for (WebElement link : productLinks) {
                logInfo("Product: " + link.getText());
            }
            
        } catch (Exception e) {
            logError("Search verification failed: " + e.getMessage());
            takeScreenshot("search_failure");
            throw e;
        }
        
        takeScreenshot("search_results");
    }
} 