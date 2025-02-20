import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pages.checkout_page import CheckoutPage
from helpers.random_failure import random_failure


@pytest.mark.tag("UI")
@pytest.mark.tag("Checkout")
class TestCheckoutUISuite:

    @pytest.fixture(autouse=True)
    def setup(self):
        self.driver = webdriver.Chrome()
        self.checkout_page = CheckoutPage(self.driver)
        self.checkout_page.navigate()
        yield
        self.driver.quit()

    @pytest.mark.testomatio("@T64ad374e")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("Checkout")
    def test_display_checkout_form(self):
        """Check if the checkout form is displayed"""
        first_name_input = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.ID, "firstName"))
        )
        assert first_name_input.is_displayed()

    @pytest.mark.testomatio("@T54110989")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("Checkout")
    def test_submit_button_exists(self):
        """Check if the submit button is displayed"""
        submit_button = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "form>button[type='submit']"))
        )
        assert submit_button.is_displayed()
        random_failure(0.2)

    @pytest.mark.testomatio("@T7d2da11e")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("Checkout")
    def test_country_select_options(self):
        """Check if the country select options are displayed"""
        options = WebDriverWait(self.driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "select#country option"))
        )
        assert len(options) > 1

    @pytest.mark.testomatio("@T3aba011d")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("Checkout")
    def test_state_select_options(self):
        """Check if the state select options are displayed"""
        options = WebDriverWait(self.driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "select#state option"))
        )
        assert len(options) > 1
        random_failure(0.2)

    @pytest.mark.testomatio("@T4533e3dd")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("Checkout")
    def test_ui_updates_on_focus(self):
        """Check if the UI updates when the input field is focused"""
        input_field = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "firstName"))
        )
        input_field.click()
        input_field.send_keys("Test")
        random_failure(0.2)

    @pytest.mark.testomatio("@Tb8176d8f")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("Checkout")
    def test_email_input_field_exists(self):
        """Check if the email input field is displayed"""
        email_input = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.ID, "email"))
        )
        assert email_input.is_displayed()

    @pytest.mark.testomatio("@Tb1beb041")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("Checkout")
    def test_payment_methods_are_visible(self):
        """Check if the payment methods are displayed"""
        credit_radio = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "#credit[name='paymentMethod']"))
        )
        debit_radio = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "#debit[name='paymentMethod']"))
        )
        paypal_radio = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "#paypal[name='paymentMethod']"))
        )
        
        assert credit_radio.is_displayed()
        assert debit_radio.is_displayed()
        assert paypal_radio.is_displayed()

    @pytest.mark.testomatio("@T2743ba67")
    @pytest.mark.tag("UI")
    @pytest.mark.tag("Checkout")
    def test_error_message_for_empty_fields(self):
        """Check if the error message is displayed for empty fields"""
        submit_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "form>button[type='submit']"))
        )
        submit_button.click()
        error_message = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".invalid-feedback"))
        )
        assert error_message.is_displayed()

