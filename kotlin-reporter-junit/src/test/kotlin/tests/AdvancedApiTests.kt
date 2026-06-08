package tests

import io.restassured.RestAssured.*
import io.restassured.http.ContentType
import org.hamcrest.Matchers.*
import org.junit.jupiter.api.Test
import java.util.concurrent.TimeUnit
import io.testomat.core.annotation.TestId

class AdvancedApiTests : BaseTest() {

    @Test
    @TestId("e2c71562")
    fun `response should have expected headers`() {
        get("/posts/1")
            .then()
            .statusCode(200)
            .header("Content-Type", containsString("application/json"))
            .header("X-Ratelimit-Limit", notNullValue())
            .header("X-Ratelimit-Remaining", notNullValue())
    }

    @Test
    @TestId("701867b2")
    fun `response time should be acceptable`() {
        get("/posts")
            .then()
            .statusCode(200)
            .time(lessThan(5000L), TimeUnit.MILLISECONDS)
    }

    @Test
    @TestId("5a80e045")
    fun `extract and reuse response data`() {
        val title: String = get("/posts/1")
            .then()
            .statusCode(200)
            .extract()
            .path("title")

        val userId: Int = get("/posts/1")
            .then()
            .statusCode(200)
            .extract()
            .path("userId")

        val titles: List<String> = given()
            .queryParam("userId", userId)
            .`when`()
            .get("/posts")
            .then()
            .statusCode(200)
            .extract()
            .path("title")

        assert(titles.isNotEmpty())
        assert(titles.all { it.isNotEmpty() })
    }

    @Test
    @TestId("8f4f9513")
    fun `response body as string and parse`() {
        val body: String = get("/posts/1")
            .then()
            .statusCode(200)
            .extract()
            .asString()

        assert(body.contains("sunt aut facere"))
        assert(body.startsWith("{"))
    }

    @Test
    @TestId("5c2433ea")
    fun `get specific field from list response`() {
        val names: List<String> = get("/users")
            .then()
            .statusCode(200)
            .extract()
            .path("name")

        assert(names.contains("Leanne Graham"))
        assert(names.size == 10)
    }

    @Test
    @TestId("564a873d")
    fun `patch should work via override header`() {
        val payload = """{"title":"patched-title"}"""
        given()
            .contentType(ContentType.JSON)
            .header("X-HTTP-Method-Override", "PATCH")
            .body(payload)
            .`when`()
            .post("/posts/1")
            .then()
            .statusCode(200)
            .body("title", equalTo("patched-title"))
    }
}
