package parametrized;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import java.time.LocalDate;
import java.util.stream.Stream;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

public class MultipleArgumentsParameterizedTests {

    static Stream<Arguments> provideComplexUserData() {
        return Stream.of(Arguments.of("john.doe", "john@example.com", 25, "Engineer", 75000.0), Arguments.of("jane.smith", "jane@company.com", 30, "Manager", 85000.0), Arguments.of("bob.johnson", "bob@firm.org", 35, "Director", 95000.0), Arguments.of("john.doe", "john@example.com", 25, "Engineer", 75000.0), Arguments.of("jane.smith", "jane@company.com", 30, "Manager", 85000.0), Arguments.of("bob.johnson", "bob@firm.org", 35, "Director", 95000.0), Arguments.of("john.doe", "john@example.com", 25, "Engineer", 75000.0), Arguments.of("jane.smith", "jane@company.com", 30, "Manager", 85000.0), Arguments.of("bob.johnson", "bob@firm.org", 35, "Director", 95000.0));
    }

    static Stream<Arguments> provideOrderCalculations() {
        return Stream.of(Arguments.of("Laptop", 2, 999.99, 0.1, 1799.98), Arguments.of("Mouse", 5, 29.99, 0.05, 142.45), Arguments.of("Keyboard", 3, 79.99, 0.08, 220.77), Arguments.of("Laptop", 2, 999.99, 0.1, 1799.98), Arguments.of("Mouse", 5, 29.99, 0.05, 142.45), Arguments.of("Keyboard", 3, 79.99, 0.08, 220.77), Arguments.of("Laptop", 2, 999.99, 0.1, 1799.98), Arguments.of("Mouse", 5, 29.99, 0.05, 142.45), Arguments.of("Keyboard", 3, 79.99, 0.08, 220.77));
    }

    static Stream<Arguments> provideDateRangeData() {
        return Stream.of(Arguments.of("2023-01-01", "2023-12-31", 365), Arguments.of("2024-01-01", "2024-12-31", 366), Arguments.of("2023-06-01", "2023-08-31", 92), Arguments.of("2023-01-01", "2023-12-31", 365), Arguments.of("2024-01-01", "2024-12-31", 366), Arguments.of("2023-06-01", "2023-08-31", 92), Arguments.of("2023-01-01", "2023-12-31", 365), Arguments.of("2024-01-01", "2024-12-31", 366), Arguments.of("2023-06-01", "2023-08-31", 92));
    }

    static Stream<Arguments> provideGeometryData() {
        return Stream.of(Arguments.of("Rectangle", 10.0, 5.0, 50.0, 30.0), Arguments.of("Square", 8.0, 8.0, 64.0, 32.0), Arguments.of("Triangle", 6.0, 4.0, 12.0, 20.0), Arguments.of("Rectangle", 10.0, 5.0, 50.0, 30.0), Arguments.of("Square", 8.0, 8.0, 64.0, 32.0), Arguments.of("Triangle", 6.0, 4.0, 12.0, 20.0), Arguments.of("Rectangle", 10.0, 5.0, 50.0, 30.0), Arguments.of("Square", 8.0, 8.0, 64.0, 32.0), Arguments.of("Triangle", 6.0, 4.0, 12.0, 20.0));
    }

    static Stream<Arguments> provideValidationScenarios() {
        return Stream.of(Arguments.of("password123", 8, true, true, false), Arguments.of("PASSWORD", 8, true, false, true), Arguments.of("Pass123!", 8, true, true, true), Arguments.of("password123", 8, true, true, false), Arguments.of("PASSWORD", 8, true, false, true), Arguments.of("Pass123!", 8, true, true, true), Arguments.of("password123", 8, true, true, false), Arguments.of("PASSWORD", 8, true, false, true), Arguments.of("Pass123!", 8, true, true, true));
    }

    @ParameterizedTest(name = "User data validation: {0}, {1}, age {2}, {3}, salary ${4}")
    @MethodSource("provideComplexUserData")
    void testComplexUserDataValidation(String username, String email, int age, String position, double salary) {
        assertNotNull(username);
        assertNotNull(email);
        assertTrue(age >= 18);
        assertNotNull(position);
        assertTrue(salary > 0);
        assertTrue(username.contains("."));
        assertTrue(email.contains("@"));
        assertTrue(age <= 65);
        assertTrue(position.length() > 3);
        assertTrue(salary >= 50000.0);
    }

    @ParameterizedTest(name = "Order calculation: {0} x{1} at ${2} with {3}% discount = ${4}")
    @MethodSource("provideOrderCalculations")
    void testOrderTotalCalculation(String item, int quantity, double unitPrice, double discount, double expectedTotal) {
        assertNotNull(item);
        assertTrue(quantity > 0);
        assertTrue(unitPrice > 0);
        assertTrue(discount >= 0 && discount < 1);
        double subtotal = quantity * unitPrice;
        double discountAmount = subtotal * discount;
        double actualTotal = subtotal - discountAmount;
        assertEquals(expectedTotal, actualTotal, 0.01);
    }

    @ParameterizedTest(name = "Date range: {0} to {1} = {2} days")
    @MethodSource("provideDateRangeData")
    void testDateRangeCalculations(String startDateStr, String endDateStr, int expectedDays) {
        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);
        assertNotNull(startDate);
        assertNotNull(endDate);
        assertTrue(endDate.isAfter(startDate));
        long actualDays = java.time.temporal.ChronoUnit.DAYS.between(startDate, endDate) + 1;
        assertEquals(expectedDays, actualDays);
    }

    @ParameterizedTest(name = "Geometry: {0} {1}x{2} area={3} perimeter={4}")
    @MethodSource("provideGeometryData")
    void testGeometricCalculations(String shape, double width, double height, double expectedArea, double expectedPerimeter) {
        assertNotNull(shape);
        assertTrue(width > 0);
        assertTrue(height > 0);
        double actualArea, actualPerimeter;
        switch(shape) {
            case "Rectangle":
            case "Square":
                actualArea = width * height;
                actualPerimeter = 2 * (width + height);
                break;
            case "Triangle":
                actualArea = 0.5 * width * height;
                actualPerimeter = width + height + Math.sqrt(width * width + height * height);
                break;
            default:
                fail("Unknown shape: " + shape);
                return;
        }
        assertEquals(expectedArea, actualArea, 0.01);
        assertEquals(expectedPerimeter, actualPerimeter, 0.01);
    }

    @ParameterizedTest(name = "Password validation: '{0}' minLen={1} digits={2} lower={3} upper={4}")
    @MethodSource("provideValidationScenarios")
    void testPasswordValidation(String password, int minLength, boolean hasDigits, boolean hasLower, boolean hasUpper) {
        assertNotNull(password);
        assertTrue(password.length() >= minLength);
        assertEquals(hasDigits, password.matches(".*\\d.*"));
        assertEquals(hasLower, password.matches(".*[a-z].*"));
        assertEquals(hasUpper, password.matches(".*[A-Z].*"));
    }
}
