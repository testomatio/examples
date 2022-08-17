
@S9cf04931
Feature: Persist Todos

Background:
    Given I have these todos on my list
      | name         |
      | Milk         |
      | Butter       |
      | Bread        |

@Td59c9f0b
Scenario: Todos survive a page refresh
  When I mark the first one as completed
  Then I still see the same todos
