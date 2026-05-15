package io.testomat.pages;

import com.codeborne.selenide.ElementsCollection;

import static com.codeborne.selenide.CollectionCondition.sizeGreaterThan;
import static com.codeborne.selenide.Selenide.$$;

public class CartPage {

    private final ElementsCollection cartItems =
        $$(".cart_item");

    public CartPage verifyItemsExist() {

        cartItems.shouldHave(sizeGreaterThan(0));

        return this;
    }

    public int getItemsCount() {

        return cartItems.size();
    }
}