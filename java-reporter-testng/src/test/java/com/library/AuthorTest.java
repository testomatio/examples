package com.library;

import io.testomat.core.annotation.TestId;
import io.testomat.core.annotation.Title;
import java.time.LocalDate;
import org.testng.Assert;
import org.testng.SkipException;
import org.testng.annotations.Test;

public class AuthorTest {

    @Test
    @TestId("T14")
    @Title("Author Creation Test")
    public void testAuthorCreation() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Assert.assertEquals(author.getId(), "1");
        Assert.assertEquals(author.getFirstName(), "John");
        Assert.assertEquals(author.getLastName(), "Doe");
        Assert.assertEquals(author.getNationality(), "USA");
    }

    @Test
    @TestId("T15")
    @Title("Author Full Name Test")
    public void testGetFullName() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Assert.assertEquals(author.getFullName(), "John Doe");
    }

    @Test
    @TestId("T16")
    @Title("Author Age Test - Fails")
    public void testGetAge() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        int age = author.getAge();
        Assert.assertEquals(age, 50);
    }

    @Test
    @TestId("T17")
    @Title("Author Book Count Test")
    public void testGetBookCount() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Assert.assertEquals(author.getBookCount(), 0);
    }

    @Test
    @TestId("T18")
    @Title("Add Book To Author Test")
    public void testAddBook() {
        throw new SkipException("Skipping add book to author test");
    }

    @Test
    @TestId("T19")
    @Title("Author Equals Test")
    public void testAuthorEquals() {
        Author author1 = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Author author2 = new Author("1", "Jane", "Smith", LocalDate.of(1980, 1, 1), "UK");
        Assert.assertTrue(author1.equals(author2));
    }

    @Test
    @TestId("T20")
    @Title("Author HashCode Test")
    public void testAuthorHashCode() {
        Author author1 = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        Author author2 = new Author("1", "Jane", "Smith", LocalDate.of(1980, 1, 1), "UK");
        Assert.assertEquals(author1.hashCode(), author2.hashCode());
    }

    @Test
    @TestId("T21")
    @Title("Author ToString Test - Fails")
    public void testAuthorToString() {
        Author author = new Author("1", "John", "Doe", LocalDate.of(1970, 1, 1), "USA");
        String expected = "Author{id='1', fullName='John Doe', nationality='USA'}";
        String actual = author.toString();
        Assert.assertEquals(actual, "Wrong format");
    }

    @Test
    @TestId("T22")
    @Title("Remove Book From Author Test")
    public void testRemoveBook() {
        throw new SkipException("Skipping remove book from author test");
    }
}