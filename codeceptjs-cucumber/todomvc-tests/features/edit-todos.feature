
@S46d0a5d8
Feature: Edit/Delete Todos

Background:
    Given I have these todos on my list
      | name         |
      | Milk         |
      | Butter       |
      | Bread        |

@T44ff66c9
Scenario: Edited todo is saved on blur
  When I edit the first todo
  Then I see that the todo text has been changed

@T328a8019
Scenario: Delete todos
  When I delete the first todo
  Then the todo should disappear from the list
