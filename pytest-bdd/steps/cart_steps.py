import pytest
from pytest_bdd import given, when, then, parsers
from shop.cart import ShoppingCart
from shop.models import Product, ProductCatalog


@pytest.fixture
def shopping_cart():
    return ShoppingCart()


@given('I have an empty shopping cart')
def empty_shopping_cart(shopping_cart):
    return shopping_cart


@given('the following products are available:', target_fixture="product_catalog")
def products_available(datatable):
    catalog = ProductCatalog()
    headers = datatable[0]
    rows = datatable[1:]

    for row in rows:
        product_data = dict(zip(headers, row))
        product = Product(
            id=int(product_data['id']),
            name=product_data['name'],
            price=int(product_data['price']),
            stock=int(product_data['stock'])
        )
        catalog.add_product(product)

    return catalog


@given(parsers.parse('I have "{product1}" and "{product2}" in my cart'))
def cart_with_products(shopping_cart, product_catalog, product1, product2):
    p1 = next(p for p in product_catalog.products.values() if p.name == product1)
    p2 = next(p for p in product_catalog.products.values() if p.name == product2)
    shopping_cart.add_product(p1)
    shopping_cart.add_product(p2)
    return shopping_cart


@when(parsers.parse('I add product "{product_name}" to cart'))
def add_product_to_cart(shopping_cart, product_catalog, product_name):
    product = next(p for p in product_catalog.products.values() if p.name == product_name)
    shopping_cart.add_product(product)


@when(parsers.parse('I add {quantity:d} "{product_name}" to cart'))
def add_multiple_products(shopping_cart, product_catalog, quantity, product_name):
    product = next(p for p in product_catalog.products.values() if p.name == product_name)
    shopping_cart.add_product(product, quantity)


@when(parsers.parse('I try to add {quantity:d} "{product_name}" to cart'))
def try_add_products(shopping_cart, product_catalog, quantity, product_name):
    product = next(p for p in product_catalog.products.values() if p.name == product_name)
    try:
        shopping_cart.add_product(product, quantity)
        shopping_cart.last_operation_success = True
    except ValueError as e:
        shopping_cart.last_operation_success = False
        shopping_cart.last_error = str(e)


@when(parsers.parse('I remove "{product_name}" from cart'))
def remove_product_from_cart(shopping_cart, product_catalog, product_name):
    product = next(p for p in product_catalog.products.values() if p.name == product_name)
    shopping_cart.remove_product(product.id)


@then(parsers.parse('the cart should contain {count:d} item'))
@then(parsers.parse('the cart should contain {count:d} items'))
def check_cart_items_count(shopping_cart, count):
    total_items = sum(item.quantity for item in shopping_cart.items)
    assert total_items == count, f"Expected {count} items, but got {total_items}"


@then(parsers.parse('the cart should contain {quantity:d} items of "{product_name}"'))
def check_specific_product_quantity(shopping_cart, product_catalog, quantity, product_name):
    product = next(p for p in product_catalog.products.values() if p.name == product_name)
    item = next((item for item in shopping_cart.items if item.product.id == product.id), None)
    assert item is not None, f"Product {product_name} not found in cart"
    assert item.quantity == quantity, f"Expected {quantity} items of {product_name}, but got {item.quantity}"


@then(parsers.parse('the total price should be ${price:d}'))
def check_total_price(shopping_cart, price):
    assert shopping_cart.get_total_price() == price, f"Expected ${price}, but got ${shopping_cart.get_total_price()}"


@then('the cart should be empty')
def check_cart_empty(shopping_cart):
    assert shopping_cart.is_empty(), "Cart should be empty"


@then(parsers.parse('I should get an error "{error_message}"'))
def check_error_message(shopping_cart, error_message):
    assert not shopping_cart.last_operation_success, "Operation should fail"
    assert shopping_cart.last_error == error_message