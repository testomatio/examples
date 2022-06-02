@S5c0e0e61
Feature: Persist Todos

Background:
    Given I have these todos on my list
      | name         |
      | Milk         |
      | Butter       |
      | Bread        |

@T4686d7c1
Scenario: Todos survive a page refresh
  When I mark the first one as completed
  Then I still see the same todos