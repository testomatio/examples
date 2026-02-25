package hooks;

import com.intuit.karate.RuntimeHook;
import com.intuit.karate.Suite;
import com.intuit.karate.core.FeatureRuntime;
import com.intuit.karate.core.ScenarioRuntime;
import com.intuit.karate.core.Step;
import com.intuit.karate.core.StepResult;
import com.intuit.karate.http.HttpRequest;
import com.intuit.karate.http.Response;

public class MyHook implements RuntimeHook {

    public boolean beforeScenario(ScenarioRuntime sr) {
        System.out.println("!!! Before Scenario !!!");
        return true;
    }

    public void afterScenario(ScenarioRuntime sr) {
        System.out.println("!!! After Scenario !!!");
    }

    public void afterScenarioOutline(ScenarioRuntime sr) {
        System.out.println("!!! After Scenario Outline !!!");
    }

    public boolean beforeFeature(FeatureRuntime fr) {
        System.out.println("!!! Before Feature !!!");
        return true;
    }

    public void afterFeature(FeatureRuntime fr) {
        System.out.println("!!! After Feature !!!");
    }

    public void beforeSuite(Suite suite) {
        System.out.println("!!! Before Suite !!!");
    }

    public void afterSuite(Suite suite) {
        System.out.println("!!! After Suite !!!");
    }

    public boolean beforeStep(Step step, ScenarioRuntime sr) {
        System.out.println("!!! Before Step !!!");
        return true;
    }

    public void afterStep(StepResult result, ScenarioRuntime sr) {
        System.out.println("!!! After Step !!!");
    }

    public void beforeHttpCall(HttpRequest request, ScenarioRuntime sr) {
        System.out.println("!!! Before HttpCall !!!");
    }

    public void afterHttpCall(HttpRequest request, Response response, ScenarioRuntime sr) {
        System.out.println("!!! After HttpCall !!!");
    }

}
