package com.example.demo;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import java.time.Duration;

public class BaseTest {
    
    protected WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        System.out.println("Initializing WebDriver...");
        
        // Initialize WebDriverManager
        WebDriverManager.chromedriver().setup();
        
        // Configure Chrome options
        ChromeOptions options = new ChromeOptions();
        
        // Disable headless mode for debugging
        // options.addArguments("--headless");
        
        // Add necessary options
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--remote-allow-origins=*");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-extensions");
        options.addArguments("--disable-popup-blocking");
        options.addArguments("--disable-notifications");
        
        // Disable browser logs
        options.setExperimentalOption("excludeSwitches", new String[]{"enable-logging"});
        
        System.out.println("Creating ChromeDriver instance...");
        
        // Create ChromeDriver instance with options
        driver = new ChromeDriver(options);
        
        // Configure timeouts
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(3));
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(5));
        driver.manage().timeouts().scriptTimeout(Duration.ofSeconds(3));
        
        // Maximize browser window
        driver.manage().window().maximize();
        
        System.out.println("WebDriver initialized successfully");
    }
    
    @AfterMethod
    public void tearDown() {
        System.out.println("Terminating WebDriver...");
        if (driver != null) {
            driver.quit();
            System.out.println("WebDriver terminated successfully");
        }
    }
} 