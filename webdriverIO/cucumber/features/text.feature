Feature: Text
    I want to check if two strings can be concatenated

    Scenario: Concatenate two strings
        When  I concatenate two strings "Hello" and "World"
        Then return the concatenated string "HelloWorld"

    Scenario: Should fail
        When  I concatenate two strings "Hello" and "World"
        Then  return the concatenated string "Hello World"

    Scenario: Concatenate two strings with a space
        When  I concatenate two strings "Hello" and "World" with a space
        Then return the concatenated string "Hello World"
