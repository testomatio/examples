*** Settings ***
Documentation    Tests for book borrowing and returning
Library          OperatingSystem
Suite Setup      Setup Python Path

*** Variables ***
${ISBN_1984}    978-0451524935
${ISBN_GATSBY}  978-0743273565

*** Test Cases ***
Test Borrow Book Successfully 
    [Documentation]    Verify successful book borrowing
    [Tags]    borrow    positive
    ${library}=    Setup Library With Books And Members
    ${result}=    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01
    Should Contain    ${result}    borrowed by John Doe

    ${book}=    Call Method    ${library}    get_book    ${ISBN_1984}
    Should Be Equal As Integers    ${book.available_copies}    1

Test Borrow Multiple Books 
    [Documentation]    Verify member can borrow multiple books
    [Tags]    borrow    positive
    ${library}=    Setup Library With Books And Members
    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01
    Call Method    ${library}    borrow_book    M001    ${ISBN_GATSBY}    2024-01-01

    ${member}=    Call Method    ${library}    get_member    M001
    ${borrowed_count}=    Evaluate    len(${member.borrowed_books})
    Should Be Equal As Integers    ${borrowed_count}    2

Test Regular Member Book Limit 
    [Documentation]    Verify regular member cannot exceed 5 books
    [Tags]    borrow    limit    negative
    ${library}=    Setup Library With Many Books
    Call Method    ${library}    register_member    M001    John Doe    john@example.com    regular

    # Borrow 5 books (should succeed)
    FOR    ${i}    IN RANGE    5
        Call Method    ${library}    borrow_book    M001    ISBN-${i}    2024-01-01
    END

    # Try to borrow 6th book (should fail)
    Run Keyword And Expect Error    *MaxBooksExceededError*
    ...    Call Method    ${library}    borrow_book    M001    ISBN-5    2024-01-01

Test Premium Member Book Limit 
    [Documentation]    Verify premium member can borrow up to 10 books
    [Tags]    borrow    limit    positive
    ${library}=    Setup Library With Many Books
    Call Method    ${library}    register_member    M001    John Doe    john@example.com    premium

    # Borrow 10 books (should succeed)
    FOR    ${i}    IN RANGE    10
        Call Method    ${library}    borrow_book    M001    ISBN-${i}    2024-01-01
    END

    ${member}=    Call Method    ${library}    get_member    M001
    ${borrowed_count}=    Evaluate    len(${member.borrowed_books})
    Should Be Equal As Integers    ${borrowed_count}    10

Test Student Member Book Limit 
    [Documentation]    Verify student member cannot exceed 3 books
    [Tags]    borrow    limit    negative
    ${library}=    Setup Library With Many Books
    Call Method    ${library}    register_member    M001    Bob Student    bob@example.com    student

    # Borrow 3 books (should succeed)
    FOR    ${i}    IN RANGE    3
        Call Method    ${library}    borrow_book    M001    ISBN-${i}    2024-01-01
    END

    # Try to borrow 4th book (should fail)
    Run Keyword And Expect Error    *MaxBooksExceededError*
    ...    Call Method    ${library}    borrow_book    M001    ISBN-3    2024-01-01

Test Borrow Unavailable Book 
    [Documentation]    Verify cannot borrow unavailable book
    [Tags]    borrow    negative
    ${library}=    Setup Library With Books And Members

    # First member borrows both copies
    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01
    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01

    # Second member tries to borrow (should fail)
    Run Keyword And Expect Error    *BookNotAvailableError*
    ...    Call Method    ${library}    borrow_book    M002    ${ISBN_1984}    2024-01-01

Test Suspended Member Cannot Borrow 
    [Documentation]    Verify suspended member cannot borrow books
    [Tags]    borrow    suspended    negative
    ${library}=    Setup Library With Books And Members
    Call Method    ${library}    suspend_member    M001

    Run Keyword And Expect Error    *MaxBooksExceededError*Member account is suspended
    ...    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01

Test Return Book Successfully 
    [Documentation]    Verify successful book return
    [Tags]    return    positive
    ${library}=    Setup Library With Books And Members
    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01

    ${result}=    Call Method    ${library}    return_book    M001    ${ISBN_1984}    2024-01-10
    Should Contain    ${result}    returned

    ${book}=    Call Method    ${library}    get_book    ${ISBN_1984}
    Should Be Equal As Integers    ${book.available_copies}    2

Test Return Book Not Borrowed By Member 
    [Documentation]    Verify error when returning book not borrowed by member
    [Tags]    return    negative
    ${library}=    Setup Library With Books And Members

    ${result}=    Call Method    ${library}    return_book    M001    ${ISBN_1984}    2024-01-10
    Should Contain    ${result}    not borrowed

Test Return Book On Time No Fine 
    [Documentation]    Verify no fine for on-time return
    [Tags]    return    fine    positive
    ${library}=    Setup Library With Books And Members
    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01

    # Return within 14 days (loan period)
    ${result}=    Call Method    ${library}    return_book    M001    ${ISBN_1984}    2024-01-10
    Should Contain    ${result}    Fine: $0.00

Test Return Overdue Book With Fine 
    [Documentation]    Verify fine is calculated for overdue return
    [Tags]    return    fine    overdue
    ${library}=    Setup Library With Books And Members
    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01

    # Return after 20 days (6 days overdue)
    ${result}=    Call Method    ${library}    return_book    M001    ${ISBN_1984}    2024-01-21
    Should Contain    ${result}    Fine: $3.00

    ${member}=    Call Method    ${library}    get_member    M001
    Should Be Equal As Numbers    ${member.fine_amount}    3.0

*** Keywords ***
Setup Python Path
    ${src_path}=    Normalize Path    ${CURDIR}/../src
    Evaluate    sys.path.insert(0, r"${src_path}")    modules=sys

Setup Library With Books And Members
    ${library}=    Evaluate    library_system.LibrarySystem("Test Library")    modules=library_system
    Call Method    ${library}    add_book    ${ISBN_1984}    1984    George Orwell    1949    Fiction    2
    Call Method    ${library}    add_book    ${ISBN_GATSBY}    The Great Gatsby    F. Scott Fitzgerald    1925    Fiction    2
    Call Method    ${library}    register_member    M001    John Doe    john@example.com    regular
    Call Method    ${library}    register_member    M002    Jane Smith    jane@example.com    premium
    RETURN    ${library}

Setup Library With Many Books
    ${library}=    Evaluate    library_system.LibrarySystem("Test Library")    modules=library_system
    FOR    ${i}    IN RANGE    15
        Call Method    ${library}    add_book    ISBN-${i}    Book ${i}    Author ${i}    2024    Fiction    1
    END
    RETURN    ${library}