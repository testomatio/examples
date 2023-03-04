Feature: Login to App

  Scenario: Login to the application as an exist user
    When I visit sampleapp page
    Then I login as valid user
    Then I should see successfully message