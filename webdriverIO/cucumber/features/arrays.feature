Feature: Actions with arrays
    
    Scenario: Get array length
        When  I get the length of the array [1, 2, 3]
        Then return the length of the array [1, 2, 3] as 3

    Scenario: Find element in array
        When  I find the element 2 in the array [1, 2, 3]
        Then return the index of the element 2 in the array [1, 2, 3] as 1

    Scenario: Push element to array
        When  I push the element 4 to the array [1, 2, 3]
        Then return the array [1, 2, 3, 4]

    Scenario: Pop element from array
        When  I pop the element from the array [1, 2, 3]
        Then return the array [1, 2]

    Scenario: Shift element from array
        When  I shift the element from the array [1, 2, 3]
        Then return the array [2, 3]

    Scenario: Unshift element to array
        When  I unshift the element 0 to the array [1, 2, 3]
        Then return the array [0, 1, 2, 3]

    Scenario: Slice array
        When  I slice the array [1, 2, 3] from 1 to 2
        Then return the array [2]
    
    Scenario: Splice array
        When  I splice the array [1, 2, 3] from 1 to 2
        Then return the array [1, 3]