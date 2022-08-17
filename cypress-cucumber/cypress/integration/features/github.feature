Feature: "Github header"

  Scenario: Checking GitHub header

    When I open the GitHub home page
    Then I should see correct h1

  Scenario Outline: Checking web pages

    Given I open <url> page

  Examples:
    | url |
    | "https://testomat.io" |
    | "https://lb.ua1" |
