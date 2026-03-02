package artifact;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import io.github.bonigarcia.wdm.WebDriverManager;
import io.testomat.core.facade.Testomatio;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

@DisplayName("WebDriver Artifact Generation Tests")
public class WebDriverArtifactTest {

    private WebDriver driver;

    private String artifactDir;

    @BeforeEach
    void setUp() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-gpu");
        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        artifactDir = "target/test-artifacts";
        createArtifactDirectory();
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    @DisplayName("Should create artifacts with WebDriver")
    void shouldCreateArtifactsWithWebDriver() {
        try {
            driver.get("https://www.google.com");
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement searchBox = wait.until(ExpectedConditions.presenceOfElementLocated(By.name("q")));
            assertNotNull(searchBox, "Search box should be present");
            searchBox.sendKeys("Selenium WebDriver");
            searchBox.submit();
            Thread.sleep(2000);
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss"));
            takeScreenshot("search_results_" + timestamp + ".png");
            savePageSource("page_source_" + timestamp + ".html");
            saveTestInfo("test_info.txt");
            String currentTitle = driver.getTitle();
            String currentUrl = driver.getCurrentUrl();
            assertTrue(currentUrl.contains("search"), "URL should contain search results");
            Testomatio.artifact(artifactDir + "/test_info.txt");
        } catch (Exception e) {
            fail("Test failed with exception: " + e.getMessage());
        }
    }

    @Test
    @DisplayName("Should create artifacts with WebDriver")
    void shouldCreateArtifactsWithWebDriver1() {
        try {
            driver.get("https://www.google.com");
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement searchBox = wait.until(ExpectedConditions.presenceOfElementLocated(By.name("q")));
            assertNotNull(searchBox, "Search box should be present");
            searchBox.sendKeys("Selenium WebDriver");
            searchBox.submit();
            Thread.sleep(2000);
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss"));
            takeScreenshot("search_results.png");
            savePageSource("page_source_" + timestamp + ".html");
            saveTestInfo("test_info.txt");
            String currentTitle = driver.getTitle();
            String currentUrl = driver.getCurrentUrl();
            assertTrue(currentUrl.contains("search"), "URL should contain search results");
            Testomatio.artifact(artifactDir + "/test_info.txt", artifactDir + "/search_results.png");
        } catch (Exception e) {
            fail("Test failed with exception: " + e.getMessage());
        }
    }

    @Test
    @DisplayName("Should create artifacts with WebDriver")
    void shouldCreateArtifactsWithWebDriver2() {
        try {
            driver.get("https://www.google.com");
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement searchBox = wait.until(ExpectedConditions.presenceOfElementLocated(By.name("q")));
            assertNotNull(searchBox, "Search box should be present");
            searchBox.sendKeys("Selenium WebDriver");
            searchBox.submit();
            Thread.sleep(2000);
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss"));
            takeScreenshot("search_results_" + timestamp + ".png");
            savePageSource("page_source.html");
            saveTestInfo("test_info.txt");
            String currentTitle = driver.getTitle();
            String currentUrl = driver.getCurrentUrl();
            assertTrue(currentUrl.contains("search"), "URL should contain search results");
            Testomatio.artifact(artifactDir + "/test_info.txt");
            Testomatio.artifact(artifactDir + "/page_source.html");
        } catch (Exception e) {
            fail("Test failed with exception: " + e.getMessage());
        }
    }

    private void createArtifactDirectory() {
        try {
            Path path = Paths.get(artifactDir);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
        } catch (IOException e) {
            System.err.println("Failed to create artifact directory: " + e.getMessage());
        }
    }

    private void takeScreenshot(String fileName) {
        try {
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            byte[] screenshotBytes = screenshot.getScreenshotAs(OutputType.BYTES);
            Path screenshotPath = Paths.get(artifactDir, fileName);
            Files.write(screenshotPath, screenshotBytes);
            System.out.println("Screenshot saved: " + screenshotPath.toAbsolutePath());
        } catch (IOException e) {
            System.err.println("Failed to save screenshot: " + e.getMessage());
        }
    }

    private void savePageSource(String fileName) {
        try {
            String pageSource = driver.getPageSource();
            Path sourcePath = Paths.get(artifactDir, fileName);
            Files.write(sourcePath, pageSource.getBytes());
            System.out.println("Page source saved: " + sourcePath.toAbsolutePath());
        } catch (IOException e) {
            System.err.println("Failed to save page source: " + e.getMessage());
        }
    }

    private void saveTestInfo(String fileName) {
        try {
            Path infoPath = Paths.get(artifactDir, fileName);
            try (FileWriter writer = new FileWriter(infoPath.toFile())) {
                writer.write("Test Execution Info\n");
                writer.write("==================\n");
                writer.write("Timestamp: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\n");
                writer.write("URL: " + driver.getCurrentUrl() + "\n");
                writer.write("Title: " + driver.getTitle() + "\n");
                writer.write("Browser: " + ((ChromeDriver) driver).getCapabilities().getBrowserName() + "\n");
                writer.write("Browser Version: " + ((ChromeDriver) driver).getCapabilities().getBrowserVersion() + "\n");
                writer.write("Window Size: " + driver.manage().window().getSize() + "\n");
            }
            System.out.println("Test info saved: " + infoPath.toAbsolutePath());
        } catch (IOException e) {
            System.err.println("Failed to save test info: " + e.getMessage());
        }
    }
}
