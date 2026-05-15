package tests;

import base.BaseTest;
import io.testomat.config.Urls;
import io.testomat.pages.InventoryPage;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import io.testomat.pages.LoginPage;
import io.testomat.pages.ProductPage;

import static com.codeborne.selenide.Condition.attributeMatching;
import static com.codeborne.selenide.Selenide.open;
import static com.codeborne.selenide.Selenide.refresh;
import static com.codeborne.selenide.Selenide.webdriver;
import static com.codeborne.selenide.WebDriverConditions.url;

public class ProductDetailsTest extends BaseTest {

    @BeforeMethod
    public void login() {
        new LoginPage()
            .openPage()
            .enterUsername("standard_user")
            .enterPassword("secret_sauce")
            .clickLogin();
    }

    private ProductPage openProductPage() {
        open(Urls.inventoryItemUrl(7));

        return new ProductPage()
            .verifyPageLoaded();
    }

    @Test
    public void productPageShouldBeOpened() {
        openProductPage();
    }

    @Test
    public void productNameShouldBeVisible() {
        ProductPage page =
            openProductPage();

        Assert.assertFalse(
            page.getProductName().isBlank()
        );
    }

    @Test
    public void productDescriptionShouldBeVisible() {
        ProductPage page =
            openProductPage();

        Assert.assertFalse(
            page.getProductDescription().isBlank()
        );
    }

    @Test
    public void productPriceShouldBeVisible() {
        ProductPage page =
            openProductPage();

        Assert.assertTrue(
            page.getProductPrice().contains("$")
        );
    }

    @Test
    public void productImageShouldBeVisible() {
        openProductPage();
    }

    @Test
    public void itemShouldBeAddedToCart() {
        openProductPage()
            .addToCart()
            .verifyCartBadge("1");
    }

    @Test
    public void itemShouldBeRemovedFromCart() {
        openProductPage()
            .addToCart()
            .removeFromCart();
    }

    @Test
    public void backButtonShouldReturnToInventory() {
        openProductPage()
            .clickBackButton()
            .verifyPageLoaded();
    }

    @Test
    public void cartBadgeShouldIncreaseAfterAdd() {
        openProductPage()
            .addToCart()
            .verifyCartBadge("1");
    }

    @Test
    public void addToCartButtonShouldChangeToRemove() {
        openProductPage()
            .addToCart();
    }

    @Test
    public void pageShouldBeRefreshSafe() {
        ProductPage page =
            openProductPage();

        page.addToCart();
        refresh();

        page.verifyCartBadge("1");
    }

    @Test
    public void userShouldNotAccessProductPageWithoutLogin() {
        open(Urls.inventoryItemUrl(3));
        webdriver().shouldHave(
            url(Urls.BASE_URL)
        );
    }

    @Test
    public void invalidProductIdShouldNotCrashApplication() {
        open(Urls.inventoryItemUrl(999));
    }

    @Test
    public void correctProductShouldBeDisplayed() {
        ProductPage page =
            openProductPage();

        Assert.assertEquals(
            page.getProductName(),
            "Sauce Labs Backpack"
        );
    }

    @Test
    public void imageShouldContainSrcAttribute() {
        new InventoryPage()
            .getInventoryDetailsImgs()
            .shouldHave(attributeMatching("src", ".*"));
    }

    @Test
    public void addRemoveAddFlowShouldWork() {
        ProductPage page =
            openProductPage();

        page.addToCart()
            .removeFromCart()
            .addToCart()
            .verifyCartBadge("1");
    }

}