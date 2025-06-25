package library;

import com.library.Author;
import com.library.Book;
import com.library.Genre;
import com.library.Library;
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
public class LibraryTest {
    
    private Library library;
    private Book book;
    private Reader reader;
    private Author author;
    private Publisher publisher;
    private Genre genre;
    
    @BeforeEach
    void setUp() {
        library = new Library("Central Library", "123 Main St");
        
        author = new Author("A001", "n", "Doe", LocalDate.of(1970, 1, 1), "USA");
        publisher = new Publisher("P001", "Test Publisher", "123 Main St", "USA", LocalDate.of(2000, 1, 1));
        genre = new Genre("G001", "Fiction", "Fictional");
        book = new Book("978-1-11111-11-1", "Test Book", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);
        
        reader = new Reader("R001", "Alice", "Johnson", "alice@example.com", "123-456-7890");
    }
    
    @Test
    @TestId("TJunit55")
    @Title("testLibraryCreation JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testLibraryCreation() {
        assertNotNull(library);
        assertEquals("Central Library", library.getName());
        assertEquals("123 Main St", library.getAddress());
    }
    
    @Test
    @TestId("TJunit56")
    @Title("testAddBook JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testAddBook() {
        library.addBook(book);
        assertEquals(7, library.getTotalBookCount());
        assertEquals(book, library.getBook(book.getIsbn()));
    }
    
    @Test
    @TestId("TJunit57")
    @Title("testRemoveBook JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testRemoveBook() {
        library.addBook(book);
        library.removeBook(book.getIsbn());
        assertEquals(0, library.getTotalBookCount());
        assertNull(library.getBook(book.getIsbn()));
    }
    
    @Test
    @TestId("TJunit58")
    @Title("testRegisterReader JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testRegisterReader() {
        library.registerReader(reader);
        assertEquals(reader, library.getReader(reader.getId()));
        assertEquals(1, library.getActiveReaderCount());
    }
    
    @Test
    @TestId("TJunit59")
    @Title("testRemoveReader JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testRemoveReader() {
        library.registerReader(reader);
        library.removeReader(reader.getId());
        assertNull(library.getReader(reader.getId()));
    }
    
    @Test
    @TestId("TJunit60")
    @Title("testLoanBook JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testLoanBook() {
        library.addBook(book);
        library.registerReader(reader);
        
        Loan loan = library.loanBook(reader.getId(), book.getIsbn());
        assertNotNull(loan);
        assertFalse(book.isAvailable());
        assertEquals(1, library.getLoans().size());
    }
    
    @Test
    @TestId("TJunit61")
    @Title("testLoanBookWithInvalidReader JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testLoanBookWithInvalidReader() {
        library.addBook(book);
        assertThrows(IllegalArgumentException.class, () -> 
            library.loanBook("INVALID", book.getIsbn())
        );
    }
    
    @Test
    @TestId("TJunit62")
    @Title("testLoanBookWithInvalidBook JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testLoanBookWithInvalidBook() {
        library.registerReader(reader);
        assertThrows(IllegalArgumentException.class, () -> 
            library.loanBook(reader.getId(), "INVALID")
        );
    }
    
    @Test
    @TestId("TJunit63")
    @Title("testLoanUnavailableBook JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testLoanUnavailableBook() {
        library.addBook(book);
        library.registerReader(reader);
        book.setAvailable(false);
        
        assertThrows(IllegalStateException.class, () -> 
            library.loanBook(reader.getId(), book.getIsbn())
        );
    }
    
    @Test
    @TestId("TJunit64")
    @Title("testReturnBook JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testReturnBook() {
        library.addBook(book);
        library.registerReader(reader);
        Loan loan = library.loanBook(reader.getId(), book.getIsbn());
        
        library.returnBook(loan.getId());
        assertTrue(book.isAvailable());
        assertNotNull(loan.getReturnDate());
    }
    
    @Test
    @TestId("TJunit65")
    @Title("testGetAvailableBooks JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetAvailableBooks() {
        Book book2 = new Book("978-2-22222-22-2", "Book 2", author, publisher, genre, LocalDate.of(2021, 1, 1), 400);
        library.addBook(book);
        library.addBook(book2);
        library.registerReader(reader);
        library.loanBook(reader.getId(), book.getIsbn());
        
        var available = library.getAvailableBooks();
        assertEquals(1, available.size());
        assertTrue(available.contains(book2));
    }
    
    @Test
    @TestId("TJunit66")
    @Title("testGetBooksByGenre JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetBooksByGenre() {
        Genre genre2 = new Genre("G002", "Non-Fiction", "Non-fictional works");
        Book book2 = new Book("978-2-22222-22-2", "Book 2", author, publisher, genre2, LocalDate.of(2021, 1, 1), 400);
        
        library.addBook(book);
        library.addBook(book2);
        
        var fictionBooks = library.getBooksByGenre(genre);
        assertEquals(1, fictionBooks.size());
        assertTrue(fictionBooks.contains(book));
    }
    
    @Test
    @TestId("TJunit67")
    @Title("testGetBooksByAuthor JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetBooksByAuthor() {
        Author author2 = new Author("A002", "Jane", "Smith", LocalDate.of(1980, 1, 1), "UK");
        Book book2 = new Book("978-2-22222-22-2", "Book 2", author2, publisher, genre, LocalDate.of(2021, 1, 1), 400);
        
        library.addBook(book);
        library.addBook(book2);
        
        var johnDoeBooks = library.getBooksByAuthor(author);
        assertEquals(1, johnDoeBooks.size());
        assertTrue(johnDoeBooks.contains(book));
    }
    
    @Test
    @TestId("TJunit68")
    @Title("testGetOverdueLoans JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testGetOverdueLoans() {
        library.addBook(book);
        library.registerReader(reader);
        Loan loan = library.loanBook(reader.getId(), book.getIsbn());
        loan.setDueDate(LocalDate.now().minusDays(5));
        
        var overdueLoans = library.getOverdueLoans();
        assertEquals(1, overdueLoans.size());
        assertTrue(overdueLoans.contains(loan));
    }
    
    @Test
    @TestId("TJunit69")
    @Title("testSetName JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testSetName() {
        library.setName("New Library Name");
        assertEquals("New Library Name", library.getName());
    }
    
    @Test
    @TestId("TJunit70")
    @Title("testSetAddress JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testSetAddress() {
        library.setAddress("456 Oak St");
        assertEquals("456 Oak St", library.getAddress());
    }
    
    @Test
    @TestId("TJunit71")
    @Title("testToString JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testToString() {
        library.addBook(book);
        library.registerReader(reader);
        
        String result = library.toString();
        assertTrue(result.contains("Central Library"));
        assertTrue(result.contains("totalBooks=1"));
        assertTrue(result.contains("totalReaders=1"));
    }
    
    @Test
    @TestId("TJunit72")
    @Title("testReturnInvalidLoan JUnit")
    @Execution(ExecutionMode.CONCURRENT)
    void testReturnInvalidLoan() {
        assertThrows(IllegalArgumentException.class, () -> 
            library.returnBook("INVALID-LOAN-ID")
        );
    }
}