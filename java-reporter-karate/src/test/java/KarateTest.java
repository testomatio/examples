import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import hooks.MyHook;
import io.testomat.karate.hooks.KarateHookFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class KarateTest {

    @Test
    void testParallel() {

        Results results = Runner.path("classpath:karateTests")
            .hookFactory(KarateHookFactory.create(MyHook::new))
            .outputCucumberJson(true)
            .outputJunitXml(true)
            .parallel(4);

        Assertions.assertEquals(
            0,
            results.getFailCount(),
            results.getErrorMessages()
        );
    }
}