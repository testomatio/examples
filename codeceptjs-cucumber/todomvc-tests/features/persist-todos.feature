Feature: Persist Todos

Background:
    Given I have these todos on my list
      | name         |
      | Milk         |
      | Butter       |
      | Bread        |

Scenario: Todos survive a page refresh
  When I mark the first one as completed
  Then I still see the same todos