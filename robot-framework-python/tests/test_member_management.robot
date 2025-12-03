*** Settings ***
Documentation    Tests for member management operations
Library          OperatingSystem
Suite Setup      Setup Python Path

*** Test Cases ***
Test Register New Member 
    [Documentation]    Verify registering a new member
    [Tags]    member    register    positive
    ${library}=    Create Library
    ${result}=    Call Method    ${library}    register_member    M001    John Doe    john@example.com    regular
    Should Contain    ${result}    registered successfully
    ${member}=    Call Method    ${library}    get_member    M001
    Should Be Equal    ${member.name}    John Doe

Test Register Member With Different Types 
    [Documentation]    Verify registering members with different membership types
    [Tags]    member    register    positive
    ${library}=    Create Library
    Call Method    ${library}    register_member    M001    John Doe    john@example.com    regular
    Call Method    ${library}    register_member    M002    Jane Smith    jane@example.com    premium
    Call Method    ${library}    register_member    M003    Bob Student    bob@example.com    student

    ${member1}=    Call Method    ${library}    get_member    M001
    ${member2}=    Call Method    ${library}    get_member    M002
    ${member3}=    Call Method    ${library}    get_member    M003

    Should Be Equal    ${member1.membership_type}    regular
    Should Be Equal    ${member2.membership_type}    premium
    Should Be Equal    ${member3.membership_type}    student

Test Register Duplicate Member ID 
    [Documentation]    Verify cannot register duplicate member ID
    [Tags]    member    register    negative
    ${library}=    Create Library
    Call Method    ${library}    register_member    M001    John Doe    john@example.com    regular
    ${result}=    Call Method    ${library}    register_member    M001    Jane Smith    jane@example.com    regular
    Should Contain    ${result}    already exists

Test Get Member By ID 
    [Documentation]    Verify retrieving member by ID
    [Tags]    member    get    positive
    ${library}=    Create Library With Members
    ${member}=    Call Method    ${library}    get_member    M002
    Should Be Equal    ${member.name}    Jane Smith
    Should Be Equal    ${member.email}    jane@example.com

Test Get Nonexistent Member 
    [Documentation]    Verify error when getting nonexistent member
    [Tags]    member    get    negative
    ${library}=    Create Library
    Run Keyword And Expect Error    *MemberNotFoundError*
    ...    Call Method    ${library}    get_member    M999

Test Remove Member 
    [Documentation]    Verify removing a member
    [Tags]    member    remove    positive
    ${library}=    Create Library With Members
    ${result}=    Call Method    ${library}    remove_member    M001
    Should Contain    ${result}    removed successfully
    Run Keyword And Expect Error    *MemberNotFoundError*
    ...    Call Method    ${library}    get_member    M001

Test Cannot Remove Member With Borrowed Books 
    [Documentation]    Verify cannot remove member who has borrowed books
    [Tags]    member    remove    negative
    ${library}=    Create Library With Books And Members
    Call Method    ${library}    borrow_book    M001    978-0451524935    2024-01-01
    ${result}=    Call Method    ${library}    remove_member    M001
    Should Contain    ${result}    has borrowed books

Test Suspend Member 
    [Documentation]    Verify suspending a member account
    [Tags]    member    suspend
    ${library}=    Create Library With Members
    Call Method    ${library}    suspend_member    M001
    ${member}=    Call Method    ${library}    get_member    M001
    Should Not Be True    ${member.is_active}

Test Reactivate Member 
    [Documentation]    Verify reactivating a suspended member
    [Tags]    member    reactivate
    ${library}=    Create Library With Members
    Call Method    ${library}    suspend_member    M001
    Call Method    ${library}    reactivate_member    M001
    ${member}=    Call Method    ${library}    get_member    M001
    Should Be True    ${member.is_active}

*** Keywords ***
Setup Python Path
    ${src_path}=    Normalize Path    ${CURDIR}/../src
    Evaluate    sys.path.insert(0, r"${src_path}")    modules=sys

Create Library
    ${library}=    Evaluate    library_system.LibrarySystem("Test Library")    modules=library_system
    RETURN    ${library}

Create Library With Members
    ${library}=    Create Library
    Call Method    ${library}    register_member    M001    John Doe    john@example.com    regular
    Call Method    ${library}    register_member    M002    Jane Smith    jane@example.com    premium
    Call Method    ${library}    register_member    M003    Bob Student    bob@example.com    student
    RETURN    ${library}

Create Library With Books And Members
    ${library}=    Create Library With Members
    Call Method    ${library}    add_book    978-0451524935    1984    George Orwell    1949    Fiction    2
    Call Method    ${library}    add_book    978-0743273565    The Great Gatsby    F. Scott Fitzgerald    1925    Fiction    2
    RETURN    ${library}