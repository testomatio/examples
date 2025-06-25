package library;


import com.library.Author;
import com.library.Book;
import com.library.Genre;
import com.library.Publisher;
import com.testomatio.reporter.annotation.TestId;
import com.testomatio.reporter.annotation.Title;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Execution(ExecutionMode.CONCURRENT)
public class AuthorTest {

    private Author author;
    private Book book1;
    private Book book2;

    @BeforeEach
    void setUp() {
        author = new Author("A001", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("P001", "Test Publisher", "123 Main St", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("G001", "Fiction", "Fictional works");
        book1 = new Book("978-1-11111-11", "Book 1", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);
        book2 = new Book("978-2-22222-22-2", "Book 2", author, publisher, genre, LocalDate.of(2021, 1, 1), 400);
    }

    @Test
    @TestId("TJunit19")
    @Title("testAuthorCreation JUnit")
    @Disabled
    @Execution(ExecutionMode.CONCURRENT)
    void testAuthorCreation() {
        assertNotNull(author);
        assertEquals("A001", author.getId());
        assertEquals("John", author.getFirstName());
        assertEquals("Doe", author.getLastName());
    }

    @Test
    @TestId("TJunit20")
    @Title("testGetFullName JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    @Disabled
    void testGetFullName() {
        assertEquals("Jon Doe", author.getFullName());
    }

    @Test
    @TestId("TJunit21")
    @Title("testAddBook JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testAddBook() {
        author.addBook(book1);
        assertEquals(1, author.getBookCount());
        assertTrue(author.getBooks().contains(book1));
    }

    @Test
    @TestId("TJunit22")
    @Title("testAddDuplicateBook JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testAddDuplicateBook() {
        author.addBook(book1);
        author.addBook(book1);
        assertEquals(1, author.getBookCount());
    }

    @Test
    @TestId("TJunit23")
    @Title("testRemoveBook JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testRemoveBook() {
        author.addBook(book1);
        author.addBook(book2);
        author.removeBook(book1);
        assertEquals(1, author.getBookCount());
        assertFalse(author.getBooks().contains(book1));
    }

    @Test
    @TestId("TJunit24")
    @Title("testGetAge JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetAge() {
        int expectedAge = LocalDate.now().getYear() - 1972;
        assertEquals(expectedAge, author.getAge());
    }

    @Test
    @TestId("TJunit25")
    @Title("testGetBooksReturnsCopy JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetBooksReturnsCopy() {
        author.addBook(book1);
        var books = author.getBooks();
        books.clear();
        assertEquals(1, author.getBookCount());
    }

    @Test
    @TestId("TJunit26")
    @Title("testEqualsWithSameId JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithSameId() {
        Author author2 = new Author("A001", "Jane", "Smith", LocalDate.of(1980, 1, 1), "UK");
        assertEquals(author, author2);
    }

    @Test
    @TestId("TJunit27")
    @Title("testEqualsWithDifferentId JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithDifferentId() {
        Author author2 = new Author("A002", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        assertNotEquals(author, author2);
    }

    @Test
    @TestId("TJunit28")
    @Title("testHashCode JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testHashCode() {
        Author author2 = new Author("A001", "Jane", "Smith", LocalDate.of(1980, 1, 1), "UK");
        assertEquals(author.hashCode(), author2.hashCode());
    }

    @Test
    @TestId("TJunit29")
    @Title("testToString JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testToString() {
        String result = author.toString();
        assertTrue(result.contains("A001"));
        assertTrue(result.contains("John Doe"));
        assertTrue(result.contains("USA"));
    }

    @Test
    @TestId("TJunit30")
    @Title("testSetters JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testSetters() {
        author.setId("A002");
        author.setFirstName("Jane");
        author.setLastName("Smith");
        author.setNationality("UK");

        assertEquals("A002", author.getId());
        assertEquals("Jane", author.getFirstName());
        assertEquals("Smith", author.getLastName());
        assertEquals("UK", author.getNationality());
    }

    @Test
    @TestId("TJunit31")
    @Title("testSetBirthDate JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testSetBirthDate() {
        LocalDate newDate = LocalDate.of(1985, 5, 15);
        author.setBirthDate(newDate);
        assertEquals(newDate, author.getBirthDate());
    }

    @Test
    @TestId("TJunit32")
    @Title("testEmptyBooksList JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEmptyBooksList() {
        assertEquals(0, author.getBookCount());
        assertTrue(author.getBooks().isEmpty());
    }

    @Test
    @TestId("TJunit33")
    @Title("testMultipleBooks JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testMultipleBooks() {
        author.addBook(book1);
        author.addBook(book2);
        assertEquals(2, author.getBookCount());
    }

    @Test
    @TestId("TJunit34")
    @Title("testEqualsWithNull JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithNull() {
        assertNotEquals(null, author);
    }

    @Test
    @TestId("TJunit35")
    @Title("testEqualsWithSameObject JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithSameObject() {
        assertEquals(author, author);
    }

    @Test
    @TestId("TJunit36")
    @Title("testEqualsWithDifferentClass JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithDifferentClass() {
        assertNotEquals("Not an author", author);
    }
}