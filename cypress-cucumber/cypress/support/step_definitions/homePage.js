import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../pages/HomePage";

Given("I visit Home page", () => {
  homePage.openHomePage();
});

Then("I should see UI Test Automation Playground title", () => {
  homePage.verifyHomepageTitle("UI Test Automation Playground");
});

Then("I should see the Playground h1 header at the TOP page part", () => {
  homePage.playgroundTitleShouldBeVisible();
});

Then("I should see the cude image", () => {
  homePage.cubeImageShouldBeVisible();
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