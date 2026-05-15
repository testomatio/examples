package tests;

import static com.codeborne.selenide.Condition.empty;
import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;
import static com.codeborne.selenide.Selenide.open;
import static com.codeborne.selenide.Selenide.refresh;
import static com.codeborne.selenide.Selenide.webdriver;
import static com.codeborne.selenide.WebDriverConditions.url;

import base.BaseTest;
import java.util.Comparator;
import java.util.List;
import org.testng.Assert;
import org.testng.annotations.Test;
import io.testomat.pages.CartPage;
import io.testomat.pages.InventoryPage;
import io.testomat.pages.LoginPage;
import io.testomat.steps.LoginSteps;

public class InventoryTest extends BaseTest {

    @Test
    public void inventoryShouldBeLoaded() {
        InventoryPage page = LoginSteps.loginAsStandardUser();
        Assert.assertTrue(page.getItemsCount() > 0);
    }

    @Test
    public void inventoryTitleShouldBeVisible() {
        LoginSteps.loginAsStandardUser()
            .verifyPageLoaded();
    }

    @Test
    public void itemShouldBeAddedToCart() {
        CartPage cartPage =
            LoginSteps.loginAsStandardUser()
                .addFirstItemToCart()
                .openCart()
                .verifyItemsExist();

        Assert.assertEquals(cartPage.getItemsCount(), 1);
    }

    @Test
    public void itemShouldBeRemovedFromCart() {
        InventoryPage page =
            LoginSteps.loginAsStandardUser()
                .addFirstItemToCart()
                .removeFirstItemFromCart();

        CartPage cartPage = page.openCart();

        Assert.assertEquals(cartPage.getItemsCount(), 0);
    }

    @Test
    public void userShouldLogoutSuccessfully() {
        LoginPage loginPage =
            LoginSteps.loginAsStandardUser()
                .logout();

        loginPage.verifyLoginButtonVisible();
    }

    @Test
    public void productsShouldBeSortedByNameAZ() {
        InventoryPage page =
            LoginSteps.loginAsStandardUser()
                .sortBy("az");

        List<String> names = page.getItemNames();

        List<String> sorted =
            names.stream()
                .sorted()
                .toList();

        Assert.assertEquals(names, sorted);
    }

    @Test
    public void productsShouldBeSortedByNameZA() {
        InventoryPage page =
            LoginSteps.loginAsStandardUser()
                .sortBy("za");

        List<String> names = page.getItemNames();

        List<String> sorted =
            names.stream()
                .sorted(Comparator.reverseOrder())
                .toList();

        Assert.assertEquals(names, sorted);
    }

    @Test
    public void productsShouldBeSortedByPriceLowToHigh() {
        InventoryPage page =
            LoginSteps.loginAsStandardUser()
                .sortBy("lohi");

        List<Double> prices =
            page.getItemPrices()
                .stream()
                .map(p -> Double.parseDouble(
                    p.replace("$", "")
                ))
                .toList();

        List<Double> sorted =
            prices.stream()
                .sorted()
                .toList();

        Assert.assertEquals(prices, sorted);
    }

    @Test
    public void userShouldNotAccessInventoryWithoutLogin() {
        open("https://www.saucedemo.com/inventory.html");
        webdriver().shouldHave(url("https://www.saucedemo.com/"));
    }

    @Test
    public void lockedUserShouldNotLogin() {
        new LoginPage()
            .openPage()
            .enterUsername("locked_out_user")
            .enterPassword("secret_sauce")
            .clickLoginExpectingFailure()
            .verifyErrorMessage(
                "Sorry, this user has been locked out."
            );
    }

    @Test
    public void cartShouldBeEmptyInitially() {
        CartPage cartPage =
            LoginSteps.loginAsStandardUser()
                .openCart();

        Assert.assertEquals(cartPage.getItemsCount(), 0);
    }

    @Test
    public void allProductImagesShouldBeVisible() {
        $$(".inventory_item_img img").forEach(img -> img.shouldBe(visible));
    }

    @Test
    public void addToCartButtonsShouldBeVisible() {
        LoginSteps.loginAsStandardUser();
        $$("button[id^='add-to-cart']")
            .forEach(btn ->
                btn.shouldBe(visible));
    }

    @Test
    public void allPricesShouldBeVisible() {
        LoginSteps.loginAsStandardUser();
        $$(".inventory_item_price")
            .forEach(price ->
                price.shouldNotBe(empty)
            );
    }

    @Test
    public void cartShouldPersistAfterRefresh() {
        LoginSteps.loginAsStandardUser()
            .addFirstItemToCart();
        refresh();

        $(".shopping_cart_badge")
            .shouldHave(text("1"));
    }
}
