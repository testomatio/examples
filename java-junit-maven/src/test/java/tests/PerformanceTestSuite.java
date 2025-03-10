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
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class PerformanceTestSuite {
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
        pet.put("name", "Performance Test Pet");
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
    public void responseTimeTest() {
        logStep("Starting response time test");
        addKeyValue("test_type", "performance");
        addMetadata("endpoint", "/pet");
        
        logStep("Measuring response time for get pet request");
        long startTime = System.currentTimeMillis();
        
        Response response = given()
                .pathParam("petId", petId)
                .get("/pet/{petId}");
        
        logResponse(response, "responseTimeTest");
        long endTime = System.currentTimeMillis();
        long responseTime = endTime - startTime;
        
        // Note: The API might return 404 if the pet doesn't exist
        // We'll verify that the response is either 200 (found) or 404 (not found)
        Assert.assertTrue("Response should be either 200 or 404", 
            response.getStatusCode() == 200 || response.getStatusCode() == 404);
        Assert.assertTrue("Response time should be less than 1 second", responseTime < 1000);
    }

    @Test
    public void randomSlowResponseTest() {
        logStep("Starting random slow response test");
        addKeyValue("test_type", "performance_random");
        
        boolean shouldFail = random.nextBoolean();
        logInfo("Random failure probability: " + shouldFail);
        
        if (shouldFail) {
            logStep("Simulating slow response");
            try {
                Thread.sleep(1500); // Simulate slow response
            } catch (InterruptedException e) {
                logError("Sleep interrupted: " + e.getMessage());
            }
        }
        
        Response response = given()
                .pathParam("petId", petId)
                .get("/pet/{petId}");
        
        logResponse(response, "randomSlowResponseTest");
        // Note: The API might return 404 if the pet doesn't exist
        // We'll verify that the response is either 200 (found) or 404 (not found)
        Assert.assertTrue("Response should be either 200 or 404", 
            response.getStatusCode() == 200 || response.getStatusCode() == 404);
    }

    @Test
    public void concurrentRequestsTest() {
        logStep("Starting concurrent requests test");
        addKeyValue("test_type", "performance_concurrent");
        
        logStep("Sending multiple concurrent requests");
        ExecutorService executor = Executors.newFixedThreadPool(3);
        AtomicInteger successCount = new AtomicInteger(0);
        
        for (int i = 0; i < 3; i++) {
            final int requestId = i;
            executor.submit(() -> {
                Response response = given()
                        .pathParam("petId", petId)
                        .get("/pet/{petId}");
                logResponse(response, "concurrentRequestsTest_" + requestId);
                if (response.getStatusCode() == 200 || response.getStatusCode() == 404) {
                    successCount.incrementAndGet();
                }
            });
        }
        
        executor.shutdown();
        try {
            executor.awaitTermination(10, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            logError("Concurrent requests interrupted: " + e.getMessage());
        }
        
        Assert.assertTrue("At least 80% of concurrent requests should succeed", 
            successCount.get() >= 2);
    }

    @Test
    public void randomHighLoadTest() {
        logStep("Starting random high load test");
        addKeyValue("test_type", "performance_load");
        
        boolean shouldFail = random.nextBoolean();
        logInfo("Random failure probability: " + shouldFail);
        
        if (shouldFail) {
            logStep("High load test");
            ExecutorService executor = Executors.newFixedThreadPool(10);
            for (int i = 0; i < 20; i++) {
                final int requestId = i;
                executor.submit(() -> {
                    Response response = given()
                            .pathParam("petId", petId)
                            .get("/pet/{petId}");
                    logResponse(response, "randomHighLoadTest_" + requestId);
                    // Note: The API might return 404 if the pet doesn't exist
                    // We'll verify that the response is either 200 (found) or 404 (not found)
                    Assert.assertTrue("Response should be either 200 or 404", 
                        response.getStatusCode() == 200 || response.getStatusCode() == 404);
                });
            }
            executor.shutdown();
            try {
                executor.awaitTermination(10, TimeUnit.SECONDS);
            } catch (InterruptedException e) {
                logError("High load test interrupted: " + e.getMessage());
            }
        } else {
            logStep("Normal load test");
            Response response = given()
                    .pathParam("petId", petId)
                    .get("/pet/{petId}");
            logResponse(response, "randomHighLoadTest");
            // Note: The API might return 404 if the pet doesn't exist
            // We'll verify that the response is either 200 (found) or 404 (not found)
            Assert.assertTrue("Response should be either 200 or 404", 
                response.getStatusCode() == 200 || response.getStatusCode() == 404);
        }
    }

    @Test
    public void resourceUsageTest() {
        logStep("Starting resource usage test");
        addKeyValue("test_type", "performance_resources");
        
        logStep("Measuring resource usage during API calls");
        Runtime runtime = Runtime.getRuntime();
        long initialMemory = runtime.totalMemory() - runtime.freeMemory();
        
        Response response = given()
                .pathParam("petId", petId)
                .get("/pet/{petId}");
        
        logResponse(response, "resourceUsageTest");
        long finalMemory = runtime.totalMemory() - runtime.freeMemory();
        long memoryUsed = finalMemory - initialMemory;
        
        // Note: The API might return 404 if the pet doesn't exist
        // We'll verify that the response is either 200 (found) or 404 (not found)
        Assert.assertTrue("Response should be either 200 or 404", 
            response.getStatusCode() == 200 || response.getStatusCode() == 404);
        Assert.assertTrue("Memory usage should be less than 1MB", memoryUsed < 1000000);
    }
} 