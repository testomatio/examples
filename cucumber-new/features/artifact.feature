Feature: Artifact

	Scenario: Upload artifact
		When I add the artifact
		Then artifact should be attached to report
