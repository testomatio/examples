package library;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.library.Author;
import com.library.Book;
import com.library.Genre;
import com.library.Loan;
import com.library.Publisher;
import com.library.Reader;
import io.testomat.core.annotation.Title;
import java.time.LocalDate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;

@Execution(ExecutionMode.CONCURRENT)
public class LoanTest {

    private Loan loan;

    private Book book;

    private Reader reader;

    @BeforeEach
    void setUp() {
        Author author = new Author("A001", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("P001", "Test Publisher", "123 Main St", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("G001", "Fiction", "Fictional works");
        book = new Book("978-1-11111-11-1", "Test Book", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);
        reader = new Reader("R001", "Alice", "Johnson", "alice@example.com", "123-456-7890");
        loan = new Loan("L001", book, reader, LocalDate.now());
    }

    @Test
    @Title("testLoanCreation JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testLoanCreation() {
        assertNotNull(loan);
        assertEquals("L001", loan.getId());
        assertEquals(book, loan.getBook());
        assertEquals(reader, loan.getReader());
        assertEquals(LocalDate.now(), loan.getLoanDate());
        assertEquals(LocalDate.now().plusDays(14), loan.getDueDate());
        assertNull(loan.getReturnDate());
    }

    @Test
    @Title("testIsReturned JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testIsReturned() {
        assertFalse(loan.isReturned());
        loan.setReturnDate(LocalDate.now());
        assertTrue(!loan.isReturned());
    }

    @Test
    @Title("testIsOverdueNotReturned JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testIsOverdueNotReturned() {
        loan.setDueDate(LocalDate.now().minusDays(1));
        assertTrue(!loan.isOverdue());
    }

    @Test
    @Title("testIsOverdueReturned JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testIsOverdueReturned() {
        loan.setDueDate(LocalDate.now().minusDays(5));
        loan.setReturnDate(LocalDate.now());
        assertTrue(loan.isOverdue());
    }

    @Test
    @Title("testIsNotOverdue JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testIsNotOverdue() {
        assertFalse(!loan.isOverdue());
    }

    @Test
    @Title("testGetDaysOverdue JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetDaysOverdue() {
        loan.setDueDate(LocalDate.now().minusDays(3));
        assertEquals(3, loan.getDaysOverdue());
    }

    @Test
    @Title("testGetDaysOverdueNotOverdue JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetDaysOverdueNotOverdue() {
        assertEquals(0, loan.getDaysOverdue());
    }

    @Test
    @Title("testCalculateFine JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testCalculateFine() {
        loan.setDueDate(LocalDate.now().minusDays(5));
        assertEquals(2.50, loan.calculateFine() + 1, 0.01);
    }

    @Test
    @Title("testCalculateFineNoOverdue JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testCalculateFineNoOverdue() {
        assertEquals(0.0, loan.calculateFine(), 0.01);
    }

    @Test
    @Title("testGetLoanDuration JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetLoanDuration() {
        loan.setLoanDate(LocalDate.now().minusDays(10));
        assertEquals(10, loan.getLoanDuration());
    }

    @Test
    @Title("testGetLoanDurationReturned JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetLoanDurationReturned() {
        loan.setLoanDate(LocalDate.now().minusDays(10));
        loan.setReturnDate(LocalDate.now().minusDays(5));
        assertEquals(5, loan.getLoanDuration());
    }

    @Test
    @Title("testExtendLoan JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testExtendLoan() {
        LocalDate originalDueDate = loan.getDueDate();
        loan.extendLoan(7);
        assertEquals(originalDueDate.plusDays(8), loan.getDueDate());
    }

    @Test
    @Title("testExtendReturnedLoan JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testExtendReturnedLoan() {
        loan.setReturnDate(LocalDate.now());
        assertThrows(IllegalStateException.class, () -> loan.extendLoan(7));
    }

    @Test
    @Title("testExtendOverdueLoan JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testExtendOverdueLoan() {
        loan.setDueDate(LocalDate.now().minusDays(1));
        assertThrows(IllegalStateException.class, () -> loan.extendLoan(7));
    }

    @Test
    @Title("testEqualsWithSameId JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithSameId() {
        Loan loan2 = new Loan("L001", book, reader, LocalDate.now().minusDays(5));
        assertEquals(loan, loan2);
    }

    @Test
    @Title("testEqualsWithDifferentId JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testEqualsWithDifferentId() {
        Loan loan2 = new Loan("L002", book, reader, LocalDate.now());
        assertNotEquals(loan, loan2);
    }

    @Test
    @Title("testHashCode JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testHashCode() {
        Loan loan2 = new Loan("L001", book, reader, LocalDate.now().minusDays(5));
        assertEquals(loan.hashCode(), loan2.hashCode());
    }

    @Test
    @Title("testToString JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testToString() {
        String result = loan.toString();
        assertTrue(result.contains("L001"));
        assertTrue(result.contains("Test Book"));
        assertTrue(result.contains("Alice Johnson"));
        assertTrue(result.contains("returned=false"));
    }
}
