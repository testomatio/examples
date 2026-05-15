package tests;

import static com.codeborne.selenide.Condition.attributeMatching;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$$;
import static com.codeborne.selenide.Selenide.open;

import base.BaseTest;
import io.testomat.config.Urls;
import io.testomat.data.Users;
import io.testomat.pages.CartPage;
import io.testomat.pages.InventoryPage;
import io.testomat.pages.ProductPage;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import io.testomat.pages.LoginPage;
import io.testomat.steps.LoginSteps;

public class LoginTest extends BaseTest {

    @DataProvider(name = "validUsers")
    public Object[][] validUsers() {

        return new Object[][]{
            {Users.STANDARD_USER},
            {Users.PROBLEM_USER},
            {Users.PERFORMANCE_USER},
            {Users.ERROR_USER},
            {Users.VISUAL_USER}
        };
    }

    @Test(dataProvider = "validUsers")
    public void validUsersShouldLogin(String username) {

        new LoginPage()
            .openPage()
            .enterUsername(username)
            .enterPassword(Users.PASSWORD)
            .clickLogin()
            .verifyPageLoaded();
    }

    @Test
    public void lockedUserShouldSeeError() {
        new LoginPage()
            .openPage()
            .enterUsername(Users.LOCKED_USER)
            .enterPassword(Users.PASSWORD)
            .clickLoginExpectingFailure()
            .verifyErrorMessage(
                "Sorry, this user has been locked out."
            );
    }

    @Test
    public void performanceUserShouldLoginSuccessfully() {
        long start = System.currentTimeMillis();

        new LoginPage()
            .openPage()
            .enterUsername(Users.PERFORMANCE_USER)
            .enterPassword(Users.PASSWORD)
            .clickLogin()
            .verifyPageLoaded();

        long elapsed = System.currentTimeMillis() - start;

        Assert.assertTrue(elapsed > 2000);
    }

    @Test
    public void performanceUserInventoryShouldLoad() {
        new LoginPage()
            .openPage()
            .enterUsername(Users.PERFORMANCE_USER)
            .enterPassword(Users.PASSWORD)
            .clickLogin()
            .verifyPageLoaded();
    }

    @Test
    public void problemUserShouldHaveBrokenImages() {
        new LoginPage()
            .openPage()
            .enterUsername(Users.PROBLEM_USER)
            .enterPassword(Users.PASSWORD)
            .clickLogin();

        $$("img")
            .forEach(img ->
                img.shouldHave(attributeMatching(
                    "src",
                    ".*sl-404.*"
                ))
            );
    }

    @Test
    public void problemUserCanStillAddItemsToCart() {

        LoginSteps.loginAs(Users.PROBLEM_USER)
            .addFirstItemToCart()
            .openCart()
            .verifyItemsExist();
    }

    @Test
    public void errorUserShouldNavigateToProductPage() {
        LoginSteps.loginAs(Users.ERROR_USER);
        open(Urls.inventoryItemUrl(4));
        new LoginSteps().getInventoryDetailsName().shouldBe(visible);
    }

    @Test
    public void visualUserShouldOpenInventoryPage() {
        LoginSteps.loginAs(Users.VISUAL_USER).verifyPageLoaded();
    }

    @Test
    public void visualUserShouldSeeMainElements() {
        LoginSteps.loginAs(Users.VISUAL_USER);

        new InventoryPage().inventoryListShouldVisible();
        new CartPage().cartLinkShouldVisible();
        new ProductPage().productSortContainerShouldVisible();
    }
}
