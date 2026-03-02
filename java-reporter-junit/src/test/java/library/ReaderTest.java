package library;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.library.Author;
import com.library.Book;
import com.library.Genre;
import com.library.LibraryCard;
import com.library.Loan;
import com.library.Publisher;
import com.library.Reader;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;

@Execution(ExecutionMode.CONCURRENT)
public class ReaderTest {

    private Reader reader;

    private Loan loan1;

    private Loan loan2;

    @BeforeEach
    void setUp() {
        reader = new Reader("R001", "Alice", "Johnson", "alice@example.com", "123-456-7890");
        Author author = new Author("A001", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("P001", "Test Publisher", "123 Main St", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("G001", "Fiction", "Fictional works");
        Book book1 = new Book("978-1-11111-11-1", "Book 1", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);
        Book book2 = new Book("978-2-22222-22-3", "Book 2", author, publisher, genre, LocalDate.of(2021, 1, 1), 400);
        loan1 = new Loan("L001", book1, reader, LocalDate.now());
        loan2 = new Loan("L002", book2, reader, LocalDate.now().minusDays(20));
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testReaderCreation() {
        assertNotNull(reader);
        assertEquals("R001", reader.getId());
        assertEquals("Alice", reader.getFirstName());
        assertEquals("Johnson", reader.getLastName());
        assertTrue(reader.isActive());
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testGetFullName() {
        assertEquals("Alice Johnson", reader.getFullName());
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testRegistrationDate() {
        assertEquals(LocalDate.now(), reader.getRegistrationDate());
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testAddLoan() {
        reader.addLoan(loan1);
        assertEquals(1, reader.getLoanHistory().size());
        assertTrue(reader.getLoanHistory().contains(loan1));
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testGetActiveLoans() {
        reader.addLoan(loan1);
        reader.addLoan(loan2);
        loan2.setReturnDate(LocalDate.now());
        var activeLoans = reader.getActiveLoans();
        assertEquals(1, activeLoans.size());
        assertTrue(activeLoans.contains(loan1));
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testCanBorrowWhenActive() {
        assertTrue(reader.canBorrow());
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testCanBorrowWhenInactive() {
        reader.setActive(false);
        assertFalse(reader.canBorrow());
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testCanBorrowWithMaxLoans() {
        for (int i = 0; i < 5; i++) {
            reader.addLoan(new Loan("L00" + i, null, reader, LocalDate.now()));
        }
        assertFalse(reader.canBorrow());
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testSetLibraryCard() {
        LibraryCard card = new LibraryCard("1234567890123456", reader);
        reader.setLibraryCard(card);
        assertEquals(card, reader.getLibraryCard());
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testGetMembershipDays() {
        reader.setRegistrationDate(LocalDate.now().minusMonths(3));
        assertTrue(reader.getMembershipDays() >= 90);
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithSameId() {
        Reader reader2 = new Reader("R001", "Bob", "Smith", "bob@example.com", "987-654-3210");
        assertEquals(reader, reader2);
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithDifferentId() {
        Reader reader2 = new Reader("R002", "Alice", "Johnson", "alice@example.com", "123-456-7890");
        assertNotEquals(reader, reader2);
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testHashCode() {
        Reader reader2 = new Reader("R001", "Bob", "Smith", "bob@example.com", "987-654-3210");
        assertEquals(reader.hashCode(), reader2.hashCode());
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testToString() {
        String result = reader.toString();
        assertTrue(result.contains("R001"));
        assertTrue(result.contains("Alice Johnson"));
        assertTrue(result.contains("alice@example.com"));
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testSetters() {
        reader.setId("R002");
        reader.setFirstName("Bob");
        reader.setLastName("Smith");
        reader.setEmail("bob@example.com");
        reader.setPhone("987-654-3210");
        assertEquals("R002", reader.getId());
        assertEquals("Bob", reader.getFirstName());
        assertEquals("Smith", reader.getLastName());
        assertEquals("bob@example.com", reader.getEmail());
        assertEquals("987-654-3210", reader.getPhone());
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testLoanHistoryReturnsCopy() {
        reader.addLoan(loan1);
        var history = reader.getLoanHistory();
        history.clear();
        assertEquals(1, reader.getLoanHistory().size());
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithNull() {
        assertNotEquals(null, reader);
    }

    @Test
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithSameObject() {
        assertEquals(reader, reader);
    }
}
