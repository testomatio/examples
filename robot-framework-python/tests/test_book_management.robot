*** Settings ***
Documentation    Tests for book management operations
Library          OperatingSystem
Suite Setup      Setup Python Path

*** Variables ***
${ISBN_1984}        978-0451524935
${ISBN_GATSBY}      978-0743273565

*** Test Cases ***
Test Add Single Book 
    [Documentation]    Verify adding a single book to library
    [Tags]    book    add    positive
    ${library}=    Create Library
    ${result}=    Call Method    ${library}    add_book    ${ISBN_1984}    1984    George Orwell    1949    Fiction    1
    Should Contain    ${result}    Added 1 copy
    ${book}=    Call Method    ${library}    get_book    ${ISBN_1984}
    Should Be Equal    ${book.title}    1984

Test Add Multiple Copies 
    [Documentation]    Verify adding multiple copies of a book
    [Tags]    book    add    positive
    ${library}=    Create Library
    Call Method    ${library}    add_book    ${ISBN_1984}    1984    George Orwell    1949    Fiction    5
    ${book}=    Call Method    ${library}    get_book    ${ISBN_1984}
    Should Be Equal As Integers    ${book.total_copies}    5
    Should Be Equal As Integers    ${book.available_copies}    5

Test Add Same Book Increases Copies 
    [Documentation]    Verify adding existing book increases copy count
    [Tags]    book    add    positive
    ${library}=    Create Library
    Call Method    ${library}    add_book    ${ISBN_1984}    1984    George Orwell    1949    Fiction    2
    Call Method    ${library}    add_book    ${ISBN_1984}    1984    George Orwell    1949    Fiction    3
    ${book}=    Call Method    ${library}    get_book    ${ISBN_1984}
    Should Be Equal As Integers    ${book.total_copies}    5

Test Get Book By ISBN 
    [Documentation]    Verify retrieving book by ISBN
    [Tags]    book    get    positive
    ${library}=    Create Library With Books
    ${book}=    Call Method    ${library}    get_book    ${ISBN_GATSBY}
    Should Be Equal    ${book.title}    The Great Gatsby
    Should Be Equal    ${book.author}    F. Scott Fitzgerald

Test Get Nonexistent Book 
    [Documentation]    Verify error when getting nonexistent book
    [Tags]    book    get    negative
    ${library}=    Create Library
    Run Keyword And Expect Error    *BookNotFoundError*
    ...    Call Method    ${library}    get_book    999-9999999999

Test Remove Book 
    [Documentation]    Verify removing a book from library
    [Tags]    book    remove    positive
    ${library}=    Create Library With Books
    ${result}=    Call Method    ${library}    remove_book    ${ISBN_1984}
    Should Contain    ${result}    removed successfully
    Run Keyword And Expect Error    *BookNotFoundError*
    ...    Call Method    ${library}    get_book    ${ISBN_1984}

Test Cannot Remove Borrowed Book 
    [Documentation]    Verify cannot remove book that is borrowed
    [Tags]    book    remove    negative
    ${library}=    Create Library With Books And Members
    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01
    ${result}=    Call Method    ${library}    remove_book    ${ISBN_1984}
    Should Contain    ${result}    Cannot remove book

Test Get Total Books Count 
    [Documentation]    Verify total books count
    [Tags]    book    statistics
    ${library}=    Create Library With Books
    ${count}=    Call Method    ${library}    get_total_books_count
    Should Be Equal As Integers    ${count}    4

Test Get Available Books Count 
    [Documentation]    Verify available books count
    [Tags]    book    statistics
    ${library}=    Create Library With Books And Members
    Call Method    ${library}    borrow_book    M001    ${ISBN_1984}    2024-01-01
    ${count}=    Call Method    ${library}    get_available_books_count
    Should Be Equal As Integers    ${count}    3

*** Keywords ***
Setup Python Path
    ${src_path}=    Normalize Path    ${CURDIR}/../src
    Evaluate    sys.path.insert(0, r"${src_path}")    modules=sys

Create Library
    ${library}=    Evaluate    library_system.LibrarySystem("Test Library")    modules=library_system
    RETURN    ${library}

Create Library With Books
    ${library}=    Create Library
    Call Method    ${library}    add_book    ${ISBN_1984}    1984    George Orwell    1949    Fiction    2
    Call Method    ${library}    add_book    ${ISBN_GATSBY}    The Great Gatsby    F. Scott Fitzgerald    1925    Fiction    2
    RETURN    ${library}

Create Library With Books And Members
    ${library}=    Create Library With Books
    Call Method    ${library}    register_member    M001    John Doe    john@example.com    regular
    Call Method    ${library}    register_member    M002    Jane Smith    jane@example.com    premium
    RETURN    ${library}