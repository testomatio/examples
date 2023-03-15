Feature: Home page verification

  Background:
    Given I visit Home page

  Scenario: I should see the UI Test Automation Playground title
    Then I should see UI Test Automation Playground title

  Scenario: I should see that Home is active menu
    Then I should see that Home menu is active by default

  Scenario: I verify that Home menu attr equal /home
    Then Home menu should be home

  Scenario: TOP h1 header should be visisble
    Then I should see the Playground h1 header at the TOP page part

  Scenario: cube image should be visible
    Then I should see the cude image

  Scenario: I want to search the links in Home page
    Given Verify additional links <count>

  Examples:
    | count |
    | 18 |
  