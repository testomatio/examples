Feature: View LambdaTest Documentations

  Scenario: Go to HyperExecute Documentation from LambdaTest Website
    Given Open LambdaTest Website
    When Open HyperExecute page
    Then Open HyperExecute documentation

  Scenario: Go to Test At Scale Documentation from LambdaTest Website
    Given Open LambdaTest Website
    When Open Test At Scale page
    Then Open Test At Scale documentation

  Scenario Outline: LambdaTest Elements On Page
    Given Open LambdaTest Website
    Then I see <text>

    Examples:
    | text |
    | "Testing Loud" |
    | "Cross Browser" |
