package tests

import io.restassured.RestAssured.*
import io.restassured.http.ContentType
import org.hamcrest.Matchers.*
import org.junit.jupiter.api.Test
import io.testomat.core.annotation.TestId

class CrudApiTests : BaseTest() {

    @Test
    @TestId("c23988ce")
    fun `GET posts returns list`() {
        get("/posts")
            .then()
            .statusCode(200)
            .contentType(ContentType.JSON)
            .body("size()", greaterThan(0))
            .body("[0].id", notNullValue())
            .body("[0].title", notNullValue())
    }

    @Test
    @TestId("05272ac5")
    fun `GET post by id returns single object`() {
        get("/posts/1")
            .then()
            .statusCode(200)
            .body("id", equalTo(1))
            .body("title", notNullValue())
            .body("body", notNullValue())
            .body("userId", notNullValue())
    }

    @Test
    @TestId("973e6c28")
    fun `POST creates a new resource`() {
        val payload = """{"title":"foo","body":"bar","userId":1}"""
        given()
            .contentType(ContentType.JSON)
            .body(payload)
            .`when`()
            .post("/posts")
            .then()
            .statusCode(201)
            .body("title", equalTo("foo"))
            .body("body", equalTo("bar"))
            .body("id", notNullValue())
    }

    @Test
    @TestId("87fd940a")
    fun `PUT updates an existing resource`() {
        val payload = """{"id":1,"title":"updated","body":"new body","userId":1}"""
        given()
            .contentType(ContentType.JSON)
            .body(payload)
            .`when`()
            .put("/posts/1")
            .then()
            .statusCode(200)
            .body("title", equalTo("updated"))
            .body("body", equalTo("new body"))
    }

    @Test
    @TestId("cb49c380")
    fun `DELETE returns empty response`() {
        delete("/posts/1")
            .then()
            .statusCode(200)
    }

    @Test
    @TestId("a75e5a08")
    fun `GET nonexistent resource returns 404`() {
        get("/posts/99999")
            .then()
            .statusCode(404)
    }

    @Test
    @TestId("43d91d1e")
    fun `GET nested posts comments`() {
        get("/posts/1/comments")
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("[0].email", notNullValue())
            .body("[0].name", notNullValue())
    }

    @Test
    @TestId("1f4fcbb6")
    fun `GET post with query param`() {
        given()
            .queryParam("postId", 1)
            .`when`()
            .get("/comments")
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0))
            .body("postId", everyItem(equalTo(1)))
    }
}
