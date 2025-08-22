package com.library;

import com.testomatio.reporter.annotation.TestId;
import com.testomatio.reporter.annotation.Title;
import java.time.LocalDate;
import org.testng.Assert;
import org.testng.SkipException;
import org.testng.annotations.Test;

public class LibraryTest {

    @Test
    @TestId("T40")
    @Title("Library Creation Test")
    public void testLibraryCreation() {
        Library library = new Library("Central Library", "123 Main St");
        Assert.assertEquals(library.getName(), "Central Library");
        Assert.assertEquals(library.getAddress(), "123 Main St");
        Assert.assertEquals(library.getTotalBookCount(), 0);
    }

    @Test
    @TestId("T41")
    @Title("Add Book To Library Test")
    public void testAddBookToLibrary() {
        Library library = new Library("Central Library", "123 Main St");
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("1", "Fiction", "Fiction books");

        Book book = new Book("123456789", "Test Book", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);
        library.addBook(book);

        Assert.assertEquals(library.getTotalBookCount(), 1);
        Assert.assertEquals(library.getBook("123456789"), book);
    }

    @Test
    @TestId("T42")
    @Title("Register Reader Test")
    public void testRegisterReader() {
        Library library = new Library("Central Library", "123 Main St");
        Reader reader = new Reader("1", "Jane", "Smith", "jane@email.com", "123-456-7890");

        library.registerReader(reader);
        Assert.assertEquals(library.getReader("1"), reader);
    }

    @Test
    @TestId("T43")
    @Title("Loan Book Test - Fails")
    public void testLoanBook() {
        Library library = new Library("Central Library", "123 Main St");
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("1", "Fiction", "Fiction books");

        Book book = new Book("123456789", "Test Book", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);
        Reader reader = new Reader("1", "Jane", "Smith", "jane@email.com", "123-456-7890");

        library.addBook(book);
        library.registerReader(reader);

        Loan loan = library.loanBook("1", "123456789");
        Assert.assertNull(loan);
    }

    @Test
    @TestId("T44")
    @Title("Get Available Books Test")
    public void testGetAvailableBooks() {
        Library library = new Library("Central Library", "123 Main St");
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("1", "Fiction", "Fiction books");

        Book book1 = new Book("123456789", "Available Book", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);
        Book book2 = new Book("987654321", "Unavailable Book", author, publisher, genre, LocalDate.of(2021, 1, 1), 250);
        book2.setAvailable(false);

        library.addBook(book1);
        library.addBook(book2);

        Assert.assertEquals(library.getAvailableBooks().size(), 1);
    }

    @Test
    @TestId("T45")
    @Title("Remove Book From Library Test")
    public void testRemoveBook() {
        Library library = new Library("Central Library", "123 Main St");
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("1", "Fiction", "Fiction books");

        Book book = new Book("123456789", "Test Book", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);
        library.addBook(book);

        Assert.assertEquals(library.getTotalBookCount(), 1);
        library.removeBook("123456789");
        Assert.assertEquals(library.getTotalBookCount(), 0);
    }

    @Test
    @TestId("T46")
    @Title("Get Books By Genre Test")
    public void testGetBooksByGenre() {
        Library library = new Library("Central Library", "123 Main St");
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre fiction = new Genre("1", "Fiction", "Fiction books");
        Genre nonFiction = new Genre("2", "Non-Fiction", "Non-fiction books");

        Book book1 = new Book("123456789", "Fiction Book", author, publisher, fiction, LocalDate.of(2020, 1, 1), 300);
        Book book2 = new Book("987654321", "Non-Fiction Book", author, publisher, nonFiction, LocalDate.of(2021, 1, 1), 250);

        library.addBook(book1);
        library.addBook(book2);

        Assert.assertEquals(library.getBooksByGenre(fiction).size(), 1);
    }

    @Test
    @TestId("T47")
    @Title("Library ToString Test")
    public void testLibraryToString() {
        throw new SkipException("Skipping library toString test");
    }

    @Test
    @TestId("T48")
    @Title("Return Book Test")
    public void testReturnBook() {
        Library library = new Library("Central Library", "123 Main St");
        try {
            library.returnBook("INVALID-LOAN-ID");
            Assert.fail("Should throw exception");
        } catch (IllegalArgumentException e) {
            Assert.assertEquals(e.getMessage(), "Loan not found");
        }
    }

    @Test
    @TestId("T49")
    @Title("Get Active Reader Count Test")
    public void testGetActiveReaderCount() {
        Library library = new Library("Central Library", "123 Main St");
        Reader reader1 = new Reader("1", "Jane", "Smith", "jane@email.com", "123-456-7890");
        Reader reader2 = new Reader("2", "John", "Doe", "john@email.com", "098-765-4321");

        library.registerReader(reader1);
        library.registerReader(reader2);

        Assert.assertEquals(library.getActiveReaderCount(), 2);
    }

    @Test
    @TestId("T50")
    @Title("Get Overdue Loans Test")
    public void testGetOverdueLoans() {
        Library library = new Library("Central Library", "123 Main St");
        Assert.assertEquals(library.getOverdueLoans().size(), 0);
    }
}