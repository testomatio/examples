package tests

import io.restassured.RestAssured.*
import org.hamcrest.Matchers.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.ValueSource
import io.testomat.core.annotation.TestId

class FilterApiTests : BaseTest() {

    @Test
    @TestId("2f5f0714")
    fun `GET comments by postId filter`() {
        given()
            .queryParam("postId", 1)
            .`when`()
            .get("/comments")
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("postId", everyItem(equalTo(1)))
    }

    @ParameterizedTest
    @ValueSource(strings = ["/posts/1/comments", "/comments?postId=1"])
    @TestId("e9f201c0")
    fun `comments for post 1 returned by both endpoints`(path: String) {
        get(path)
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("[0].postId", equalTo(1))
    }

    @Test
    @TestId("d7cef041")
    fun `GET limited results via query params`() {
        given()
            .queryParam("userId", 1)
            .queryParam("completed", true)
            .`when`()
            .get("/todos")
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("userId", everyItem(equalTo(1)))
            .body("completed", everyItem(equalTo(true)))
    }

    @Test
    @TestId("5483a8cd")
    fun `GET all todos`() {
        get("/todos")
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("[0].userId", notNullValue())
            .body("[0].title", notNullValue())
            .body("[0].completed", notNullValue())
    }

    @Test
    @TestId("b4820150")
    fun `GET users endpoint returns collection`() {
        get("/users")
            .then()
            .statusCode(200)
            .body("size()", equalTo(10))
            .body("[0].name", equalTo("Leanne Graham"))
            .body("[0].email", equalTo("Sincere@april.biz"))
    }

    @Test
    @TestId("c82a81f9")
    fun `GET todos by userId returns matching items`() {
        given()
            .queryParam("userId", 1)
            .`when`()
            .get("/todos")
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("userId", everyItem(equalTo(1)))
    }
}
