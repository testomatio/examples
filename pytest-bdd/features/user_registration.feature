Feature: User Registration
  As a visitor
  I want to register an account
  So that I can make purchases

  Scenario: Successful registration
    Given the user service is available
    When I register with email "test@example.com" and password "secure123"
    Then the user should be successfully registered
    And I should be able to login with "test@example.com" and "secure123"

  Scenario: Registration with existing email
    Given the user service is available
    And a user exists with email "existing@example.com"
    When I try to register with email "existing@example.com" and password "newpass"
    Then the registration should fail with error "User already exists"

  Scenario Outline: Login with different credentials
    Given the user service is available
    And a user exists with email "user@test.com" and password "correct123"
    When I try to login with email "<email>" and password "<password>"
    Then the login should be <result>

    Examples:
    | email          | password   | result     |
    | user@test.com  | correct123 | successful |
    | user@test.com  | wrong123   | failed     |
    | wrong@test.com | correct123 | failed     |