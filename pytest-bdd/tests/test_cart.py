from pytest_bdd import scenarios, scenario
from steps.cart_steps import *

@scenario('../features/shopping_cart.feature', 'Add single product to cart')
def test_add_single_product_to_cart():
    pass

@scenario('../features/shopping_cart.feature', 'Add multiple different products')
def test_add_multiple_different_products():
    pass

@scenario('../features/shopping_cart.feature', 'Add same product multiple times')
def test_add_same_product_multiple_times():
    pass

@scenario('../features/shopping_cart.feature', 'Remove product from cart')
def test_remove_product_from_cart():
    pass

@scenario('../features/shopping_cart.feature', 'Try to add more items than in stock')
def test_try_to_add_more_items_than_in_stock():
    pass