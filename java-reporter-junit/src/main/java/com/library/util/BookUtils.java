package com.library.util;

import com.library.Author;
import com.library.Book;
import com.library.Genre;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

public class BookUtils {

    private BookUtils() {
        // Private constructor to prevent instantiation
    }

    public static boolean isValidIsbn(String isbn) {
        if (isbn == null || isbn.isEmpty()) {
            return false;
        }
        String cleanIsbn = isbn.replaceAll("[^0-9X]", "");
        if (cleanIsbn.length() == 10) {
            return isValidIsbn10(cleanIsbn);
        } else if (cleanIsbn.length() == 13) {
            return isValidIsbn13(cleanIsbn);
        }
        return false;
    }

    private static boolean isValidIsbn10(String isbn) {
        int sum = 0;
        for (int i = 0; i < 9; i++) {
            sum += (isbn.charAt(i) - '0') * (10 - i);
        }
        char lastChar = isbn.charAt(9);
        if (lastChar == 'X') {
            sum += 10;
        } else {
            sum += lastChar - '0';
        }
        return sum % 11 == 0;
    }

    private static boolean isValidIsbn13(String isbn) {
        int sum = 0;
        for (int i = 0; i < 13; i++) {
            int digit = isbn.charAt(i) - '0';
            sum += (i % 2 == 0) ? digit : digit * 3;
        }
        return sum % 10 == 0;
    }

    public static List<Book> sortByTitle(List<Book> books) {
        return books.stream().sorted(Comparator.comparing(Book::getTitle)).collect(Collectors.toList());
    }

    public static List<Book> sortByPublicationDate(List<Book> books) {
        return books.stream().sorted(Comparator.comparing(Book::getPublicationDate)).collect(Collectors.toList());
    }

    public static List<Book> filterByGenre(List<Book> books, Genre genre) {
        return books.stream().filter(book -> book.getGenre().equals(genre)).collect(Collectors.toList());
    }

    public static List<Book> filterByAuthor(List<Book> books, Author author) {
        return books.stream().filter(book -> book.getAuthor().equals(author)).collect(Collectors.toList());
    }

    public static List<Book> filterByYearRange(List<Book> books, int startYear, int endYear) {
        return books.stream().filter(book -> {
            int year = book.getPublicationDate().getYear();
            return year >= startYear && year <= endYear;
        }).collect(Collectors.toList());
    }

    public static Map<Genre, List<Book>> groupByGenre(List<Book> books) {
        return books.stream().collect(Collectors.groupingBy(Book::getGenre));
    }

    public static Map<Author, List<Book>> groupByAuthor(List<Book> books) {
        return books.stream().collect(Collectors.groupingBy(Book::getAuthor));
    }

    public static double calculateAveragePages(List<Book> books) {
        if (books.isEmpty()) {
            return 0;
        }
        return books.stream().mapToInt(Book::getPages).average().orElse(0);
    }

    public static Book findOldestBook(List<Book> books) {
        return books.stream().min(Comparator.comparing(Book::getPublicationDate)).orElse(null);
    }

    public static Book findNewestBook(List<Book> books) {
        return books.stream().max(Comparator.comparing(Book::getPublicationDate)).orElse(null);
    }

    public static List<Book> searchByTitle(List<Book> books, String keyword) {
        String lowerKeyword = keyword.toLowerCase();
        return books.stream().filter(book -> book.getTitle().toLowerCase().contains(lowerKeyword)).collect(Collectors.toList());
    }

    public static int countAvailableBooks(List<Book> books) {
        return (int) books.stream().filter(Book::isAvailable).count();
    }

    public static List<Book> getRecentBooks(List<Book> books, int years) {
        LocalDate cutoffDate = LocalDate.now().minusYears(years);
        return books.stream().filter(book -> book.getPublicationDate().isAfter(cutoffDate)).collect(Collectors.toList());
    }

    public static String generateIsbn13() {
        Random random = new Random();
        StringBuilder isbn = new StringBuilder("978");
        for (int i = 0; i < 9; i++) {
            isbn.append(random.nextInt(10));
        }
        int checksum = calculateIsbn13Checksum(isbn.toString());
        isbn.append(checksum);
        return isbn.toString();
    }

    private static int calculateIsbn13Checksum(String isbn12) {
        int sum = 0;
        for (int i = 0; i < 12; i++) {
            int digit = isbn12.charAt(i) - '0';
            sum += (i % 2 == 0) ? digit : digit * 3;
        }
        int remainder = sum % 10;
        return (remainder == 0) ? 0 : 10 - remainder;
    }
}
