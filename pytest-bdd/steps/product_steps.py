from pytest_bdd import given, when, then, parsers
from shop.models import Product, ProductCatalog


@given('the product catalog contains:', target_fixture="catalog")
def product_catalog_with_products(datatable):
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


@when(parsers.parse('I search for "{search_term}"'))
def search_products(catalog, search_term):
    catalog.last_search_results = catalog.find_by_name(search_term)


@then(parsers.parse('I should find {count:d} product'))
@then(parsers.parse('I should find {count:d} products'))
def check_search_results_count(catalog, count):
    assert len(catalog.last_search_results) == count, \
        f"Expected {count} products, but found {len(catalog.last_search_results)}"


@then(parsers.parse('the results should contain "{product_name}"'))
def check_product_in_results(catalog, product_name):
    product_names = [p.name for p in catalog.last_search_results]
    assert product_name in product_names, \
        f"Product '{product_name}' not found in results: {product_names}"