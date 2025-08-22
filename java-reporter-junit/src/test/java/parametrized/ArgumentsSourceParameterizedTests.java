package parametrized;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import io.testomat.core.annotation.TestId;
import java.util.stream.Stream;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import org.junit.jupiter.params.provider.ArgumentsSource;

public class ArgumentsSourceParameterizedTests {

    static class PersonArgumentsProvider implements ArgumentsProvider {

        @Override
        public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
            return Stream.of(Arguments.of("Alice", 25, "Engineer"), Arguments.of("Bob", 30, "Manager"), Arguments.of("Charlie", 35, "Director"), Arguments.of("Alice", 25, "Engineer"), Arguments.of("Bob", 30, "Manager"), Arguments.of("Charlie", 35, "Director"), Arguments.of("Alice", 25, "Engineer"), Arguments.of("Bob", 30, "Manager"), Arguments.of("Charlie", 35, "Director"));
        }
    }

    static class NumberPairsProvider implements ArgumentsProvider {

        @Override
        public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
            return Stream.of(Arguments.of(1, 2), Arguments.of(3, 4), Arguments.of(5, 6), Arguments.of(1, 2), Arguments.of(3, 4), Arguments.of(5, 6), Arguments.of(1, 2), Arguments.of(3, 4), Arguments.of(5, 6));
        }
    }

    static class ProductDataProvider implements ArgumentsProvider {

        @Override
        public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
            return Stream.of(Arguments.of("iPhone", 999.99, true), Arguments.of("Samsung Galaxy", 799.99, true), Arguments.of("Nokia 3310", 49.99, false), Arguments.of("iPhone", 999.99, true), Arguments.of("Samsung Galaxy", 799.99, true), Arguments.of("Nokia 3310", 49.99, false), Arguments.of("iPhone", 999.99, true), Arguments.of("Samsung Galaxy", 799.99, true), Arguments.of("Nokia 3310", 49.99, false));
        }
    }

    static class CalculationProvider implements ArgumentsProvider {

        @Override
        public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
            return Stream.of(Arguments.of(10, 5, 15, 50), Arguments.of(20, 8, 28, 160), Arguments.of(7, 3, 10, 21), Arguments.of(10, 5, 15, 50), Arguments.of(20, 8, 28, 160), Arguments.of(7, 3, 10, 21), Arguments.of(10, 5, 15, 50), Arguments.of(20, 8, 28, 160), Arguments.of(7, 3, 10, 21));
        }
    }

    static class StringValidationProvider implements ArgumentsProvider {

        @Override
        public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
            return Stream.of(Arguments.of("hello@example.com", true), Arguments.of("invalid-email", false), Arguments.of("test@domain.org", true), Arguments.of("hello@example.com", true), Arguments.of("invalid-email", false), Arguments.of("test@domain.org", true), Arguments.of("hello@example.com", true), Arguments.of("invalid-email", false), Arguments.of("test@domain.org", true));
        }
    }

    @ParameterizedTest(name = "Person: {0}, Age: {1}, Role: {2}")
    @ArgumentsSource(PersonArgumentsProvider.class)
    @TestId("0952de9d")
    void testPersonDataValidation(String name, int age, String role) {
        assertNotNull(name);
        assertTrue(age > 18);
        assertNotNull(role);
        assertTrue(name.length() >= 3);
        assertTrue(role.length() > 0);
    }

    @ParameterizedTest(name = "Numbers: {0} and {1}")
    @ArgumentsSource(NumberPairsProvider.class)
    @TestId("024b1ab3")
    void testNumberPairOperations(int first, int second) {
        assertTrue(first < second);
        assertTrue(first + second > 0);
        assertEquals(1, second - first);
    }

    @ParameterizedTest(name = " Product: {0}, Price: ${1}, Smartphone: {2}")
    @ArgumentsSource(ProductDataProvider.class)
    @TestId("d8852398")
    void testProductValidation(String productName, double price, boolean isSmartphone) {
        assertNotNull(productName);
        assertTrue(price > 0);
        if (isSmartphone) {
            assertTrue(price > 500);
        }
        assertTrue(productName.length() > 0);
    }

    @ParameterizedTest(name = "Math: {0} + {1} = {2}, {0} * {1} = {3}")
    @ArgumentsSource(CalculationProvider.class)
    @TestId("83312e71")
    void testMathematicalOperations(int a, int b, int sum, int product) {
        assertEquals(sum, a + b);
        assertEquals(product, a * b);
        assertTrue(a > 0);
        assertTrue(b > 0);
    }

    @ParameterizedTest(name = "String: {0}, Valid: {1}")
    @ArgumentsSource(StringValidationProvider.class)
    @TestId("d966ee94")
    void testStringValidation(String input, boolean isValid) {
        assertNotNull(input);
        if (isValid) {
            assertTrue(input.contains("@"));
        } else {
            assertFalse(input.contains("@"));
        }
        assertTrue(input.length() > 0);
    }
}
