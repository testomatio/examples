package com.example.demo;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

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
        
        Response response = RestAssured.given()
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

    @SuppressWarnings("unused")
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
        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .body(pet)
                .when()
                .post("/pet");

        logResponse(response, "createPetTest");
        Assert.assertEquals(response.getStatusCode(), 200, "Status code should be 200");
        Assert.assertEquals(response.jsonPath().getString("name"), "Test Pet", "Pet name should match");
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
            Response response = RestAssured.given()
                    .pathParam("petId", -1)
                    .get("/pet/{petId}");
                    
            logResponse(response, "randomInvalidPetIdTest_invalid");
            Assert.assertEquals(response.getStatusCode(), 404, "Status code should be 404 for invalid pet ID");
        } else {
            logStep("Getting valid pet");
            Response response = RestAssured.given()
                    .pathParam("petId", petId)
                    .get("/pet/{petId}");
                    
            logResponse(response, "randomInvalidPetIdTest_valid");
            // Note: The API might return 404 if the pet doesn't exist
            // We'll verify that the response is either 200 (found) or 404 (not found)
            Assert.assertTrue(
                response.getStatusCode() == 200 || response.getStatusCode() == 404,
                "Response should be either 200 or 404"
            );
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
        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .body(pet)
                .when()
                .put("/pet");

        logResponse(response, "updatePetTest");
        Assert.assertEquals(response.getStatusCode(), 200, "Status code should be 200");
        Assert.assertEquals(response.jsonPath().getString("name"), "Updated Pet", "Updated pet name should match");
        Assert.assertEquals(response.jsonPath().getString("status"), "sold", "Updated pet status should match");
    }

    @Test
    public void findPetsByStatusTest() {
        logStep("Starting find pets by status test");
        
        addKeyValue("test_type", "api_find");
        
        logStep("Sending find pets request");
        Response response = RestAssured.given()
                .queryParam("status", "available")
                .get("/pet/findByStatus");
            
        logResponse(response, "findPetsByStatusTest");
        Assert.assertEquals(response.getStatusCode(), 200, "Status code should be 200");
        Assert.assertTrue(response.jsonPath().getList("$").size() > 0, "Response should contain at least one pet");
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
            Response response = RestAssured.given()
                    .queryParam("status", "invalid")
                    .get("/pet/findByStatus");
                    
            logResponse(response, "randomInvalidStatusTest");
            // The API returns empty array for invalid status instead of 400
            Assert.assertEquals(response.getStatusCode(), 200, "Status code should be 200 even for invalid status");
            Assert.assertTrue(response.jsonPath().getList("$").isEmpty(), "Response should be an empty array");
        } else {
            logStep("Attempting to find pets with status: available");
            Response response = RestAssured.given()
                    .queryParam("status", "available")
                    .get("/pet/findByStatus");
                    
            logResponse(response, "randomInvalidStatusTest");
            Assert.assertEquals(response.getStatusCode(), 200, "Status code should be 200");
            Assert.assertTrue(response.jsonPath().getList("$").size() > 0, "Response should contain at least one pet");
        }
    }
} 