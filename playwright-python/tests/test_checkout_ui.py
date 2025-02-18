import pytest
import allure
from playwright.sync_api import Page
from pages.checkout_page import CheckoutPage
from helpers.random_failure import random_failure

@allure.suite("Checkout UI Tests")
@allure.tag("UI", "Checkout")  # Grouping tests
class TestCheckoutUISuite:

    @pytest.fixture(autouse=True)
    def setup(self, page: Page):
        self.checkout_page = CheckoutPage(page)
        self.checkout_page.navigate()
        allure.dynamic.feature("Checkout UI")

    @pytest.mark.testomatio("@Ta9ba4417")
    @allure.tag("UI", "Checkout")
    def test_display_checkout_form(self):
        """Check if the checkout form is displayed"""
        assert self.checkout_page.page.locator("input#firstName").is_visible()
        allure.step("Verified that checkout form is displayed")

    @pytest.mark.testomatio("@T9c1fd2c9")
    @allure.tag("UI", "Checkout")
    def test_submit_button_exists(self):
        """Check if the submit button is displayed"""
        submit_button = self.checkout_page.page.locator("form>button[type='submit']")
        assert submit_button.is_visible()
        random_failure(0.2, self.checkout_page.page)
        allure.step("Verified that submit button is displayed")

    @pytest.mark.testomatio("@T76051518")
    @allure.tag("UI", "Checkout")
    def test_country_select_options(self):
        """Check if the country select options are displayed"""
        options = self.checkout_page.page.locator("select#country option").all()
        assert len(options) > 1
        allure.step(f"Country select has {len(options)} options")

    @pytest.mark.testomatio("@Tf07ab978")
    @allure.tag("UI", "Checkout")
    def test_state_select_options(self):
        """Check if the state select options are displayed"""
        options = self.checkout_page.page.locator("select#state option").all()
        assert len(options) > 1
        random_failure(0.2, self.checkout_page.page)
        allure.step(f"State select has {len(options)} options")

    @pytest.mark.testomatio("@Tf25228fa")
    @allure.tag("UI", "Checkout")
    def test_ui_updates_on_focus(self):
        """Check if the UI updates when the input field is focused"""
        input_field = self.checkout_page.page.locator("input#firstName")
        input_field.click()
        input_field.fill("Test")
        allure.step("First name input focused and updated")
        random_failure(0.2, self.checkout_page.page)

    @pytest.mark.testomatio("@T3af42cd8")
    @allure.tag("UI", "Checkout")
    def test_email_input_field_exists(self):
        """Check if the email input field is displayed"""
        assert self.checkout_page.page.locator("input#email").is_visible()
        allure.step("Verified that email input field is displayed")

    @pytest.mark.testomatio("@T78716eab")
    @allure.tag("UI", "Checkout")
    def test_payment_methods_are_visible(self):
        """Check if the payment methods are displayed"""
        credit_radio = self.checkout_page.page.locator("#credit[name='paymentMethod']")
        debit_radio = self.checkout_page.page.locator("#debit[name='paymentMethod']")
        paypal_radio = self.checkout_page.page.locator("#paypal[name='paymentMethod']")
        
        assert credit_radio.is_visible()
        assert debit_radio.is_visible()
        assert paypal_radio.is_visible()
        allure.step("Verified that payment methods are displayed")

    @pytest.mark.testomatio("@Ta8baf8c1")
    @allure.tag("UI", "Checkout")
    def test_error_message_for_empty_fields(self):
        """Check if the error message is displayed for empty fields"""
        self.checkout_page.page.locator("form>button[type='submit']").click()
        error_message = self.checkout_page.page.locator(".invalid-feedback").first
        assert error_message.is_visible()
        allure.step("Verified that error message is displayed for empty fields")

