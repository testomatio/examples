Feature: Logger

	Scenario: Intercept console message
		When The logger intercepts console message
    Then log message should be added to report
