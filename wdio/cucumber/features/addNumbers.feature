@Sad520f3c
Feature: Add number
    I want to check if two numbers can be added

    @some-tag1 @Tf37e0731
    Scenario: Add two positive numbers
        When  I add two numbers 2 and 3
        Then return the sum of 2 and 3 as 5

    @some-tag2 @T6e4a0318
    Scenario: Should fail
        When  I add two numbers 2 and 3
        Then  return the sum of 2 and 3 as 6
