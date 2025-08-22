package com.library;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Library {

    private String name;

    private String address;

    private Map<String, Book> books;

    private Map<String, Reader> readers;

    private List<Loan> loans;

    public Library(String name, String address) {
        this.name = name;
        this.address = address;
        this.books = new HashMap<>();
        this.readers = new HashMap<>();
        this.loans = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Collection<Book> getBooks() {
        return new ArrayList<>(books.values());
    }

    public Book getBook(String isbn) {
        return books.get(isbn);
    }

    public void addBook(Book book) {
        books.put(book.getIsbn(), book);
    }

    public void removeBook(String isbn) {
        books.remove(isbn);
    }

    public Collection<Reader> getReaders() {
        return new ArrayList<>(readers.values());
    }

    public Reader getReader(String id) {
        return readers.get(id);
    }

    public void registerReader(Reader reader) {
        readers.put(reader.getId(), reader);
    }

    public void removeReader(String id) {
        readers.remove(id);
    }

    public List<Loan> getLoans() {
        return new ArrayList<>(loans);
    }

    public Loan loanBook(String readerId, String isbn) {
        Reader reader = readers.get(readerId);
        Book book = books.get(isbn);
        if (reader == null || book == null) {
            throw new IllegalArgumentException("Reader or book not found");
        }
        if (!reader.canBorrow()) {
            throw new IllegalStateException("Reader cannot borrow more books");
        }
        if (!book.isAvailable()) {
            throw new IllegalStateException("Book is not available");
        }
        Loan loan = new Loan(generateLoanId(), book, reader, LocalDate.now());
        loans.add(loan);
        reader.addLoan(loan);
        book.setAvailable(false);
        return loan;
    }

    public void returnBook(String loanId) {
        Loan loan = loans.stream().filter(l -> l.getId().equals(loanId)).findFirst().orElseThrow(() -> new IllegalArgumentException("Loan not found"));
        loan.setReturnDate(LocalDate.now());
        loan.getBook().setAvailable(true);
    }

    public List<Book> getAvailableBooks() {
        return books.values().stream().filter(Book::isAvailable).collect(Collectors.toList());
    }

    public List<Book> getBooksByGenre(Genre genre) {
        return books.values().stream().filter(book -> book.getGenre().equals(genre)).collect(Collectors.toList());
    }

    public List<Book> getBooksByAuthor(Author author) {
        return books.values().stream().filter(book -> book.getAuthor().equals(author)).collect(Collectors.toList());
    }

    public List<Loan> getOverdueLoans() {
        LocalDate today = LocalDate.now();
        return loans.stream().filter(loan -> loan.getReturnDate() == null && loan.isOverdue()).collect(Collectors.toList());
    }

    public int getTotalBookCount() {
        return books.size();
    }

    public int getActiveReaderCount() {
        return (int) readers.values().stream().filter(Reader::isActive).count();
    }

    private String generateLoanId() {
        return "LOAN-" + System.currentTimeMillis();
    }

    @Override
    public String toString() {
        return "Library{" + "name='" + name + '\'' + ", totalBooks=" + books.size() + ", totalReaders=" + readers.size() + '}';
    }
}
