from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select

class CheckoutPage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://getbootstrap.com/docs/5.1/examples/checkout/"

    def navigate(self):
        self.driver.get(self.url)


    def get_heading_text(self):
        return self.driver.find_element(By.TAG_NAME, "h4").text

    def fill_input(self, selector: str, value: str):
        """Fill an input field with the given value"""
        # Wait for element to be visible before filling
        element = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, selector))
        )
        element.clear()
        element.send_keys(value)
        return element.get_attribute("value")
        
    def select_dropdown(self, selector: str, value: str):
        """Select an option from a dropdown"""
        dropdown = Select(self.driver.find_element(By.CSS_SELECTOR, selector))
        dropdown.select_by_visible_text(value)

    def fill_form(self, first_name, last_name, username, email, address, country, state, zip_code):
        """Fill the checkout form with the provided data"""
        # Wait for the form to be visible first
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.TAG_NAME, "form"))
        )
        
        # Use more specific selectors with data-test attributes
        self.fill_input(By.ID, "firstName", first_name)
        self.fill_input(By.ID, "lastName", last_name) 
        self.fill_input(By.ID, "username", username)
        self.fill_input(By.ID, "email", email)
        self.fill_input(By.ID, "address", address)
        self.select_dropdown(By.ID, "country", country)
        self.select_dropdown(By.ID, "state", state)
        self.fill_input(By.ID, "zip", zip_code)

    def click_continue_to_checkout(self):
        """
        Click the 'Continue to checkout' button
        """
        # Using a more specific selector that targets the exact button
        button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button.btn-primary"))
        )
        button.click()

    def click_redeem(self):
        """
        Click the 'Redeem' button
        """
        button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button.btn-secondary"))
        )
        button.click()

    def select_payment_method(self, method: str):
        """
        Select a payment method
        Args:
            method: One of 'credit', 'debit', or 'paypal'
        """
        payment_methods = {
            'credit': '#credit',
            'debit': '#debit',
            'paypal': '#paypal'
        }
        
        if method.lower() not in payment_methods:
            raise ValueError(f"Invalid payment method. Must be one of: {', '.join(payment_methods.keys())}")
        
        selector = payment_methods[method.lower()]
        element = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, selector))
        )
        element.click()
        
        # Verify the selection
        is_checked = element.is_selected()
        if not is_checked:
            raise Exception(f"Failed to select {method} payment method")

    def submit_form(self):
        """Submit the checkout form"""
        # Use a more specific selector for the submit button
        submit_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "form>button[type='submit']"))
        )
        submit_button.click()
