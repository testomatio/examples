import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import io.testomat.karate.hooks.KarateHookFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class KarateTest {

    @Test
    void testParallel() {

        Results results = Runner.path("classpath:karateTests")
            .hookFactory(new KarateHookFactory())
            .outputCucumberJson(true)
            .outputJunitXml(true)
            .parallel(1);

        Assertions.assertEquals(
            0,
            results.getFailCount(),
            results.getErrorMessages()
        );
    }
}