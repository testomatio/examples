package io.testomat.steps;

import com.codeborne.selenide.SelenideElement;
import io.testomat.data.Users;
import io.testomat.pages.InventoryPage;
import io.testomat.pages.LoginPage;

public class LoginSteps {

    public static InventoryPage loginAsStandardUser() {
        return new LoginPage()
            .openPage()
            .enterUsername("standard_user")
            .enterPassword("secret_sauce")
            .clickLogin()
            .verifyPageLoaded();
    }

    public static InventoryPage loginAs(String username) {

        return new LoginPage()
            .openPage()
            .enterUsername(username)
            .enterPassword(Users.PASSWORD)
            .clickLogin()
            .verifyPageLoaded();
    }

    public SelenideElement getInventoryDetailsName() {
        return new InventoryPage().getInventoryDetailsName();
    }

}