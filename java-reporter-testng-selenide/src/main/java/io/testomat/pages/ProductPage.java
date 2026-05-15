package io.testomat.pages;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Condition.*;
import static com.codeborne.selenide.Selenide.$;

public class ProductPage {

    private final SelenideElement productName =
        $(".inventory_details_name");

    private final SelenideElement productDescription =
        $(".inventory_details_desc");

    private final SelenideElement productPrice =
        $(".inventory_details_price");

    private final SelenideElement productImage =
        $(".inventory_details_img img");

    private final SelenideElement addToCartButton =
        $("button[id^='add-to-cart']");

    private final SelenideElement removeButton =
        $("button[id^='remove']");

    private final SelenideElement backButton =
        $("#back-to-products");

    private final SelenideElement cartBadge =
        $(".shopping_cart_badge");

    private final SelenideElement productSortContainer =
        $(".product_sort_container");

    public ProductPage verifyPageLoaded() {

        productName.shouldBe(visible);

        productDescription.shouldBe(visible);

        productPrice.shouldBe(visible);

        productImage.shouldBe(visible);

        return this;
    }

    public String getProductName() {

        return productName.getText();
    }

    public String getProductDescription() {

        return productDescription.getText();
    }

    public String getProductPrice() {

        return productPrice.getText();
    }

    public ProductPage addToCart() {

        addToCartButton
            .shouldBe(enabled)
            .click();

        return this;
    }

    public ProductPage removeFromCart() {

        removeButton
            .shouldBe(enabled)
            .click();

        return this;
    }

    public ProductPage verifyCartBadge(String count) {
        cartBadge.shouldHave(text(count));

        return this;
    }

    public InventoryPage clickBackButton() {
        backButton.click();

        return new InventoryPage();
    }

    public SelenideElement getCartBadge() {
        return cartBadge;
    }

    public void productSortContainerShouldVisible() {
        productSortContainer.shouldBe(visible);
    }
}