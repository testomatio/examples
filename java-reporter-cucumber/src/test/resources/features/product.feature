Feature: Product Management Suite

  @TestId:T6 @Title:Create_new_product_successfully
  Scenario: Create new product successfully
    Given valid product data is provided
    When product creation is requested
    Then product should be created successfully

  @TestId:T7 @Title:Update_existing_product_details
  Scenario: Update existing product details
    Given product exists in system
    When product details are updated
    Then changes should be saved successfully

  @TestId:T8 @Title:Delete_product_with_invalid_id
  Scenario: Delete product with invalid id
    Given invalid product id is provided
    When deletion is attempted
    Then operation should fail with error

  @TestId:T9 @Title:Search_products_by_category
  Scenario: Search products by category
    Given products exist in different categories
    When search by category is performed
    Then filtered results should be returned

  @TestId:T10 @Title:Product_inventory_management
  @ignore
  Scenario: Product inventory management
    Given product has inventory tracking
    When stock levels are updated
    Then inventory should reflect changes