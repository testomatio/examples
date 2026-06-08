package tests

import io.restassured.RestAssured.*
import org.hamcrest.Matchers.*
import org.junit.jupiter.api.Test
import io.testomat.core.annotation.TestId

class UserApiTests : BaseTest() {

    companion object {
        private const val USERS = "/users"
        private const val USER_1 = "/users/1"
    }

    private fun getUser1() =
        get(USER_1)
            .then()
            .statusCode(200)

    @Test
    @TestId("7f6a9557")
    fun `GET users returns list of 10 users`() {
        get(USERS)
            .then()
            .statusCode(200)
            .body("size()", equalTo(10))
    }

    @Test
    @TestId("31fe6da1")
    fun `GET user by id returns correct structure`() {
        getUser1()
            .body("name", equalTo("Leanne Graham"))
            .body("username", equalTo("Bret"))
            .body("email", equalTo("Sincere@april.biz"))
            .body("phone", notNullValue())
            .body("website", notNullValue())
    }

    @Test
    @TestId("52ef376a")
    fun `user has nested address object`() {
        getUser1()
            .body("address.street", equalTo("Kulas Light"))
            .body("address.suite", equalTo("Apt. 556"))
            .body("address.city", equalTo("Gwenborough"))
            .body("address.zipcode", equalTo("92998-3874"))
    }

    @Test
    @TestId("fe373ddf")
    fun `user has company info`() {
        getUser1()
            .body("company.name", equalTo("Romaguera-Crona"))
            .body("company.catchPhrase", notNullValue())
            .body("company.bs", notNullValue())
    }

    @Test
    @TestId("58de887c")
    fun `user has geo location`() {
        getUser1()
            .body("address.geo.lat", notNullValue())
            .body("address.geo.lng", notNullValue())
    }
}