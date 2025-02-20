import pytest
from helpers.random_failure import random_failure

class TestRandomFailuresSuite:

    @pytest.mark.testomatio("@T644c1cf1")
    @pytest.mark.tag("unstable")
    @pytest.mark.tag("random")
    def test_random_failure1(self):
        random_failure(probability=0.05)  # Probability of failure 5%
        assert True

    @pytest.mark.testomatio("@T71338fb7")
    @pytest.mark.tag("unstable")
    @pytest.mark.tag("random")
    def test_random_failure2(self):
        random_failure(probability=0.05)
        assert True

    @pytest.mark.testomatio("@T6b620946")
    @pytest.mark.tag("unstable")
    @pytest.mark.tag("random")
    def test_random_failure3(self):
        random_failure(probability=0.05)
        assert True

    @pytest.mark.testomatio("@T2d30225c")
    @pytest.mark.tag("unstable")
    @pytest.mark.tag("random")
    def test_random_failure4(self):
        random_failure(probability=0.05)
        assert True
