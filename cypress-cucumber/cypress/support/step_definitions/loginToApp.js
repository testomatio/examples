import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../pages/LoginPage";

const userName = "sampleUser";

When("I visit sampleapp page", () => {
  loginPage.openLoginPage();
});

Then("I login as valid user", () => {
  loginPage.loginToApp(userName, "pwd");
});

Then("I login as user with invalid pwd", () => {
  loginPage.loginToApp(userName, "Errorpwd");
});

Then("I should see successfully message", () => {
  loginPage.verifyLoginStatus(`Welcome, ${userName}!`);
});

Then("I should see invalid message", () => {
  loginPage.verifyLoginStatus("Invalid username/password");
});
