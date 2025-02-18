import allure
from playwright.sync_api import Page

class CheckoutPage:
    def __init__(self, page: Page):
        self.page = page
        self.url = "https://getbootstrap.com/docs/5.1/examples/checkout/"

    def navigate(self):
        with allure.step("Navigation to Checkout page"):
            self.page.goto(self.url, timeout=10000)
            allure.attach(self.page.title(), name="Page Title", attachment_type=allure.attachment_type.TEXT)

    def get_heading_text(self):
        with allure.step("Getting the heading text"):
            return self.page.inner_text("h4")

    def fill_input(self, selector: str, value: str):
        """Fill an input field with the given value"""
        with allure.step(f"Filling the field '{selector}' with value '{value}'"):
            # Wait for element to be visible before filling
            self.page.wait_for_selector(selector, state="visible")
            self.page.fill(selector, value)
            return self.page.input_value(selector)
        
    def select_dropdown(self, selector: str, value: str):
        """Select an option from a dropdown"""
        with allure.step(f"Selecting the option '{value}' from the dropdown '{selector}'"):
            self.page.locator(selector).click()
            self.page.locator(selector).select_option(label=value)

    def fill_form(self, first_name, last_name, username, email, address, country, state, zip_code):
        """Fill the checkout form with the provided data"""
        with allure.step("Filling checkout form"):
            # Wait for the form to be visible first
            self.page.wait_for_selector("form", state="visible")
            
            # Use more specific selectors with data-test attributes
            self.fill_input("input#firstName", first_name)
            self.fill_input("input#lastName", last_name)
            self.fill_input("input#username", username)
            self.fill_input("input#email", email)
            self.fill_input("input#address", address)
            self.select_dropdown("select#country", country)
            self.select_dropdown("select#state", state)
            self.fill_input("input#zip", zip_code)

    def click_continue_to_checkout(self):
        """
        Click the 'Continue to checkout' button
        """
        with allure.step("Clicking Continue to checkout button"):
            # Using a more specific selector that targets the exact button
            self.page.click("button.btn-primary:has-text('Continue to checkout')")

    def click_redeem(self):
        """
        Click the 'Redeem' button
        """
        with allure.step("Clicking Redeem button"):
            self.page.click("button.btn-secondary:has-text('Redeem')")

    def select_payment_method(self, method: str):
        """
        Select a payment method
        Args:
            method: One of 'credit', 'debit', or 'paypal'
        """
        with allure.step(f"Selecting payment method: {method}"):
            payment_methods = {
                'credit': '#credit',
                'debit': '#debit',
                'paypal': '#paypal'
            }
            
            if method.lower() not in payment_methods:
                raise ValueError(f"Invalid payment method. Must be one of: {', '.join(payment_methods.keys())}")
            
            selector = payment_methods[method.lower()]
            self.page.click(selector)
            
            # Verify the selection
            is_checked = self.page.locator(selector).is_checked()
            if not is_checked:
                raise Exception(f"Failed to select {method} payment method")

    def submit_form(self):
        """Submit the checkout form"""
        # Use a more specific selector for the submit button
        submit_button = self.page.locator("form>button[type='submit']")
        submit_button.wait_for(state="visible")
        submit_button.click()
