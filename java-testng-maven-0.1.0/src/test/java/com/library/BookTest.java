package com.library;

import com.testomatio.reporter.annotation.TestId;
import com.testomatio.reporter.annotation.Title;
import java.time.LocalDate;
import org.testng.Assert;
import org.testng.SkipException;
import org.testng.annotations.Test;

public class BookTest {

    @Test
    @TestId("T23")
    @Title("Book Creation Test")
    public void testBookCreation() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("1", "Fiction", "Fiction books");

        Book book = new Book("123456789", "Test Book", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);

        Assert.assertEquals(book.getIsbn(), "123456789");
        Assert.assertEquals(book.getTitle(), "Test Book");
        Assert.assertEquals(book.getPages(), 300);
        Assert.assertTrue(book.isAvailable());
    }

    @Test
    @TestId("T24")
    @Title("Book Availability Test")
    public void testBookAvailability() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("1", "Fiction", "Fiction books");

        Book book = new Book("123456789", "Test Book", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);

        Assert.assertTrue(book.isAvailable());
        book.setAvailable(false);
        Assert.assertFalse(book.isAvailable());
    }

    @Test
    @TestId("T25")
    @Title("Book Age Test - Fails")
    public void testBookAge() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("1", "Fiction", "Fiction books");

        Book book = new Book("123456789", "Test Book", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);

        int age = book.getAge();
        Assert.assertEquals(age, 10);
    }

    @Test
    @TestId("T26")
    @Title("Book Equals Test")
    public void testBookEquals() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("1", "Fiction", "Fiction books");

        Book book1 = new Book("123456789", "Test Book", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);
        Book book2 = new Book("123456789", "Another Book", author, publisher, genre, LocalDate.of(2021, 1, 1), 400);

        Assert.assertTrue(book1.equals(book2));
    }

    @Test
    @TestId("T27")
    @Title("Book Title Update Test")
    public void testBookTitleUpdate() {
        throw new SkipException("Skipping book title update test");
    }

    @Test
    @TestId("T28")
    @Title("Book Genre Update Test")
    public void testBookGenreUpdate() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre fiction = new Genre("1", "Fiction", "Fiction books");
        Genre nonFiction = new Genre("2", "Non-Fiction", "Non-fiction books");

        Book book = new Book("123456789", "Test Book", author, publisher, fiction, LocalDate.of(2020, 1, 1), 300);

        Assert.assertEquals(book.getGenre(), fiction);
        book.setGenre(nonFiction);
        Assert.assertEquals(book.getGenre(), nonFiction);
    }

    @Test
    @TestId("T29")
    @Title("Book ToString Test - Fails")
    public void testBookToString() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("1", "Fiction", "Fiction books");

        Book book = new Book("123456789", "Test Book", author, publisher, genre, LocalDate.of(2020, 1, 1), 300);

        String result = book.toString();
        Assert.assertTrue(result.contains("Wrong Format"));
    }

    @Test
    @TestId("T30")
    @Title("Book Pages Update Test")
    public void testBookPagesUpdate() {
        throw new SkipException("Skipping book pages update test");
    }
}