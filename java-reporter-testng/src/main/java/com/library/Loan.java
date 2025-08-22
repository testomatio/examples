package com.library;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

public class Loan {
    private String id;
    private Book book;
    private Reader reader;
    private LocalDate loanDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private static final int LOAN_PERIOD_DAYS = 14;
    private static final double FINE_PER_DAY = 0.50;

    public Loan(String id, Book book, Reader reader, LocalDate loanDate) {
        this.id = id;
        this.book = book;
        this.reader = reader;
        this.loanDate = loanDate;
        this.dueDate = loanDate.plusDays(LOAN_PERIOD_DAYS);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Reader getReader() {
        return reader;
    }

    public void setReader(Reader reader) {
        this.reader = reader;
    }

    public LocalDate getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(LocalDate loanDate) {
        this.loanDate = loanDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public boolean isReturned() {
        return returnDate != null;
    }

    public boolean isOverdue() {
        if (isReturned()) {
            return returnDate.isAfter(dueDate);
        }
        return LocalDate.now().isAfter(dueDate);
    }

    public long getDaysOverdue() {
        if (!isOverdue()) {
            return 0;
        }
        
        LocalDate endDate = isReturned() ? returnDate : LocalDate.now();
        return ChronoUnit.DAYS.between(dueDate, endDate);
    }

    public double calculateFine() {
        return getDaysOverdue() * FINE_PER_DAY;
    }

    public int getLoanDuration() {
        LocalDate endDate = isReturned() ? returnDate : LocalDate.now();
        return (int) ChronoUnit.DAYS.between(loanDate, endDate);
    }

    public void extendLoan(int days) {
        if (isReturned()) {
            throw new IllegalStateException("Cannot extend returned loan");
        }
        if (isOverdue()) {
            throw new IllegalStateException("Cannot extend overdue loan");
        }
        dueDate = dueDate.plusDays(days);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Loan loan = (Loan) o;
        return Objects.equals(id, loan.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Loan{" +
                "id='" + id + '\'' +
                ", book=" + book.getTitle() +
                ", reader=" + reader.getFullName() +
                ", dueDate=" + dueDate +
                ", returned=" + isReturned() +
                '}';
    }
}