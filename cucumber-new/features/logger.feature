@S11a3f34d
Feature: Logger

 @Tbf55a53a
	Scenario: Intercept console message
		When The logger intercepts console message
    Then log message should be added to report
