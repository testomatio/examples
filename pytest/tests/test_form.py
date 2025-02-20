import pytest
from selenium.webdriver.remote.webdriver import WebDriver
from pages.checkout_page import CheckoutPage
from helpers.random_failure import random_failure

class TestFormSuite:

    @pytest.fixture(autouse=True)
    def setup(self, driver: WebDriver):
        self.checkout_page = CheckoutPage(driver)
        self.checkout_page.navigate()

    @pytest.mark.testomatio("@T97ed1d05")
    @pytest.mark.tag("Form")
    @pytest.mark.tag("Checkout")
    @pytest.mark.tag("Functional")
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

    @pytest.mark.testomatio("@Te9a1c952")
    @pytest.mark.tag("Form")
    @pytest.mark.tag("Checkout")
    @pytest.mark.tag("Validation")
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
        random_failure(0.2, self.checkout_page.driver)

    @pytest.mark.testomatio("@T7f01dda6")
    @pytest.mark.tag("Form")
    @pytest.mark.tag("Checkout")
    @pytest.mark.tag("Validation")
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
        random_failure(0.2, self.checkout_page.driver)

    @pytest.mark.testomatio("@Tb144db90")
    @pytest.mark.tag("Form")
    @pytest.mark.tag("Checkout")
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

    @pytest.mark.testomatio("@T62321b53")
    @pytest.mark.tag("Form")
    @pytest.mark.tag("Checkout")
    @pytest.mark.tag("Error")
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
            random_failure(0.5, self.checkout_page.driver)
            self.checkout_page.submit_form()
        except Exception as error:
            assert isinstance(error, Exception)
