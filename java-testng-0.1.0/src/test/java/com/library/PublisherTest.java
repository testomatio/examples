package com.library;

import com.testomatio.reporter.annotation.TestId;
import com.testomatio.reporter.annotation.Title;
import java.time.LocalDate;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertNotEquals;
import static org.testng.Assert.assertNotNull;
import static org.testng.Assert.assertTrue;

public class PublisherTest {

    private Publisher publisher;
    private Book book1;
    private Book book2;

    @BeforeMethod
    public void setUp() {
        publisher = new Publisher("P001", "Test Publisher", "123 Main St", "USA", LocalDate.of(2000, 1, 1));

        Author author = new Author("A001", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Genre genre = new Genre("G001", "Fiction", "Fictional works");
        book1 = new Book("978-1-11111-11-1", "Book 1", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);
        book2 = new Book("978-2-22222-22-2", "Book 2", author, publisher, genre, LocalDate.of(2021, 1, 1), 400);
    }

    @Test
    @TestId("TTestNG109")
    @Title("testPublisherCreation TestNG")
    public void testPublisherCreation() {
        assertNotNull(publisher);
        assertEquals(publisher.getId(), "P001");
        assertEquals(publisher.getName(), "Test Publisher");
        assertEquals(publisher.getAddress(), "123 Main St");
        assertEquals(publisher.getCountry(), "USA");
        assertEquals(publisher.getFoundedDate(), LocalDate.of(2000, 1, 1));
    }

    @Test
    @TestId("TTestNG110")
    @Title("testAddPublishedBook TestNG")
    public void testAddPublishedBook() {
        publisher.addPublishedBook(book1);
        assertEquals(publisher.getPublishedBooksCount(), 1);
        assertTrue(publisher.getPublishedBooks().contains(book1));
    }

    @Test
    @TestId("TTestNG111")
    @Title("testAddDuplicateBook TestNG")
    public void testAddDuplicateBook() {
        publisher.addPublishedBook(book1);
        publisher.addPublishedBook(book1);
        assertEquals(publisher.getPublishedBooksCount(), 1);
    }

    @Test
    @TestId("TTestNG112")
    @Title("testRemovePublishedBook TestNG")
    public void testRemovePublishedBook() {
        publisher.addPublishedBook(book1);
        publisher.addPublishedBook(book2);
        publisher.removePublishedBook(book1);

        assertEquals(publisher.getPublishedBooksCount(), 1);
        assertFalse(publisher.getPublishedBooks().contains(book1));
        assertTrue(publisher.getPublishedBooks().contains(book2));
    }

    @Test
    @TestId("TTestNG113")
    @Title("testGetYearsInBusiness TestNG")
    public void testGetYearsInBusiness() {
        int expectedYears = LocalDate.now().getYear() - 2000;
        assertEquals(publisher.getYearsInBusiness(), expectedYears);
    }

    @Test
    @TestId("TTestNG114")
    @Title("testIsEstablished TestNG")
    public void testIsEstablished() {
        assertTrue(publisher.isEstablished());

        Publisher newPublisher = new Publisher("P002", "New Publisher", "456 Oak St", "UK", LocalDate.now().minusYears(5));
        assertFalse(newPublisher.isEstablished());
    }

    @Test
    @TestId("TTestNG115")
    @Title("testGetBooksByYear TestNG")
    public void testGetBooksByYear() {
        publisher.addPublishedBook(book1);
        publisher.addPublishedBook(book2);

        var books2020 = publisher.getBooksByYear(2020);
        assertEquals(books2020.size(), 1);
        assertTrue(books2020.contains(book1));
    }

    @Test
    @TestId("TTestNG116")
    @Title("testGetPublishedBooksReturnsCopy TestNG")
    public void testGetPublishedBooksReturnsCopy() {
        publisher.addPublishedBook(book1);
        var books = publisher.getPublishedBooks();
        books.clear();
        assertEquals(publisher.getPublishedBooksCount(), 1);
    }

    @Test
    @TestId("TTestNG117")
    @Title("testSetters TestNG")
    public void testSetters() {
        publisher.setId("P002");
        publisher.setName("New Publisher");
        publisher.setAddress("456 Oak St");
        publisher.setCountry("UK");
        publisher.setFoundedDate(LocalDate.of(2010, 1, 1));

        assertEquals(publisher.getId(), "P002");
        assertEquals(publisher.getName(), "New Publisher");
        assertEquals(publisher.getAddress(), "456 Oak St");
        assertEquals(publisher.getCountry(), "UK");
        assertEquals(publisher.getFoundedDate(), LocalDate.of(2010, 1, 1));
    }

    @Test
    @TestId("TTestNG118")
    @Title("testEqualsWithSameId TestNG")
    public void testEqualsWithSameId() {
        Publisher publisher2 = new Publisher("P001", "Different Name", "789 Pine St", "Canada", LocalDate.of(2005, 1, 1));
        assertEquals(publisher, publisher2);
    }

    @Test
    @TestId("TTestNG119")
    @Title("testEqualsWithDifferentId TestNG")
    public void testEqualsWithDifferentId() {
        Publisher publisher2 = new Publisher("P002", "Test Publisher", "123 Main St", "USA", LocalDate.of(2000, 1, 1));
        assertNotEquals(publisher, publisher2);
    }

    @Test
    @TestId("TTestNG120")
    @Title("testHashCode TestNG")
    public void testHashCode() {
        Publisher publisher2 = new Publisher("P001", "Different Name", "789 Pine St", "Canada", LocalDate.of(2005, 1, 1));
        assertEquals(publisher.hashCode(), publisher2.hashCode());
    }

    @Test
    @TestId("TTestNG121")
    @Title("testToString TestNG")
    public void testToString() {
        String result = publisher.toString();
        assertTrue(result.contains("P001"));
        assertTrue(result.contains("Test Publisher"));
        assertTrue(result.contains("USA"));
        assertTrue(result.contains("yearsInBusiness="));
    }

    @Test
    @TestId("TTestNG122")
    @Title("testEmptyBooksList TestNG")
    public void testEmptyBooksList() {
        assertEquals(publisher.getPublishedBooksCount(), 0);
        assertTrue(publisher.getPublishedBooks().isEmpty());
    }

    @Test
    @TestId("TTestNG123")
    @Title("testGetBooksByYearNoBooks TestNG")
    public void testGetBooksByYearNoBooks() {
        var books = publisher.getBooksByYear(2020);
        assertTrue(books.isEmpty());
    }

    @Test
    @TestId("TTestNG124")
    @Title("testEqualsWithNull TestNG")
    public void testEqualsWithNull() {
        assertNotEquals(publisher, null);
    }

    @Test
    @TestId("TTestNG125")
    @Title("testEqualsWithSameObject TestNG")
    public void testEqualsWithSameObject() {
        assertEquals(publisher, publisher);
    }

    @Test
    @TestId("TTestNG126")
    @Title("testEqualsWithDifferentClass TestNG")
    public void testEqualsWithDifferentClass() {
        assertNotEquals(publisher, "Not a publisher");
    }
}