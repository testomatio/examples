import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../pages/HomePage";

Given("I visit Home page", () => {
  homePage.openHomePage();
});

Then("I should see UI Test Automation Playground title", () => {
  homePage.verifyHomepageTitle("UI Test Automation Playground");
});

Then("I should see that Home menu is active by default", () => {
  homePage.verifyHomepageActiveMenuName();
});

Then("Home menu should be home", () => {
  homePage.verifyHomepageActiveMenuAttr();
});

Given('Verify additional links <count>', (count) => {
  homePage.verifyLinkCount(count);
});