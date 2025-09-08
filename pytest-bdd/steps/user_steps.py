from pytest_bdd import given, when, then, parsers
import pytest
from shop.user import UserService


@pytest.fixture
def user_service():
    return UserService()


@given('the user service is available')
def user_service_available(user_service):
    return user_service


@given(parsers.parse('a user exists with email "{email}"'))
def existing_user(user_service, email):
    user_service.register_user(email, "password123")
    return user_service


@given(parsers.parse('a user exists with email "{email}" and password "{password}"'))
def existing_user_with_password(user_service, email, password):
    user_service.register_user(email, password)
    return user_service


@when(parsers.parse('I register with email "{email}" and password "{password}"'))
def register_user(user_service, email, password):
    try:
        user_service.register_user(email, password)
        user_service.last_operation_success = True
        user_service.last_registered_user = (email, password)
    except ValueError as e:
        user_service.last_operation_success = False
        user_service.last_error = str(e)


@when(parsers.parse('I try to register with email "{email}" and password "{password}"'))
def try_register_user(user_service, email, password):
    register_user(user_service, email, password)


@when(parsers.parse('I try to login with email "{email}" and password "{password}"'))
def try_login(user_service, email, password):
    user = user_service.authenticate(email, password)
    user_service.last_login_result = user is not None


@then('the user should be successfully registered')
def check_registration_success(user_service):
    assert user_service.last_operation_success, "Registration should be successful"


@then(parsers.parse('I should be able to login with "{email}" and "{password}"'))
def check_login_works(user_service, email, password):
    user = user_service.authenticate(email, password)
    assert user is not None, f"Should be able to login with {email}"
    assert user.is_authenticated, "User should be authenticated"


@then(parsers.parse('the registration should fail with error "{error_message}"'))
def check_registration_error(user_service, error_message):
    assert not user_service.last_operation_success, "Registration should fail"
    assert user_service.last_error == error_message


@then(parsers.parse('the login should be {result}'))
def check_login_result(user_service, result):
    expected = result == "successful"
    assert user_service.last_login_result == expected, f"Login should be {result}"