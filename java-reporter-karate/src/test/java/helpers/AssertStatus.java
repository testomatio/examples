package helpers;

import io.testomat.core.annotation.Step;

public class AssertStatus {

    @Step("Actual code is {0}\nExpected code is {1}")
    public static void checkStatusCode(int actual, int expected) {
        if (actual != expected) {
            throw new AssertionError(
                "Expected HTTP status " + expected + " but was " + actual
            );
        }
    }

}
