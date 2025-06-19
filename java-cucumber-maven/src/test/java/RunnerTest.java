import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = "src/test/resources/features",
        glue = "steps",
        plugin = {
                "pretty",
                "html:target/cucumber-reports",
                "json:target/cucumber-reports/cucumber.json",
                "com.testomatio.reporter.core.framework_integration.CucumberListener"
        },
        tags = "not @ignore"
)
public class RunnerTest {
}