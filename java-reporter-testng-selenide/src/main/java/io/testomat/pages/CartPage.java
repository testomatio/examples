package io.testomat.pages;

import com.codeborne.selenide.ElementsCollection;
import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.CollectionCondition.sizeGreaterThan;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;

public class CartPage {

    private final ElementsCollection cartItems =
        $$(".cart_item");

    private final SelenideElement cartLink =
        $(".shopping_cart_link");

    public CartPage verifyItemsExist() {
        cartItems.shouldHave(sizeGreaterThan(0));

        return this;
    }

    public int getItemsCount() {
        return cartItems.size();
    }

    public void cartLinkShouldVisible() {
        cartLink.shouldBe(visible);
    }
}