Feature: Posts API

  Background:
    * url 'https://jsonplaceholder.typicode.com'
    * def assertStatus = Java.type('helpers.AssertStatus')

  @Title:Get_all_posts @TtestId:Tpost0001 @attachments:logs/karate.log
  Scenario: Get all posts
    Given path 'posts'
    When method get
    Then eval assertStatus.checkStatusCode(responseStatus, 200)
    And match response[0].id != null

  @Title:Get_single_post @TtestId:Tpost0002
  Scenario: Get single post
    Given path 'posts', 1
    When method get
    Then eval assertStatus.checkStatusCode(responseStatus, 200)
    And match response.id == 1

  @Title:Get_comments_for_post @TtestId:Tpost0003
  Scenario: Get comments for post
    Given path 'posts', 1, 'comments'
    When method get
    Then eval assertStatus.checkStatusCode(responseStatus, 200)
    And match response[0].postId == 1

  @Title:Validate_post_titles
  Scenario Outline: Validate post titles <TestId>
    Given path 'posts', <id>
    When method get
    Then eval assertStatus.checkStatusCode(responseStatus, 200)
    And match response.title != null

    Examples:
      | id | TestId    |
      | 1  | Tpost0041 |
      | 2  | Tpost0042 |
      | 3  | Tpost0043 |

  @Title:Create_post @TtestId:Tpost0005
  Scenario: Create post
    Given path 'posts'
    And request { title: 'foo', body: 'bar', userId: 1 }
    When method post
    Then eval assertStatus.checkStatusCode(responseStatus, 200)
    And match response.id != null
