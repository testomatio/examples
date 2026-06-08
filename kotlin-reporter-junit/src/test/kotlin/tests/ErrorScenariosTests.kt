package tests

import io.restassured.RestAssured.*
import io.restassured.http.ContentType
import org.hamcrest.Matchers.*
import org.junit.jupiter.api.Test
import io.testomat.core.annotation.TestId

class ErrorScenariosTests : BaseTest() {

    @Test
    @TestId("4170370f")
    fun `GET invalid endpoint returns 404`() {
        get("/nonexistent")
            .then()
            .statusCode(404)
    }

    @Test
    @TestId("a4d30df0")
    fun `POST with empty body creates mock resource`() {
        given()
            .contentType(ContentType.JSON)
            .body("{}")
            .`when`()
            .post("/posts")
            .then()
            .statusCode(201)
            .body("id", notNullValue())
    }

    @Test
    @TestId("043d0e66")
    fun `POST does not require userId field`() {
        given()
            .contentType(ContentType.JSON)
            .body("""{"title":"no-user"}""")
            .`when`()
            .post("/posts")
            .then()
            .statusCode(201)
            .body("title", equalTo("no-user"))
            .body("userId", nullValue())
    }

    @Test
    @TestId("ca34f39b")
    fun `PUT on nonexistent resource`() {
        val payload = """{"title":"nowhere"}"""
        given()
            .contentType(ContentType.JSON)
            .body(payload)
            .`when`()
            .put("/posts/99999")
            .then()
            .statusCode(500)
    }

    @Test
    @TestId("b33e12b4")
    fun `DELETE nonexistent resource`() {
        delete("/posts/99999")
            .then()
            .statusCode(200)
    }

    @Test
    @TestId("f2844d62")
    fun `invalid query param types`() {
        given()
            .queryParam("id", "abc")
            .`when`()
            .get("/posts")
            .then()
            .statusCode(200)
    }
}
