import pytest
from pytest_bdd import given, parsers
from shop.models import Product


@given(parsers.parse('the following products are available:'), target_fixture="product_catalog")
def create_products_from_table(datatable, shopping_cart):
    from shop.models import ProductCatalog

    catalog = ProductCatalog()
    headers = datatable.pop(0)

    for row in datatable:
        product_data = dict(zip(headers, row))
        product = Product(
            id=int(product_data['id']),
            name=product_data['name'],
            price=int(product_data['price']),
            stock=int(product_data['stock'])
        )
        catalog.add_product(product)

    return catalog


@given(parsers.parse('the product catalog contains:'), target_fixture="catalog")
def create_catalog_from_table(datatable):
    from shop.models import ProductCatalog

    catalog = ProductCatalog()

    headers = datatable.pop(0)

    for row in datatable:
        product_data = dict(zip(headers, row))
        product = Product(
            id=int(product_data['id']),
            name=product_data['name'],
            price=int(product_data['price']),
            stock=int(product_data['stock'])
        )
        catalog.add_product(product)

    return catalog