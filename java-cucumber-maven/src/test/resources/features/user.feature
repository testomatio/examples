Feature: User Authentication Suite

  @TestId:T1 @Title:Successful_user_login
  Scenario: Successful user login
    Given user has valid credentials
    When user attempts to login
    Then user should be authenticated successfully

  @TestId:T2 @Title:Invalid_password_login_attempt
  Scenario: Invalid password login attempt
    Given user has invalid password
    When user attempts to login
    Then login should fail with error message

  @TestId:T3 @Title:Account_lockout_after_multiple_failures
  Scenario: Account lockout after multiple failures
    Given user has failed login attempts
    When user exceeds maximum attempts
    Then account should be locked

  @TestId:T4 @Title:Password_reset_functionality
  Scenario: Password reset functionality
    Given user requests password reset
    When reset email is sent
    Then user should receive reset instructions

  @TestId:T5 @Title:Two_factor_authentication_setup
  @ignore
  Scenario: Two factor authentication setup
    Given user wants to enable 2FA
    When user configures authentication app
    Then 2FA should be activated
