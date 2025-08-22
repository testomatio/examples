package com.library;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class Publisher {

    private String id;

    private String name;

    private String address;

    private String country;

    private LocalDate foundedDate;

    private List<Book> publishedBooks;

    public Publisher(String id, String name, String address, String country, LocalDate foundedDate) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.country = country;
        this.foundedDate = foundedDate;
        this.publishedBooks = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public LocalDate getFoundedDate() {
        return foundedDate;
    }

    public void setFoundedDate(LocalDate foundedDate) {
        this.foundedDate = foundedDate;
    }

    public List<Book> getPublishedBooks() {
        return new ArrayList<>(publishedBooks);
    }

    public void addPublishedBook(Book book) {
        if (!publishedBooks.contains(book)) {
            publishedBooks.add(book);
        }
    }

    public void removePublishedBook(Book book) {
        publishedBooks.remove(book);
    }

    public int getPublishedBooksCount() {
        return publishedBooks.size();
    }

    public int getYearsInBusiness() {
        return LocalDate.now().getYear() - foundedDate.getYear();
    }

    public List<Book> getBooksByYear(int year) {
        return publishedBooks.stream().filter(book -> book.getPublicationDate().getYear() == year).collect(Collectors.toList());
    }

    public boolean isEstablished() {
        return getYearsInBusiness() >= 10;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Publisher publisher = (Publisher) o;
        return Objects.equals(id, publisher.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Publisher{" + "id='" + id + '\'' + ", name='" + name + '\'' + ", country='" + country + '\'' + ", yearsInBusiness=" + getYearsInBusiness() + '}';
    }
}
