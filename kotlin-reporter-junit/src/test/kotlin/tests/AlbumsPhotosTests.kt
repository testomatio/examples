package tests

import io.restassured.RestAssured.*
import org.hamcrest.Matchers.*
import org.junit.jupiter.api.Test
import io.testomat.core.annotation.TestId

class AlbumsPhotosTests : BaseTest() {

    @Test
    @TestId("baeaa69f")
    fun `GET albums returns list`() {
        get("/albums")
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("[0].userId", notNullValue())
            .body("[0].id", notNullValue())
            .body("[0].title", notNullValue())
    }

    @Test
    @TestId("992b5069")
    fun `GET album by id`() {
        get("/albums/1")
            .then()
            .statusCode(200)
            .body("userId", equalTo(1))
            .body("title", equalTo("quidem molestiae enim"))
    }

    @Test
    @TestId("7e8fe52c")
    fun `GET photos for album`() {
        get("/albums/1/photos")
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("[0].albumId", equalTo(1))
            .body("[0].title", notNullValue())
            .body("[0].url", notNullValue())
            .body("[0].thumbnailUrl", notNullValue())
    }

    @Test
    @TestId("b67876bb")
    fun `GET photos endpoint`() {
        get("/photos")
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("[0].albumId", notNullValue())
            .body("[0].url", containsString("https://"))
    }

    @Test
    @TestId("779ccfcd")
    fun `GET photo by id`() {
        get("/photos/1")
            .then()
            .statusCode(200)
            .body("id", equalTo(1))
            .body("albumId", equalTo(1))
            .body("title", notNullValue())
            .body("url", notNullValue())
    }

    @Test
    @TestId("581d506a")
    fun `GET albums by userId`() {
        given()
            .queryParam("userId", 1)
            .`when`()
            .get("/albums")
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("userId", everyItem(equalTo(1)))
    }
}
