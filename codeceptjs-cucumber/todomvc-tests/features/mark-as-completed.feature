Feature: Mark as completed

Background:
    Given I have these todos on my list
      | name         |
      | Milk         |
      | Butter       |
      | Bread        |

Scenario: Mark todos as completed
  When I mark the first one as completed
  Then I see that 3 todos are still active
  And I see that 1 has been completed

Scenario: Unmark completed todos
  When I mark the first one as completed
  And I unmark the completed todo item
  Then I see that 4 todos are still active

Scenario: Mark all todos as completed
  When I mark them all as completed
  Then I see that all 4 are completed

Scenario: Clear completed todos
  When I mark them all as completed
  When I clear all completed items
  Then I see that all 0 are completed
