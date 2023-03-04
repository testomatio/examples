Feature: Login to App

  Scenario: Login to the application as an exist user
    When I visit sampleapp page
    Then I login as user with invalid pwd
    Then I should see invalid message