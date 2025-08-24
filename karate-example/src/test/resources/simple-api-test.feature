Feature: Pet Store API Testing

# This feature demonstrates proper Karate-Testomat.io integration
# Each Scenario Outline example has a unique @T... ID for proper test separation

Background:
  * url 'https://petstore.swagger.io/v2'

Scenario Outline: Get pet by ID - Pet <petId> @<testId>
  # Test retrieving pets with different IDs and expected status codes
  Given path 'pet', <petId>
  When method get
  Then status <expectedStatus>
  # Log successful retrievals for debugging
  * if (<expectedStatus> == 200) karate.log('Pet found:', response.name)
  # Log not found cases for debugging
  * if (<expectedStatus> == 404) karate.log('Pet not found for ID:', <petId>)

Examples:
| petId | expectedStatus | testId     |
| 1     | 200           | T1a2b3c4d  |
| 2     | 200           | T5e6f7g8h  |
| 999   | 404           | T9i0j1k2l  |

Scenario Outline: Add new pet - <petName> @<testId>
  # Test creating new pets with different data
  * def petData = { "id": <petId>, "name": "<petName>", "status": "available" }
  Given path 'pet'
  And request petData
  When method post
  Then status <expectedStatus>
  # Validate response contains the pet data
  * if (<expectedStatus> == 200) match response.name == '<petName>'
  * if (<expectedStatus> == 200) match response.id == <petId>

Examples:
| petId | petName | expectedStatus | testId     |
| 1001  | Buddy   | 200           | Tm3n4o5p6  |
| 1002  | Rex     | 200           | Tq7r8s9t0  |
| 1003  | Fluffy  | 200           | Tu1v2w3x4  |