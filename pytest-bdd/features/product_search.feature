Feature: Product Search
  As a customer
  I want to search for products
  So that I can find what I need

  Background:
    Given the product catalog contains:
      | id | name            | price | stock |
      | 1  | iPhone 15 Pro   | 1199  | 3     |
      | 2  | iPhone 15       | 999   | 5     |
      | 3  | Samsung Galaxy  | 899   | 4     |
      | 4  | MacBook Pro     | 2499  | 1     |
      | 5  | iPad Air        | 699   | 6     |

  Scenario: Search for existing product
    When I search for "iPhone"
    Then I should find 2 products
    And the results should contain "iPhone 15 Pro"
    And the results should contain "iPhone 15"

  Scenario: Search with no results
    When I search for "Nokia"
    Then I should find 0 products

  Scenario: Case insensitive search
    When I search for "iphone"
    Then I should find 2 products

  Scenario: Partial name search
    When I search for "Mac"
    Then I should find 1 product
    And the results should contain "MacBook Pro"