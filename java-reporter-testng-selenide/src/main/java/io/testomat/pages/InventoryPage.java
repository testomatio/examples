package io.testomat.pages;

import com.codeborne.selenide.ElementsCollection;
import com.codeborne.selenide.SelenideElement;

import java.util.List;

import static com.codeborne.selenide.CollectionCondition.sizeGreaterThan;
import static com.codeborne.selenide.Condition.*;
import static com.codeborne.selenide.Selenide.*;

public class InventoryPage {

    private final SelenideElement title =
        $(".title");

    private final ElementsCollection inventoryItems =
        $$(".inventory_item");

    private final ElementsCollection itemNames =
        $$(".inventory_item_name");

    private final ElementsCollection itemPrices =
        $$(".inventory_item_price");

    private final SelenideElement cartButton =
        $(".shopping_cart_link");

    private final SelenideElement sortDropdown =
        $(".product_sort_container");

    private final ElementsCollection addToCartButtons =
        $$("button[id^='add-to-cart']");

    private final ElementsCollection removeButtons =
        $$("button[id^='remove']");

    private final SelenideElement burgerMenu =
        $("#react-burger-menu-btn");

    private final SelenideElement logoutLink =
        $("#logout_sidebar_link");

    private final ElementsCollection inventoryItemsImgs =
        $$(".inventory_item_img img");

    private final SelenideElement inventoryDetailsImgs =
        $(".inventory_details_img img");

    private final SelenideElement inventoryDetailsName =
        $(".inventory_details_name");

    private final SelenideElement inventoryList =
        $(".inventory_list");

    public InventoryPage verifyPageLoaded() {
        title.shouldHave(text("Products"));
        inventoryItems.shouldHave(sizeGreaterThan(0));

        return this;
    }

    public int getItemsCount() {

        return inventoryItems.size();
    }

    public List<String> getItemNames() {

        return itemNames.texts();
    }

    public List<String> getItemPrices() {
        return itemPrices.texts();
    }

    public InventoryPage sortBy(String value) {

        sortDropdown.selectOptionByValue(value);

        return this;
    }

    public InventoryPage addFirstItemToCart() {
        addToCartButtons.first().click();

        return this;
    }

    public InventoryPage removeFirstItemFromCart() {

        removeButtons.first().click();

        return this;
    }

    public CartPage openCart() {

        cartButton.click();

        return new CartPage();
    }

    public LoginPage logout() {

        burgerMenu.click();

        logoutLink.shouldBe(visible).click();

        return new LoginPage();
    }

    public ElementsCollection getInventoryItemsImgs() {
        return inventoryItemsImgs;
    }

    public SelenideElement getInventoryDetailsImgs() {
        return inventoryDetailsImgs;
    }

    public SelenideElement getInventoryDetailsName() {
        return inventoryDetailsName;
    }

    public void inventoryListShouldVisible() {
        inventoryList.shouldBe(visible);
    }

    public ElementsCollection getCartButtons() {
        return addToCartButtons;
    }

    public ElementsCollection getItemPriceElements() {
        return itemPrices;
    }
}