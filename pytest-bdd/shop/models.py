class Product:
    def __init__(self, id, name, price, stock=0):
        self.id = id
        self.name = name
        self.price = price
        self.stock = stock

    def is_available(self):
        return self.stock > 0

    def __repr__(self):
        return f"Product(id={self.id}, name='{self.name}', price={self.price}, stock={self.stock})"


class ProductCatalog:
    def __init__(self):
        self.products = {}
        self.last_search_results = []

    def add_product(self, product):
        self.products[product.id] = product

    def find_by_name(self, name):
        results = [p for p in self.products.values() if name.lower() in p.name.lower()]
        self.last_search_results = results
        return results

    def get_product(self, product_id):
        return self.products.get(product_id)
