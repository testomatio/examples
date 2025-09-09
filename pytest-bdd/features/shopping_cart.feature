Feature: Shopping Cart
  As a customer
  I want to manage my shopping cart
  So that I can purchase products

  Background:
    Given I have an empty shopping cart
    And the following products are available:
      | id | name        | price | stock |
      | 1  | iPhone 15   | 999   | 5     |
      | 2  | MacBook Pro | 2499  | 2     |
      | 3  | AirPods     | 179   | 10    |

  Scenario: Add single product to cart
    When I add product "iPhone 15" to cart
    Then the cart should contain 1 item
    And the total price should be $999

  Scenario: Add multiple different products
    When I add product "iPhone 15" to cart
    And I add product "AirPods" to cart
    Then the cart should contain 2 items
    And the total price should be $1178

  Scenario: Add same product multiple times
    When I add 2 "iPhone 15" to cart
    And I add 1 "iPhone 15" to cart
    Then the cart should contain 3 items of "iPhone 15"
    And the total price should be $2997

  Scenario: Remove product from cart
    Given I have "iPhone 15" and "AirPods" in my cart
    When I remove "iPhone 15" from cart
    Then the cart should contain 1 item
    And the total price should be $179

  Scenario: Try to add more items than in stock
    When I try to add 10 "MacBook Pro" to cart
    Then I should get an error "Not enough stock. Available: 2"
    And the cart should be empty