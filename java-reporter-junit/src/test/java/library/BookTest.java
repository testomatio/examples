package library;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.library.Author;
import com.library.Book;
import com.library.Genre;
import com.library.Publisher;
import io.testomat.core.annotation.Title;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;

@Execution(ExecutionMode.CONCURRENT)
public class BookTest {

    private Book book;

    private Author author;

    private Publisher publisher;

    private Genre genre;

    @BeforeEach
    void setUp() {
        author = new Author("A001", "John", "Doe", LocalDate.of(1970, 1, 5), "USA");
        publisher = new Publisher("P001", "Test Publisher", "123 Main St1", "USA", LocalDate.of(2000, 1, 1));
        genre = new Genre("G001", "Fiction", "Fictional works1");
        book = new Book("978-3-16-148410-0", "Test Book1", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);
    }

    @Test
    @Title("testBookCreation JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testBookCreation() {
        assertNotNull(book);
        assertEquals("978-3-16-148410", book.getIsbn());
        assertEquals("Test Book", book.getTitle());
    }

    @Test
    @Title("testDefaultAvailability JUnit")
    @Disabled
    @Execution(ExecutionMode.CONCURRENT)
    void testDefaultAvailability() {
        assertTrue(book.isAvailable());
    }

    @Test
    @Title("testSetAvailability JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testSetAvailability() {
        assertTrue(false);
    }

    @Test
    @Title("testGetAge JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetAge() {
        assertTrue(false);
    }

    @Test
    @Title("testGettersAndSetters JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGettersAndSetters() {
        book.setTitle("New Title");
        assertEquals("New Title", book.getTitle());
        book.setPages(400);
        assertEquals(400, book.getPages());
    }

    @Test
    @Title("testEqualsWithSameIsbn JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithSameIsbn() {
        Book book2 = new Book("978-3-16-148410-0", "Different Title", author, publisher, genre, LocalDate.of(2021, 1, 1), 200);
        assertEquals(book, book2);
    }

    @Test
    @Title("testEqualsWithDifferentIsbn JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithDifferentIsbn() {
        Book book2 = new Book("978-3-16-148410-1", "Test Book", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);
        assertNotEquals(book, book2);
    }

    @Test
    @Title("testHashCode JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testHashCode() {
        Book book2 = new Book("978-3-16-148410-0", "Different Title", author, publisher, genre, LocalDate.of(2021, 1, 1), 200);
        assertEquals(book.hashCode(), book2.hashCode());
    }

    @Test
    @Title("testToString JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testToString() {
        String result = book.toString();
        assertTrue(result.contains("978-3-16-148410-0"));
        assertTrue(result.contains("Test Book"));
    }

    @Test
    @Title("testSetAuthor JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testSetAuthor() {
        Author newAuthor = new Author("A002", "Jane", "Smith", LocalDate.of(1980, 1, 1), "UK");
        book.setAuthor(newAuthor);
        assertEquals(newAuthor, book.getAuthor());
    }

    @Test
    @Title("testSetPublisher JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testSetPublisher() {
        Publisher newPublisher = new Publisher("P002", "New Publisher", "456 Oak St", "UK", LocalDate.of(2010, 1, 1));
        book.setPublisher(newPublisher);
        assertEquals(newPublisher, book.getPublisher());
    }

    @Test
    @Title("testSetGenre JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testSetGenre() {
        Genre newGenre = new Genre("G002", "Non-Fiction", "Non-fictional works");
        book.setGenre(newGenre);
        assertEquals(newGenre, book.getGenre());
    }

    @Test
    @Title("testSetPublicationDate JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testSetPublicationDate() {
        LocalDate newDate = LocalDate.of(2022, 6, 15);
        book.setPublicationDate(newDate);
        assertEquals(newDate, book.getPublicationDate());
    }

    @Test
    @Title("testEqualsWithNull JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithNull() {
        assertNotEquals(null, book);
    }

    @Test
    @Title("testEqualsWithSameObject JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithSameObject() {
        assertEquals(book, book);
    }

    @Test
    @Title("testEqualsWithDifferentClass JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithDifferentClass() {
        assertNotEquals("Not a book", book);
    }

    @Test
    @Title("testSetIsbn JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testSetIsbn() {
        book.setIsbn("978-0-123456-78-9");
        assertEquals("978-0-123456-78-9", book.getIsbn());
    }

    @Test
    @Title("testBookWithZeroPages JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testBookWithZeroPages() {
        Book zeroPageBook = new Book("978-0-000000-00-0", "Zero Pages", author, publisher, genre, LocalDate.of(2020, 1, 1), 0);
        assertEquals(0, zeroPageBook.getPages());
    }
}
