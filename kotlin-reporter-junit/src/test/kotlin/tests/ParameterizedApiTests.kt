package tests

import io.restassured.RestAssured.*
import org.hamcrest.Matchers.*
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.*
import io.testomat.core.annotation.TestId

class ParameterizedApiTests : BaseTest() {

    @ParameterizedTest
    @CsvSource(
        "1, Leanne Graham, Sincere@april.biz",
        "2, Ervin Howell, Shanna@melissa.tv",
        "3, Clementine Bauch, Nathan@yesenia.net"
    )
    @TestId("c1ba7a90")
    fun `GET user by id returns expected name and email`(id: Int, name: String, email: String) {
        get("/users/$id")
            .then()
            .statusCode(200)
            .body("name", equalTo(name))
            .body("email", equalTo(email))
    }

    @ParameterizedTest
    @ValueSource(ints = [1, 2, 3, 5, 10])
    @TestId("688a9b2d")
    fun `GET post by id returns 200 for valid ids`(id: Int) {
        get("/posts/$id")
            .then()
            .statusCode(200)
            .body("id", equalTo(id))
    }

    @ParameterizedTest
    @MethodSource("postIdsWithTitles")
    @TestId("04ad8cce")
    fun `GET post by id returns expected title`(id: Int, title: String) {
        get("/posts/$id")
            .then()
            .statusCode(200)
            .body("title", equalTo(title))
    }

    companion object {
        @JvmStatic
        fun postIdsWithTitles() = listOf(
            Arguments.of(1, "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"),
            Arguments.of(2, "qui est esse"),
            Arguments.of(3, "ea molestias quasi exercitationem repellat qui ipsa sit aut")
        )
    }
}
