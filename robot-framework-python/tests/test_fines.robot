*** Settings ***
Documentation    Tests for fine calculation and payment
Library          OperatingSystem
Suite Setup      Setup Python Path

*** Variables ***
${ISBN_1984}    978-0451524935

*** Test Cases ***
Test No Fine For On Time Return 
    [Documentation]    Verify no fine for returning book on time
    [Tags]    fine    positive
    ${library}=    Setup Library
    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01

    ${member}=    Call Method    ${library}    get_member    M001
    ${fine}=    Call Method    ${member}    calculate_fine    ${ISBN_1984}    2024-01-14
    Should Be Equal As Numbers    ${fine}    0.0

Test Fine For One Day Overdue 
    [Documentation]    Verify fine for 1 day overdue
    [Tags]    fine    overdue
    ${library}=    Setup Library
    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01

    ${member}=    Call Method    ${library}    get_member    M001
    ${fine}=    Call Method    ${member}    calculate_fine    ${ISBN_1984}    2024-01-16
    Should Be Equal As Numbers    ${fine}    0.5

Test Fine For Multiple Days Overdue 
    [Documentation]    Verify fine for multiple days overdue
    [Tags]    fine    overdue
    ${library}=    Setup Library
    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01

    ${member}=    Call Method    ${library}    get_member    M001
    ${fine}=    Call Method    ${member}    calculate_fine    ${ISBN_1984}    2024-01-25
    Should Be Equal As Numbers    ${fine}    5.0

Test Add Fine To Member Account 
    [Documentation]    Verify adding fine to member account
    [Tags]    fine    add
    ${library}=    Setup Library
    ${member}=    Call Method    ${library}    get_member    M001

    Call Method    ${member}    add_fine    10.50
    Should Be Equal As Numbers    ${member.fine_amount}    10.50

Test Pay Fine Full Amount 
    [Documentation]    Verify paying full fine amount
    [Tags]    fine    payment
    ${library}=    Setup Library
    ${member}=    Call Method    ${library}    get_member    M001

    Call Method    ${member}    add_fine    20.00
    ${remaining}=    Call Method    ${member}    pay_fine    20.00
    Should Be Equal As Numbers    ${remaining}    0.0

Test Pay Fine Partial Amount 
    [Documentation]    Verify paying partial fine amount
    [Tags]    fine    payment
    ${library}=    Setup Library
    ${member}=    Call Method    ${library}    get_member    M001

    Call Method    ${member}    add_fine    50.00
    ${remaining}=    Call Method    ${member}    pay_fine    30.00
    Should Be Equal As Numbers    ${remaining}    20.0

Test Pay More Than Fine Amount 
    [Documentation]    Verify paying more than owed adjusts to actual amount
    [Tags]    fine    payment    edge-case
    ${library}=    Setup Library
    ${member}=    Call Method    ${library}    get_member    M001

    Call Method    ${member}    add_fine    10.00
    ${remaining}=    Call Method    ${member}    pay_fine    50.00
    Should Be Equal As Numbers    ${remaining}    0.0

Test Multiple Fines Accumulate 
    [Documentation]    Verify multiple fines accumulate
    [Tags]    fine    accumulate
    ${library}=    Setup Library
    ${member}=    Call Method    ${library}    get_member    M001

    Call Method    ${member}    add_fine    5.00
    Call Method    ${member}    add_fine    3.50
    Call Method    ${member}    add_fine    2.00
    Should Be Equal As Numbers    ${member.fine_amount}    10.50

Test Get Members With Fines 
    [Documentation]    Verify getting all members with outstanding fines
    [Tags]    fine    statistics
    ${library}=    Setup Library

    # Add fines to some members
    ${member1}=    Call Method    ${library}    get_member    M001
    ${member2}=    Call Method    ${library}    get_member    M002
    Call Method    ${member1}    add_fine    10.00
    Call Method    ${member2}    add_fine    5.00

    ${members_with_fines}=    Call Method    ${library}    get_members_with_fines
    ${count}=    Get Length    ${members_with_fines}
    Should Be Equal As Integers    ${count}    2

*** Keywords ***
Setup Python Path
    ${src_path}=    Normalize Path    ${CURDIR}/../src
    Evaluate    sys.path.insert(0, r"${src_path}")    modules=sys

Setup Library
    ${library}=    Evaluate    library_system.LibrarySystem("Test Library")    modules=library_system
    Call Method    ${library}    add_book    ${ISBN_1984}    1984    George Orwell    1949    Fiction    2
    Call Method    ${library}    register_member    M001    John Doe    john@example.com    regular
    Call Method    ${library}    register_member    M002    Jane Smith    jane@example.com    premium
    RETURN    ${library}