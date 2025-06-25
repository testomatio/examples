package library;

import com.library.Author;
import com.library.Book;
import com.library.Genre;
import com.library.LibraryCard;
import com.library.Loan;
import com.library.Publisher;
import com.library.Reader;
import com.testomatio.reporter.annotation.TestId;
import com.testomatio.reporter.annotation.Title;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;

import static org.junit.jupiter.api.Assertions.*;

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
    @TestId("TJunit37")
    @Title("testReaderCreation JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testReaderCreation() {
        assertNotNull(reader);
        assertEquals("R001", reader.getId());
        assertEquals("Alice", reader.getFirstName());
        assertEquals("Johnson", reader.getLastName());
        assertTrue(reader.isActive());
    }
    
    @Test
    @TestId("TJunit38")
    @Title("testGetFullName JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetFullName() {
        assertEquals("Alice Johnson", reader.getFullName());
    }
    
    @Test
    @TestId("TJunit39")
    @Title("testRegistrationDate JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testRegistrationDate() {
        assertEquals(LocalDate.now(), reader.getRegistrationDate());
    }
    
    @Test
    @TestId("TJunit40")
    @Title("testAddLoan JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testAddLoan() {
        reader.addLoan(loan1);
        assertEquals(1, reader.getLoanHistory().size());
        assertTrue(reader.getLoanHistory().contains(loan1));
    }
    
    @Test
    @TestId("TJunit41")
    @Title("testGetActiveLoans JUnit")
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
    @TestId("TJunit42")
    @Title("testCanBorrowWhenActive JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testCanBorrowWhenActive() {
        assertTrue(reader.canBorrow());
    }
    
    @Test
    @TestId("TJunit43")
    @Title("testCanBorrowWhenInactive JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testCanBorrowWhenInactive() {
        reader.setActive(false);
        assertFalse(reader.canBorrow());
    }
    
    @Test
    @TestId("TJunit44")
    @Title("testCanBorrowWithMaxLoans JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testCanBorrowWithMaxLoans() {
        for (int i = 0; i < 5; i++) {
            reader.addLoan(new Loan("L00" + i, null, reader, LocalDate.now()));
        }
        assertFalse(reader.canBorrow());
    }
    
    @Test
    @TestId("TJunit45")
    @Title("testSetLibraryCard JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testSetLibraryCard() {
        LibraryCard card = new LibraryCard("1234567890123456", reader);
        reader.setLibraryCard(card);
        assertEquals(card, reader.getLibraryCard());
    }
    
    @Test
    @TestId("TJunit46")
    @Title("testGetMembershipDays JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetMembershipDays() {
        reader.setRegistrationDate(LocalDate.now().minusMonths(3));
        assertTrue(reader.getMembershipDays() >= 90);
    }
    
    @Test
    @TestId("TJunit47")
    @Title("testEqualsWithSameId JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithSameId() {
        Reader reader2 = new Reader("R001", "Bob", "Smith", "bob@example.com", "987-654-3210");
        assertEquals(reader, reader2);
    }
    
    @Test
    @TestId("TJunit48")
    @Title("testEqualsWithDifferentId JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithDifferentId() {
        Reader reader2 = new Reader("R002", "Alice", "Johnson", "alice@example.com", "123-456-7890");
        assertNotEquals(reader, reader2);
    }
    
    @Test
    @TestId("TJunit49")
    @Title("testHashCode JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testHashCode() {
        Reader reader2 = new Reader("R001", "Bob", "Smith", "bob@example.com", "987-654-3210");
        assertEquals(reader.hashCode(), reader2.hashCode());
    }
    
    @Test
    @TestId("TJunit50")
    @Title("testToString JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testToString() {
        String result = reader.toString();
        assertTrue(result.contains("R001"));
        assertTrue(result.contains("Alice Johnson"));
        assertTrue(result.contains("alice@example.com"));
    }
    
    @Test
    @TestId("TJunit51")
    @Title("testSetters JUnit")
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
    @TestId("TJunit52")
    @Title("testLoanHistoryReturnsCopy JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testLoanHistoryReturnsCopy() {
        reader.addLoan(loan1);
        var history = reader.getLoanHistory();
        history.clear();
        assertEquals(1, reader.getLoanHistory().size());
    }
    
    @Test
    @TestId("TJunit53")
    @Title("testEqualsWithNull JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithNull() {
        assertNotEquals(null, reader);
    }
    
    @Test
    @TestId("TJunit54")
    @Title("testEqualsWithSameObject JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithSameObject() {
        assertEquals(reader, reader);
    }
}