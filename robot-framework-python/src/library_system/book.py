
class Book:
    """Represents a book in the library."""

    def __init__(self, isbn, title, author, year, genre, copies=1):
        self.isbn = isbn
        self.title = title
        self.author = author
        self.year = year
        self.genre = genre
        self.total_copies = int(copies)
        self.available_copies = int(copies)
        self.borrowed_by = []  # List of (member_id, borrow_date) tuples

    def is_available(self):
        """Check if book is available for borrowing."""
        return self.available_copies > 0

    def borrow(self, member_id, date):
        """Mark book as borrowed."""
        if not self.is_available():
            return False
        self.available_copies -= 1
        self.borrowed_by.append((member_id, date))
        return True

    def return_book(self, member_id):
        """Mark book as returned."""
        for i, (mid, _) in enumerate(self.borrowed_by):
            if mid == member_id:
                self.borrowed_by.pop(i)
                self.available_copies += 1
                return True
        return False

    def get_info(self):
        """Get book information as dictionary."""
        return {
            'isbn': self.isbn,
            'title': self.title,
            'author': self.author,
            'year': self.year,
            'genre': self.genre,
            'total_copies': self.total_copies,
            'available_copies': self.available_copies,
            'borrowed_count': len(self.borrowed_by)
        }

    def __str__(self):
        return f"{self.title} by {self.author} ({self.year})"
