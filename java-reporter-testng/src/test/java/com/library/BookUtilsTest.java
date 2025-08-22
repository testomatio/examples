package com.library;

import com.library.util.BookUtils;
import com.testomatio.reporter.annotation.TestId;
import com.testomatio.reporter.annotation.Title;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import org.testng.Assert;
import org.testng.SkipException;
import org.testng.annotations.Test;

public class BookUtilsTest {

    @Test
    @TestId("T1")
    @Title("Valid ISBN-10 Test")
    public void testValidIsbn10() {
        Assert.assertTrue(BookUtils.isValidIsbn("0306406152"));
    }

    @Test
    @TestId("T2")
    @Title("Valid ISBN-13 Test")
    public void testValidIsbn13() {
        Assert.assertTrue(BookUtils.isValidIsbn("9780306406157"));
    }

    @Test
    @TestId("T3")
    @Title("Invalid ISBN Test - Fails")
    public void testInvalidIsbn() {
        Assert.assertTrue(BookUtils.isValidIsbn("1234567890"));
    }

    @Test
    @TestId("T4")
    @Title("Null ISBN Test")
    public void testNullIsbn() {
        Assert.assertFalse(BookUtils.isValidIsbn(null));
    }

    @Test
    @TestId("T5")
    @Title("Empty ISBN Test")
    public void testEmptyIsbn() {
        Assert.assertFalse(BookUtils.isValidIsbn(""));
    }

    @Test
    @TestId("T6")
    @Title("Sort Books By Title Test")
    public void testSortByTitle() {
        throw new SkipException("Skipping sort by title test");
    }

    @Test
    @TestId("T7")
    @Title("Filter By Genre Test")
    public void testFilterByGenre() {
        Genre fiction = new Genre("1", "Fiction", "Fiction books");
        Genre nonFiction = new Genre("2", "Non-Fiction", "Non-fiction books");
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));

        Book book1 = new Book("123", "Book1", author, publisher, fiction, LocalDate.now(), 200);
        Book book2 = new Book("456", "Book2", author, publisher, nonFiction, LocalDate.now(), 300);

        List<Book> books = Arrays.asList(book1, book2);
        List<Book> fictionBooks = BookUtils.filterByGenre(books, fiction);

        Assert.assertEquals(fictionBooks.size(), 1);
        Assert.assertEquals(fictionBooks.get(0).getTitle(), "Book1");
    }

    @Test
    @TestId("T8")
    @Title("Calculate Average Pages Test - Fails")
    public void testCalculateAveragePages() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("1", "Fiction", "Fiction books");

        Book book1 = new Book("123", "Book1", author, publisher, genre, LocalDate.now(), 200);
        Book book2 = new Book("456", "Book2", author, publisher, genre, LocalDate.now(), 300);

        List<Book> books = Arrays.asList(book1, book2);
        double average = BookUtils.calculateAveragePages(books);

        Assert.assertEquals(average, 300.0);
    }

    @Test
    @TestId("T9")
    @Title("Search By Title Test")
    public void testSearchByTitle() {
        throw new SkipException("Skipping search by title test");
    }

    @Test
    @TestId("T10")
    @Title("Generate ISBN-13 Test")
    public void testGenerateIsbn13() {
        String isbn = BookUtils.generateIsbn13();
        Assert.assertNotNull(isbn);
        Assert.assertEquals(isbn.length(), 13);
        Assert.assertTrue(isbn.startsWith("978"));
    }

    @Test
    @TestId("T11")
    @Title("Filter By Author Test")
    public void testFilterByAuthor() {
        Author author1 = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Author author2 = new Author("2", "Jane", "Smith", LocalDate.of(1980, 1, 1), "UK");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("1", "Fiction", "Fiction books");

        Book book1 = new Book("123", "Book1", author1, publisher, genre, LocalDate.now(), 200);
        Book book2 = new Book("456", "Book2", author2, publisher, genre, LocalDate.now(), 300);

        List<Book> books = Arrays.asList(book1, book2);
        List<Book> johnBooks = BookUtils.filterByAuthor(books, author1);

        Assert.assertEquals(johnBooks.size(), 1);
        Assert.assertEquals(johnBooks.get(0).getAuthor().getFirstName(), "John");
    }

    @Test
    @TestId("T12")
    @Title("Filter By Year Range Test - Fails")
    public void testFilterByYearRange() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Publisher publisher = new Publisher("1", "Test Publisher", "Address", "USA", LocalDate.of(2000, 1, 1));
        Genre genre = new Genre("1", "Fiction", "Fiction books");

        Book book1 = new Book("123", "Book1", author, publisher, genre, LocalDate.of(2020, 1, 1), 200);
        Book book2 = new Book("456", "Book2", author, publisher, genre, LocalDate.of(2022, 1, 1), 300);

        List<Book> books = Arrays.asList(book1, book2);
        List<Book> filteredBooks = BookUtils.filterByYearRange(books, 2021, 2023);

        Assert.assertEquals(filteredBooks.size(), 2);
    }

    @Test
    @TestId("T13")
    @Title("Count Available Books Test")
    public void testCountAvailableBooks() {
        throw new SkipException("Skipping count available books test");
    }
}