package com.testomat.karate;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class KarateTest {

    @Test
    void testAll() {
        Results results = Runner.path("classpath:simple-api-test.feature")
                .outputJunitXml(true)
                .parallel(1);
        assertTrue(results.getFailCount() == 0, results.getErrorMessages());
    }
}