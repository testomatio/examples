package base;

import com.codeborne.selenide.Configuration;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import static com.codeborne.selenide.Selenide.closeWebDriver;

public class BaseTest {

    @BeforeMethod
    public void setup() {
        Configuration.browser = "chrome";
        Configuration.browserSize = "1920x1080";
        Configuration.timeout = 10000;
        Configuration.pageLoadTimeout = 60000;
        Configuration.headless = false;
        Configuration.screenshots = true;
        Configuration.savePageSource = true;
        Configuration.reopenBrowserOnFail = true;
        Configuration.fastSetValue = true;
    }

    @AfterMethod(alwaysRun = true)
    public void tearDown() {
        closeWebDriver();
    }
}