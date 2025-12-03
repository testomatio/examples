from .book import Book
from .member import Member
from .exceptions import (
    BookNotAvailableError,
    BookNotFoundError,
    MemberNotFoundError,
    MaxBooksExceededError
)


class LibrarySystem:
    """Main library management system."""

    def __init__(self, name="City Library"):
        self.name = name
        self.books = {}  # {isbn: Book}
        self.members = {}  # {member_id: Member}
        self.transaction_history = []

    # Book Management
    def add_book(self, isbn, title, author, year, genre, copies=1):
        """Add a new book to the library."""
        if isbn in self.books:
            # If book exists, just increase copies
            self.books[isbn].total_copies += int(copies)
            self.books[isbn].available_copies += int(copies)
        else:
            self.books[isbn] = Book(isbn, title, author, year, genre, copies)
        return f"Added {copies} copy/copies of '{title}'"

    def remove_book(self, isbn):
        """Remove a book from the library."""
        if isbn not in self.books:
            raise BookNotFoundError(f"Book with ISBN {isbn} not found")

        if self.books[isbn].available_copies < self.books[isbn].total_copies:
            return "Cannot remove book: some copies are borrowed"

        del self.books[isbn]
        return "Book removed successfully"

    def get_book(self, isbn):
        """Get book by ISBN."""
        if isbn not in self.books:
            raise BookNotFoundError(f"Book with ISBN {isbn} not found")
        return self.books[isbn]

    def search_books_by_title(self, title):
        """Search books by title (case-insensitive partial match)."""
        results = []
        for book in self.books.values():
            if title.lower() in book.title.lower():
                results.append(book)
        return results

    def search_books_by_author(self, author):
        """Search books by author (case-insensitive partial match)."""
        results = []
        for book in self.books.values():
            if author.lower() in book.author.lower():
                results.append(book)
        return results

    def get_books_by_genre(self, genre):
        """Get all books of a specific genre."""
        results = []
        for book in self.books.values():
            if book.genre.lower() == genre.lower():
                results.append(book)
        return results

    def get_available_books(self):
        """Get all available books."""
        return [book for book in self.books.values() if book.is_available()]

    def get_total_books_count(self):
        """Get total number of books in library."""
        return sum(book.total_copies for book in self.books.values())

    def get_available_books_count(self):
        """Get number of available books."""
        return sum(book.available_copies for book in self.books.values())

    # Member Management
    def register_member(self, member_id, name, email, membership_type='regular'):
        """Register a new member."""
        if member_id in self.members:
            return "Member ID already exists"

        self.members[member_id] = Member(member_id, name, email, membership_type)
        return f"Member {name} registered successfully"

    def remove_member(self, member_id):
        """Remove a member."""
        if member_id not in self.members:
            raise MemberNotFoundError(f"Member {member_id} not found")

        if len(self.members[member_id].borrowed_books) > 0:
            return "Cannot remove member: has borrowed books"

        del self.members[member_id]
        return "Member removed successfully"

    def get_member(self, member_id):
        """Get member by ID."""
        if member_id not in self.members:
            raise MemberNotFoundError(f"Member {member_id} not found")
        return self.members[member_id]

    def suspend_member(self, member_id):
        """Suspend a member."""
        member = self.get_member(member_id)
        member.suspend()
        return f"Member {member_id} suspended"

    def reactivate_member(self, member_id):
        """Reactivate a suspended member."""
        member = self.get_member(member_id)
        member.reactivate()
        return f"Member {member_id} reactivated"

    # Borrowing and Returning
    def borrow_book(self, member_id, isbn, date):
        """Process book borrowing."""
        member = self.get_member(member_id)
        book = self.get_book(isbn)

        if not member.is_active:
            raise MaxBooksExceededError("Member account is suspended")

        if not book.is_available():
            raise BookNotAvailableError(f"Book '{book.title}' is not available")

        if not member.can_borrow():
            raise MaxBooksExceededError("Member has reached maximum borrowed books limit")

        book.borrow(member_id, date)
        member.borrow_book(isbn, date)

        self.transaction_history.append({
            'type': 'borrow',
            'member_id': member_id,
            'isbn': isbn,
            'date': date
        })

        return f"Book '{book.title}' borrowed by {member.name}"

    def return_book(self, member_id, isbn, return_date):
        """Process book return."""
        member = self.get_member(member_id)
        book = self.get_book(isbn)

        if isbn not in member.borrowed_books:
            return "This book was not borrowed by this member"

        # Calculate and add fine if overdue
        fine = member.calculate_fine(isbn, return_date)
        if fine > 0:
            member.add_fine(fine)

        book.return_book(member_id)
        member.return_book(isbn)

        self.transaction_history.append({
            'type': 'return',
            'member_id': member_id,
            'isbn': isbn,
            'date': return_date,
            'fine': fine
        })

        return f"Book '{book.title}' returned. Fine: ${fine:.2f}"

    # Statistics
    def get_most_borrowed_books(self, limit=5):
        """Get most borrowed books."""
        books_with_count = [(book, len(book.borrowed_by)) for book in self.books.values()]
        books_with_count.sort(key=lambda x: x[1], reverse=True)
        return [book for book, _ in books_with_count[:limit]]

    def get_members_with_fines(self):
        """Get all members who have outstanding fines."""
        return [member for member in self.members.values() if member.fine_amount > 0]

    def get_overdue_books(self):
        """Get all overdue books."""
        from datetime import datetime, timedelta
        overdue = []

        for member in self.members.values():
            for isbn, borrow_date in member.borrowed_books.items():
                borrow_datetime = datetime.strptime(borrow_date, '%Y-%m-%d')
                due_date = borrow_datetime + timedelta(days=Member.LOAN_PERIOD_DAYS)
                if datetime.now() > due_date:
                    overdue.append({
                        'member': member,
                        'book': self.books[isbn],
                        'due_date': due_date.strftime('%Y-%m-%d')
                    })

        return overdue

    def get_statistics(self):
        """Get library statistics."""
        return {
            'total_books': len(self.books),
            'total_copies': self.get_total_books_count(),
            'available_copies': self.get_available_books_count(),
            'borrowed_copies': self.get_total_books_count() - self.get_available_books_count(),
            'total_members': len(self.members),
            'active_members': len([m for m in self.members.values() if m.is_active]),
            'members_with_fines': len(self.get_members_with_fines()),
            'total_transactions': len(self.transaction_history)
        }
