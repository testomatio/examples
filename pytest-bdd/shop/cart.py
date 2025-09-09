class CartItem:
    def __init__(self, product, quantity=1):
        self.product = product
        self.quantity = quantity

    def get_total_price(self):
        return self.product.price * self.quantity


class ShoppingCart:
    def __init__(self):
        self.items = []

    def add_product(self, product, quantity=1):
        if product.stock < quantity:
            raise ValueError(f"Not enough stock. Available: {product.stock}")

        for item in self.items:
            if item.product.id == product.id:
                item.quantity += quantity
                return

        self.items.append(CartItem(product, quantity))

    def remove_product(self, product_id):
        self.items = [item for item in self.items if item.product.id != product_id]

    def get_total_price(self):
        return sum(item.get_total_price() for item in self.items)

    def get_items_count(self):
        return sum(item.quantity for item in self.items)

    def is_empty(self):
        return len(self.items) == 0
