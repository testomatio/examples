package io.testomat.pages;

import com.codeborne.selenide.SelenideElement;
import io.testomat.config.Urls;

import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.open;

public class LoginPage {

    private final SelenideElement usernameInput = $("#user-name");
    private final SelenideElement passwordInput = $("#password");
    private final SelenideElement loginButton = $("#login-button");

    private final SelenideElement errorMessage = $("h3[data-test='error']");

    public LoginPage openPage() {
        open(Urls.BASE_URL);

        return this;
    }

    public LoginPage verifyErrorMessage(String text) {
        errorMessage.shouldHave(text(text));

        return this;
    }

    public LoginPage enterUsername(String username) {
        usernameInput
            .shouldBe(visible)
            .sendKeys(username);

        return this;
    }

    public LoginPage enterPassword(String password) {
        passwordInput
            .shouldBe(visible)
            .sendKeys(password);

        return this;
    }

    public InventoryPage clickLogin() {
        loginButton
            .shouldBe(visible)
            .click();

        return new InventoryPage();
    }

    public LoginPage login() {
        loginButton
            .shouldBe(visible)
            .click();

        return this;
    }

    public LoginPage clickLoginExpectingFailure() {
        loginButton
            .shouldBe(visible)
            .click();

        return this;
    }

    public LoginPage verifyLoginButtonVisible() {
        loginButton.shouldBe(visible);

        return this;
    }
}