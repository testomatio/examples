@Sa4126efa
Feature: Edit/Delete Todos

Background:
    Given I have these todos on my list
      | name         |
      | Milk         |
      | Butter       |
      | Bread        |

Scenario: Edited todo is saved on blur
  When I edit the first todo
  Then I see that the todo text has been changed

Scenario: Delete todos
  When I delete the first todo
  Then the todo should disappear from the list
