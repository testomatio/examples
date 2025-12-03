from datetime import datetime, timedelta


class Member:
    """Represents a library member."""

    MAX_BOOKS = 5
    LOAN_PERIOD_DAYS = 14
    FINE_PER_DAY = 0.50

    def __init__(self, member_id, name, email, membership_type='regular'):
        self.member_id = member_id
        self.name = name
        self.email = email
        self.membership_type = membership_type  # 'regular', 'premium', 'student'
        self.borrowed_books = {}  # {isbn: borrow_date}
        self.fine_amount = 0.0
        self.is_active = True

    def can_borrow(self):
        """Check if member can borrow more books."""
        max_books = self.MAX_BOOKS
        if self.membership_type == 'premium':
            max_books = 10
        elif self.membership_type == 'student':
            max_books = 3

        return len(self.borrowed_books) < max_books and self.is_active

    def borrow_book(self, isbn, date):
        """Add a borrowed book to member's record."""
        if not self.can_borrow():
            return False
        self.borrowed_books[isbn] = date
        return True

    def return_book(self, isbn):
        """Remove a book from member's borrowed books."""
        if isbn in self.borrowed_books:
            del self.borrowed_books[isbn]
            return True
        return False

    def calculate_fine(self, isbn, return_date):
        """Calculate fine for overdue book."""
        if isbn not in self.borrowed_books:
            return 0.0

        borrow_date = datetime.strptime(self.borrowed_books[isbn], '%Y-%m-%d')
        return_datetime = datetime.strptime(return_date, '%Y-%m-%d')
        due_date = borrow_date + timedelta(days=self.LOAN_PERIOD_DAYS)

        if return_datetime > due_date:
            days_overdue = (return_datetime - due_date).days
            return days_overdue * self.FINE_PER_DAY
        return 0.0

    def add_fine(self, amount):
        """Add fine to member's account."""
        self.fine_amount += float(amount)

    def pay_fine(self, amount):
        """Pay off fine amount."""
        amount = float(amount)
        if amount > self.fine_amount:
            amount = self.fine_amount
        self.fine_amount -= amount
        return self.fine_amount

    def suspend(self):
        """Suspend member account."""
        self.is_active = False

    def reactivate(self):
        """Reactivate member account."""
        self.is_active = True

    def get_info(self):
        """Get member information as dictionary."""
        return {
            'member_id': self.member_id,
            'name': self.name,
            'email': self.email,
            'membership_type': self.membership_type,
            'borrowed_books_count': len(self.borrowed_books),
            'fine_amount': self.fine_amount,
            'is_active': self.is_active
        }

    def __str__(self):
        return f"{self.name} ({self.member_id}) - {self.membership_type}"
