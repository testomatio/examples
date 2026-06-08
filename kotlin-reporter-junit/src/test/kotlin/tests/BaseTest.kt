package tests

import io.restassured.RestAssured.baseURI
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
abstract class BaseTest {

    @BeforeAll
    fun setup() {
        baseURI = "https://jsonplaceholder.typicode.com"
    }
}
