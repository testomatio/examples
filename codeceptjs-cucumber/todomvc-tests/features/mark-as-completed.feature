
@S896c33df
Feature: Mark as completed

Background:
    Given I have these todos on my list
      | name         |
      | Milk         |
      | Butter       |
      | Bread        |

@T8155455c
Scenario Outline: Mark todos as completed
  When I mark <completed> todos as completed
  Then I see that <activeTodo> todos are still active
  And I see that <completedTodo> has been completed

  Examples:
    | completed    | activeTodo | completedTodo |
    | 1            |     2      |      1        |
    | 3            |     1      |      2        |


@T5de0f0d0
Scenario: Unmark completed todos
  When I mark the first one as completed
  And I unmark the completed todo item
  Then I see that 4 todos are still active

@T5441906f
Scenario: Mark all todos as completed
  When I mark them all as completed
  Then I see that all 4 are completed

@T15e1a113
Scenario: Clear completed todos
  When I mark them all as completed
  When I clear all completed items
  Then I see that 0 has been completed
