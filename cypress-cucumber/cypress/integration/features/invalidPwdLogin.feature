Feature: Login to App

  Scenario: Login to the application as not-existing user
    When I visit sampleapp page
    Then I login as user with invalid pwd
    Then I should see invalid message