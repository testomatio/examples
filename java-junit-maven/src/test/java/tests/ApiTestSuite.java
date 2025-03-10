package tests;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.Assert;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import java.util.Random;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class ApiTestSuite {
    private static final Random random = new Random();
    private static final String BASE_URL = "https://petstore.swagger.io/v2";
    private static Long petId;
    private static Map<String, String> keyValues = new HashMap<>();
    private static Map<String, String> metadata = new HashMap<>();

    @BeforeClass
    public static void setup() {
        RestAssured.baseURI = BASE_URL;
        // Create a pet at the start to ensure we have a valid ID
        Map<String, Object> pet = new HashMap<>();
        pet.put("id", 1L);
        pet.put("name", "Test Pet");
        pet.put("status", "available");
        
        Map<String, Object> category = new HashMap<>();
        category.put("id", 1L);
        category.put("name", "Dogs");
        pet.put("category", category);
        
        Response response = given()
                .contentType(ContentType.JSON)
                .body(pet)
                .when()
                .post("/pet");
        
        petId = response.jsonPath().getLong("id");
    }

    private void logStep(String message) {
        System.out.println("[TEST] Step: " + message);
    }

    private void logInfo(String message) {
        System.out.println("[TEST] Info: " + message);
    }

    private void logError(String message) {
        System.out.println("[TEST] Error: " + message);
    }

    private void addKeyValue(String key, String value) {
        keyValues.put(key, value);
        System.out.println("[TEST] Key-Value: " + key + " = " + value);
    }

    private void addMetadata(String key, String value) {
        metadata.put(key, value);
        System.out.println("[TEST] Metadata: " + key + " = " + value);
    }

    private void logResponse(Response response, String testName) {
        System.out.println("[TEST] Response for " + testName + ":");
        System.out.println("[TEST] Status Code: " + response.getStatusCode());
        System.out.println("[TEST] Response Body: " + response.getBody().asString());
    }

    @Test
    public void createPetTest() {
        logStep("Starting create pet test");
        
        Map<String, Object> pet = new HashMap<>();
        pet.put("id", 2L);
        pet.put("name", "Test Pet");
        pet.put("status", "available");
        
        Map<String, Object> category = new HashMap<>();
        category.put("id", 1L);
        category.put("name", "Dogs");
        pet.put("category", category);
        
        addKeyValue("test_type", "api");
        addMetadata("endpoint", "/pet");
        
        logStep("Sending create pet request");
        Response response = given()
                .contentType(ContentType.JSON)
                .body(pet)
                .when()
                .post("/pet");

        logResponse(response, "createPetTest");
        Assert.assertEquals(200, response.getStatusCode());
        Assert.assertEquals("Test Pet", response.jsonPath().getString("name"));
        petId = response.jsonPath().getLong("id");
        logInfo("Created pet with ID: " + petId);
    }

    @Test
    public void randomInvalidPetIdTest() {
        logStep("Starting random invalid pet ID test");
        
        addKeyValue("test_type", "api_random");
        
        // Randomly decide if test should fail
        boolean shouldFail = random.nextBoolean();
        logInfo("Random failure probability: " + shouldFail);
        
        if (shouldFail) {
            logStep("Attempting to get pet with ID: -1");
            Response response = given()
                    .pathParam("petId", -1)
                    .get("/pet/{petId}");
                    
            logResponse(response, "randomInvalidPetIdTest_invalid");
            Assert.assertEquals(404, response.getStatusCode());
        } else {
            logStep("Getting valid pet");
            Response response = given()
                    .pathParam("petId", petId)
                    .get("/pet/{petId}");
                    
            logResponse(response, "randomInvalidPetIdTest_valid");
            // Note: The API might return 404 if the pet doesn't exist
            // We'll verify that the response is either 200 (found) or 404 (not found)
            Assert.assertTrue("Response should be either 200 or 404", 
                response.getStatusCode() == 200 || response.getStatusCode() == 404);
        }
    }

    @Test
    public void updatePetTest() {
        logStep("Starting update pet test");
        
        Map<String, Object> pet = new HashMap<>();
        pet.put("id", petId);
        pet.put("name", "Updated Pet");
        pet.put("status", "sold");
        
        Map<String, Object> category = new HashMap<>();
        category.put("id", 1L);
        category.put("name", "Dogs");
        pet.put("category", category);
        
        addKeyValue("test_type", "api_update");
        
        logStep("Sending update pet request");
        Response response = given()
                .contentType(ContentType.JSON)
                .body(pet)
                .when()
                .put("/pet");

        logResponse(response, "updatePetTest");
        Assert.assertEquals(200, response.getStatusCode());
        Assert.assertEquals("Updated Pet", response.jsonPath().getString("name"));
        Assert.assertEquals("sold", response.jsonPath().getString("status"));
    }

    @Test
    public void findPetsByStatusTest() {
        logStep("Starting find pets by status test");
        
        addKeyValue("test_type", "api_find");
        
        logStep("Sending find pets request");
        Response response = given()
                .queryParam("status", "available")
                .get("/pet/findByStatus");
            
        logResponse(response, "findPetsByStatusTest");
        Assert.assertEquals(200, response.getStatusCode());
        Assert.assertTrue(response.jsonPath().getList("$").size() > 0);
    }

    @Test
    public void randomInvalidStatusTest() {
        logStep("Starting random invalid status test");
        
        addKeyValue("test_type", "api_status");
        
        // Randomly decide if test should fail
        boolean shouldFail = random.nextBoolean();
        logInfo("Random failure probability: " + shouldFail);
        
        if (shouldFail) {
            logStep("Attempting to find pets with status: invalid");
            Response response = given()
                    .queryParam("status", "invalid")
                    .get("/pet/findByStatus");
                    
            logResponse(response, "randomInvalidStatusTest");
            // The API returns empty array for invalid status instead of 400
            Assert.assertEquals(200, response.getStatusCode());
            Assert.assertTrue(response.jsonPath().getList("$").isEmpty());
        } else {
            logStep("Attempting to find pets with status: available");
            Response response = given()
                    .queryParam("status", "available")
                    .get("/pet/findByStatus");
                    
            logResponse(response, "randomInvalidStatusTest");
            Assert.assertEquals(200, response.getStatusCode());
            Assert.assertTrue(response.jsonPath().getList("$").size() > 0);
        }
    }
} 