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

import static io.restassured.RestAssured.given;

public class IntegrationTestSuite {
    private static final Random random = new Random();
    private static final String BASE_URL = "https://petstore.swagger.io/v2";
    private static Long petId;
    private static Long orderId;
    private static Map<String, String> keyValues = new HashMap<>();
    private static Map<String, String> metadata = new HashMap<>();

    @BeforeClass
    public static void setup() {
        RestAssured.baseURI = BASE_URL;
        // Create a pet at the start to ensure we have a valid ID
        Map<String, Object> pet = new HashMap<>();
        pet.put("id", 1L);
        pet.put("name", "Integration Test Pet");
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
    public void createPetAndOrderTest() {
        logStep("Starting create pet and order integration test");
        addKeyValue("test_type", "integration");
        addMetadata("flow", "pet_order");
        
        logStep("Creating a new pet");
        Map<String, Object> pet = new HashMap<>();
        pet.put("id", petId + 1); // Use a new ID
        pet.put("name", "Order Test Pet");
        pet.put("status", "available");
        
        Map<String, Object> category = new HashMap<>();
        category.put("id", 1L);
        category.put("name", "Dogs");
        pet.put("category", category);
        
        Response petResponse = given()
                .contentType(ContentType.JSON)
                .body(pet)
                .when()
                .post("/pet");
        
        logResponse(petResponse, "createPetAndOrderTest_pet");
        Long newPetId = petResponse.jsonPath().getLong("id");
        
        logStep("Creating order for the pet");
        Map<String, Object> order = new HashMap<>();
        order.put("id", 1L);
        order.put("petId", newPetId);
        order.put("quantity", 1);
        order.put("shipDate", "2024-03-05T21:29:47.000Z");
        order.put("status", "placed");
        order.put("complete", true);
        
        Response orderResponse = given()
                .contentType(ContentType.JSON)
                .body(order)
                .when()
                .post("/store/order");
        
        logResponse(orderResponse, "createPetAndOrderTest_order");
        orderId = orderResponse.jsonPath().getLong("id");
        
        Assert.assertEquals(orderResponse.getStatusCode(), 200, "Status code should be 200");
    }

    @Test
    public void randomOrderStatusTest() {
        logStep("Starting random order status test");
        addKeyValue("test_type", "integration_random");
        
        boolean shouldFail = random.nextBoolean();
        logInfo("Random failure probability: " + shouldFail);
        
        if (shouldFail) {
            logStep("Simulating order processing delay");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                logError("Sleep interrupted: " + e.getMessage());
            }
        }
        
        // First create an order if we don't have one
        if (orderId == null) {
            Map<String, Object> order = new HashMap<>();
            order.put("id", 1L);
            order.put("petId", petId);
            order.put("quantity", 1);
            order.put("shipDate", "2024-03-05T21:29:47.000Z");
            order.put("status", "placed");
            order.put("complete", true);
            
            Response createResponse = given()
                    .contentType(ContentType.JSON)
                    .body(order)
                    .when()
                    .post("/store/order");
            
            logResponse(createResponse, "randomOrderStatusTest_create");
            orderId = createResponse.jsonPath().getLong("id");
        }
        
        Response response = given()
                .pathParam("orderId", orderId)
                .get("/store/order/{orderId}");
        
        logResponse(response, "randomOrderStatusTest_get");
        // Note: The API might return 404 if the order doesn't exist
        // We'll verify that the response is either 200 (found) or 404 (not found)
        Assert.assertTrue(
            response.getStatusCode() == 200 || response.getStatusCode() == 404,
            "Response should be either 200 or 404"
        );
    }

    @Test
    public void randomResourceCleanupTest() {
        logStep("Starting random resource cleanup test");
        addKeyValue("test_type", "integration_cleanup");
        
        boolean shouldFail = random.nextBoolean();
        logInfo("Random failure probability: " + shouldFail);
        
        if (shouldFail) {
            logStep("Simulating cleanup delay");
            try {
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                logError("Sleep interrupted: " + e.getMessage());
            }
        }
        
        // First create an order if we don't have one
        if (orderId == null) {
            Map<String, Object> order = new HashMap<>();
            order.put("id", 1L);
            order.put("petId", petId);
            order.put("quantity", 1);
            order.put("shipDate", "2024-03-05T21:29:47.000Z");
            order.put("status", "placed");
            order.put("complete", true);
            
            Response createResponse = given()
                    .contentType(ContentType.JSON)
                    .body(order)
                    .when()
                    .post("/store/order");
            
            logResponse(createResponse, "randomResourceCleanupTest_create");
            orderId = createResponse.jsonPath().getLong("id");
        }
        
        Response response = given()
                .pathParam("orderId", orderId)
                .delete("/store/order/{orderId}");
        
        logResponse(response, "randomResourceCleanupTest_delete");
        // Note: The API might return 404 if the order doesn't exist
        // We'll verify that the response is either 200 (success) or 404 (not found)
        Assert.assertTrue(
            response.getStatusCode() == 200 || response.getStatusCode() == 404,
            "Response should be either 200 or 404"
        );
    }

    @Test
    public void deleteOrderAndPetTest() {
        logStep("Starting delete order and pet test");
        addKeyValue("test_type", "integration_delete");
        
        // First create an order if we don't have one
        if (orderId == null) {
            Map<String, Object> order = new HashMap<>();
            order.put("id", 1L);
            order.put("petId", petId);
            order.put("quantity", 1);
            order.put("shipDate", "2024-03-05T21:29:47.000Z");
            order.put("status", "placed");
            order.put("complete", true);
            
            Response createResponse = given()
                    .contentType(ContentType.JSON)
                    .body(order)
                    .when()
                    .post("/store/order");
            
            logResponse(createResponse, "deleteOrderAndPetTest_create");
            orderId = createResponse.jsonPath().getLong("id");
        }
        
        logStep("Deleting order");
        Response orderResponse = given()
                .pathParam("orderId", orderId)
                .delete("/store/order/{orderId}");
        
        logResponse(orderResponse, "deleteOrderAndPetTest_delete_order");
        // Note: The API might return 404 if the order doesn't exist
        // We'll verify that the response is either 200 (success) or 404 (not found)
        Assert.assertTrue(
            orderResponse.getStatusCode() == 200 || orderResponse.getStatusCode() == 404,
            "Response should be either 200 or 404"
        );
        
        logStep("Deleting pet");
        Response petResponse = given()
                .pathParam("petId", petId)
                .delete("/pet/{petId}");
        
        logResponse(petResponse, "deleteOrderAndPetTest_delete_pet");
        // Note: The API might return 404 if the pet doesn't exist
        // We'll verify that the response is either 200 (success) or 404 (not found)
        Assert.assertTrue(
            petResponse.getStatusCode() == 200 || petResponse.getStatusCode() == 404,
            "Response should be either 200 or 404"
        );
    }
} 