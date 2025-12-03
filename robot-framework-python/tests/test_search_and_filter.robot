*** Settings ***
Documentation    Tests for search and filter functionality
Library          OperatingSystem
Suite Setup      Setup Python Path

*** Test Cases ***
Test Search Books By Title Exact Match 
    [Documentation]    Verify searching books by exact title
    [Tags]    search    title    positive
    ${library}=    Setup Library With Books
    ${results}=    Call Method    ${library}    search_books_by_title    1984
    ${count}=    Get Length    ${results}
    Should Be Equal As Integers    ${count}    1
    Should Be Equal    ${results[0].title}    1984

Test Search Books By Title Partial Match 
    [Documentation]    Verify searching books by partial title
    [Tags]    search    title    positive
    ${library}=    Setup Library With Books
    ${results}=    Call Method    ${library}    search_books_by_title    Great
    ${count}=    Get Length    ${results}
    Should Be Equal As Integers    ${count}    1
    Should Be Equal    ${results[0].title}    The Great Gatsby

Test Search Books By Title Case Insensitive 
    [Documentation]    Verify title search is case insensitive
    [Tags]    search    title    positive
    ${library}=    Setup Library With Books
    ${results}=    Call Method    ${library}    search_books_by_title    GATSBY
    ${count}=    Get Length    ${results}
    Should Be Equal As Integers    ${count}    1

Test Search Books By Title No Results 
    [Documentation]    Verify search returns empty for no matches
    [Tags]    search    title    negative
    ${library}=    Setup Library With Books
    ${results}=    Call Method    ${library}    search_books_by_title    Nonexistent
    ${count}=    Get Length    ${results}
    Should Be Equal As Integers    ${count}    0

Test Search Books By Author 
    [Documentation]    Verify searching books by author
    [Tags]    search    author    positive
    ${library}=    Setup Library With Books
    ${results}=    Call Method    ${library}    search_books_by_author    Orwell
    ${count}=    Get Length    ${results}
    Should Be Equal As Integers    ${count}    1
    Should Be Equal    ${results[0].author}    George Orwell

Test Search Books By Author Partial Match 
    [Documentation]    Verify searching books by partial author name
    [Tags]    search    author    positive
    ${library}=    Setup Library With Books
    ${results}=    Call Method    ${library}    search_books_by_author    Scott
    ${count}=    Get Length    ${results}
    Should Be Equal As Integers    ${count}    1

Test Get Books By Genre 
    [Documentation]    Verify filtering books by genre
    [Tags]    filter    genre    positive
    ${library}=    Setup Library With Books
    ${results}=    Call Method    ${library}    get_books_by_genre    Fiction
    ${count}=    Get Length    ${results}
    Should Be Equal As Integers    ${count}    3

Test Get Books By Genre No Results 
    [Documentation]    Verify genre filter returns empty for no matches
    [Tags]    filter    genre    negative
    ${library}=    Setup Library With Books
    ${results}=    Call Method    ${library}    get_books_by_genre    Science
    ${count}=    Get Length    ${results}
    Should Be Equal As Integers    ${count}    0

Test Get Available Books 
    [Documentation]    Verify getting only available books
    [Tags]    filter    available    positive
    ${library}=    Setup Library With Books And Members

    # Borrow one book
    Call Method    ${library}    borrow_book    M001    978-0451524935    2024-01-01

    ${results}=    Call Method    ${library}    get_available_books
    ${count}=    Get Length    ${results}
    # 3 books total, 1 borrowed (but has 2 copies), so still 3 books available
    Should Be True    ${count} >= 2

Test Get Available Books When All Borrowed 
    [Documentation]    Verify available books list when copies are borrowed
    [Tags]    filter    available    edge-case
    ${library}=    Evaluate    library_system.LibrarySystem("Test Library")    modules=library_system
    Call Method    ${library}    add_book    ISBN-001    Test Book    Test Author    2024    Fiction    1
    Call Method    ${library}    register_member    M001    John Doe    john@example.com    regular

    # Borrow the only copy
    Call Method    ${library}    borrow_book    M001    ISBN-001    2024-01-01

    ${results}=    Call Method    ${library}    get_available_books
    ${count}=    Get Length    ${results}
    Should Be Equal As Integers    ${count}    0

*** Keywords ***
Setup Python Path
    ${src_path}=    Normalize Path    ${CURDIR}/../src
    Evaluate    sys.path.insert(0, r"${src_path}")    modules=sys

Setup Library With Books
    ${library}=    Evaluate    library_system.LibrarySystem("Test Library")    modules=library_system
    Call Method    ${library}    add_book    978-0451524935    1984    George Orwell    1949    Fiction    2
    Call Method    ${library}    add_book    978-0743273565    The Great Gatsby    F. Scott Fitzgerald    1925    Fiction    2
    Call Method    ${library}    add_book    978-0061120084    To Kill a Mockingbird    Harper Lee    1960    Fiction    2
    RETURN    ${library}

Setup Library With Books And Members
    ${library}=    Setup Library With Books
    Call Method    ${library}    register_member    M001    John Doe    john@example.com    regular
    RETURN    ${library}