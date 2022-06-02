@Sbcee2c92
Feature: Create Todos with BDD

@Tfbfa3242
Scenario: Create a single todo item @bdd
  Given I have an empty todo list
  When I create a todo 1
  Then I see the new todo on my list

@T0f379098
Scenario: Create multiple todos @bdd
  Given I have these todos on my list
    | name         |
    | Milk         |
    | Butter       |
    | Bread        |
  Then  I see 4 todos on my list