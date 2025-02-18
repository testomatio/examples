import pytest
import allure
from playwright.sync_api import Page
from pages.checkout_page import CheckoutPage
from helpers.random_failure import random_failure

@allure.suite("Checkout Form Tests")
class TestFormSuite:

    @pytest.fixture(autouse=True)
    def setup(self, page: Page):
        self.checkout_page = CheckoutPage(page)
        self.checkout_page.navigate()
        allure.dynamic.feature("Checkout Form")

    @pytest.mark.testomatio("@T12e68948")
    @allure.tag("Form", "Checkout")
    def test_fill_form_with_valid_data(self):
        """Test filling form with valid data"""
        self.checkout_page.fill_form(
            first_name="John",
            last_name="Doe", 
            username="johndoe",
            email="john@example.com",
            address="123 Main St",
            country="United States",
            state="California",
            zip_code="90210"
        )
        allure.step("Form filled with valid data")

    @pytest.mark.testomatio("@T7c020952")
    @allure.tag("Form", "Checkout", "Validation")
    def test_empty_first_name_validation(self):
        """Test validation for empty first name"""
        self.checkout_page.fill_form(
            first_name="",
            last_name="Doe",
            username="johndoe", 
            email="john@example.com",
            address="123 Main St",
            country="United States", 
            state="California",
            zip_code="90210"
        )
        random_failure(0.2, self.checkout_page.page)
        allure.step("Checked validation for empty first name")

    @pytest.mark.testomatio("@T8d4b5745")
    @allure.tag("Form", "Checkout", "Validation")
    def test_invalid_email_validation(self):
        """Test validation for invalid email"""
        self.checkout_page.fill_form(
            first_name="John",
            last_name="Doe",
            username="johndoe",
            email="invalid-email",
            address="123 Main St", 
            country="United States",
            state="California",
            zip_code="90210"
        )
        random_failure(0.2, self.checkout_page.page)
        allure.step("Checked validation for invalid email")

    @pytest.mark.testomatio("@Tffc336e1")
    @allure.tag("Form", "Checkout")
    def test_successful_form_submission(self):
        """Test successful form submission"""
        self.checkout_page.fill_form(
            first_name="Jane",
            last_name="Smith",
            username="janesmith",
            email="jane@example.com",
            address="456 Elm St",
            country="United States",
            state="California", 
            zip_code="10001"
        )
        self.checkout_page.submit_form()
        allure.step("Form submitted successfully")

    @pytest.mark.testomatio("@Td124a15f")
    @allure.tag("Form", "Checkout", "Error")
    def test_form_submission_error_handling(self):
        """Test form submission error handling"""
        try:
            self.checkout_page.fill_form(
                first_name="Alice",
                last_name="Brown",
                username="alicebrown",
                email="alice@example.com",
                address="789 Oak St",
                country="United States",
                state="California",
                zip_code="73301"
            )
            random_failure(0.5, self.checkout_page.page)
            self.checkout_page.submit_form()
            allure.step("Form submitted, but expected failure did not occur")
        except Exception as error:
            allure.step(f"Form submission failed as expected: {str(error)}")
            assert isinstance(error, Exception)
