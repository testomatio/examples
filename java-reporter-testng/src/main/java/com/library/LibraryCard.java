package com.library;

import java.time.LocalDate;
import java.util.Objects;

public class LibraryCard {
    private String cardNumber;
    private Reader owner;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private boolean blocked;
    private String blockReason;

    public LibraryCard(String cardNumber, Reader owner) {
        this.cardNumber = cardNumber;
        this.owner = owner;
        this.issueDate = LocalDate.now();
        this.expiryDate = issueDate.plusYears(2);
        this.blocked = false;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Reader getOwner() {
        return owner;
    }

    public void setOwner(Reader owner) {
        this.owner = owner;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void block(String reason) {
        this.blocked = true;
        this.blockReason = reason;
    }

    public void unblock() {
        this.blocked = false;
        this.blockReason = null;
    }

    public String getBlockReason() {
        return blockReason;
    }

    public boolean isExpired() {
        return LocalDate.now().isAfter(expiryDate);
    }

    public boolean isValid() {
        return !isExpired() && !isBlocked();
    }

    public void renew() {
        if (isExpired()) {
            expiryDate = LocalDate.now().plusYears(2);
        } else {
            expiryDate = expiryDate.plusYears(2);
        }
    }

    public int getDaysUntilExpiry() {
        if (isExpired()) {
            return 0;
        }
        return (int) LocalDate.now().until(expiryDate).toTotalMonths() * 30;
    }

    public String getFormattedCardNumber() {
        if (cardNumber.length() == 16) {
            return cardNumber.substring(0, 4) + "-" + 
                   cardNumber.substring(4, 8) + "-" + 
                   cardNumber.substring(8, 12) + "-" + 
                   cardNumber.substring(12);
        }
        return cardNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LibraryCard that = (LibraryCard) o;
        return Objects.equals(cardNumber, that.cardNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cardNumber);
    }

    @Override
    public String toString() {
        return "LibraryCard{" +
                "cardNumber='" + getFormattedCardNumber() + '\'' +
                ", owner=" + owner.getFullName() +
                ", valid=" + isValid() +
                '}';
    }
}