import pytest
import allure
from helpers.random_failure import random_failure

@allure.suite("Random Failures Tests")
class TestRandomFailuresSuite:

    @pytest.mark.testomatio("@T6a3cb43d")
    @allure.tag("unstable", "random")
    def test_random_failure1(self):
        random_failure(probability=0.05)  # Probability of failure 5%
        assert True

    @pytest.mark.testomatio("@T8fc96e76")
    @allure.tag("unstable", "random")
    def test_random_failure2(self):
        random_failure(probability=0.05)
        assert True

    @pytest.mark.testomatio("@Tc5623db7")
    @allure.tag("unstable", "random")
    def test_random_failure3(self):
        random_failure(probability=0.05)
        assert True

    @pytest.mark.testomatio("@T12a4918d")
    @allure.tag("unstable", "random")
    def test_random_failure4(self):
        random_failure(probability=0.05)
        assert True
