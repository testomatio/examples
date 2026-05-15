package io.testomat.steps;

import io.testomat.pages.ProductPage;

public class InventorySteps {

    public String getCartBadgeAmount() {
        return new ProductPage()
            .getCartBadge()
            .getText();
    }

}
