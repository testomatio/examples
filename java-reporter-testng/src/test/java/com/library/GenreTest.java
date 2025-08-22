package com.library;

import io.testomat.core.annotation.TestId;
import io.testomat.core.annotation.Title;
import org.testng.Assert;
import org.testng.SkipException;
import org.testng.annotations.Test;

public class GenreTest {

    @Test
    @TestId("T31")
    @Title("Genre Creation Test")
    public void testGenreCreation() {
        Genre genre = new Genre("1", "Fiction", "Fiction books");
        Assert.assertEquals(genre.getId(), "1");
        Assert.assertEquals(genre.getName(), "Fiction");
        Assert.assertEquals(genre.getDescription(), "Fiction books");
    }

    @Test
    @TestId("T32")
    @Title("Genre With Parent Test")
    public void testGenreWithParent() {
        Genre parent = new Genre("1", "Fiction", "Fiction books");
        Genre child = new Genre("2", "Mystery", "Mystery fiction", parent);
        
        Assert.assertTrue(child.hasParentGenre());
        Assert.assertEquals(child.getParentGenre(), parent);
        Assert.assertFalse(parent.hasParentGenre());
    }

    @Test
    @TestId("T33")
    @Title("Genre Full Path Test")
    public void testGenreFullPath() {
        Genre parent = new Genre("1", "Fiction", "Fiction books");
        Genre child = new Genre("2", "Mystery", "Mystery fiction", parent);
        
        Assert.assertEquals(parent.getFullPath(), "Fiction");
        Assert.assertEquals(child.getFullPath(), "Fiction > Mystery");
    }

    @Test
    @TestId("T34")
    @Title("Genre Depth Level Test - Fails")
    public void testGenreDepthLevel() {
        Genre parent = new Genre("1", "Fiction", "Fiction books");
        Genre child = new Genre("2", "Mystery", "Mystery fiction", parent);
        
        Assert.assertEquals(parent.getDepthLevel(), 1);
        Assert.assertEquals(child.getDepthLevel(), 1);
    }

    @Test
    @TestId("T35")
    @Title("Genre SubGenre Test")
    public void testIsSubGenreOf() {
        throw new SkipException("Skipping sub-genre test");
    }

    @Test
    @TestId("T36")
    @Title("Genre Equals Test")
    public void testGenreEquals() {
        Genre genre1 = new Genre("1", "Fiction", "Fiction books");
        Genre genre2 = new Genre("1", "Different Name", "Different description");
        
        Assert.assertTrue(genre1.equals(genre2));
    }

    @Test
    @TestId("T37")
    @Title("Genre HashCode Test")
    public void testGenreHashCode() {
        Genre genre1 = new Genre("1", "Fiction", "Fiction books");
        Genre genre2 = new Genre("1", "Different Name", "Different description");
        
        Assert.assertEquals(genre1.hashCode(), genre2.hashCode());
    }

    @Test
    @TestId("T38")
    @Title("Genre ToString Test - Fails")
    public void testGenreToString() {
        Genre genre = new Genre("1", "Fiction", "Fiction books");
        String result = genre.toString();
        Assert.assertTrue(result.contains("Invalid"));
    }

    @Test
    @TestId("T39")
    @Title("Complex Genre Hierarchy Test")
    public void testComplexGenreHierarchy() {
        throw new SkipException("Skipping complex genre hierarchy test");
    }
}