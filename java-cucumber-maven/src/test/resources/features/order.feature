Feature: Order Processing Suite

  @TestId:T11 @Title:Place_order_with_valid_items
  Scenario: Place order with valid items
    Given shopping cart contains valid items
    When order is placed
    Then order should be processed successfully

  @TestId:T12 @Title:Calculate_order_total_with_discounts
  Scenario: Calculate order total with discounts
    Given order has applicable discounts
    When total is calculated
    Then discount should be applied correctly

  @TestId:T13 @Title:Process_payment_with_insufficient_funds
  Scenario: Process payment with insufficient funds
    Given payment method has insufficient funds
    When payment is processed
    Then transaction should be declined

  @TestId:T14 @Title:Generate_order_confirmation_email
  Scenario: Generate order confirmation email
    Given order is successfully placed
    When confirmation is generated
    Then email should be sent to customer

  @TestId:T15 @Title:Cancel_order_before_shipping
  @ignore
  Scenario: Cancel order before shipping
    Given order is placed but not shipped
    When cancellation is requested
    Then order should be cancelled successfully