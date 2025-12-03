

class LibraryException(Exception):
    """Base exception for library system."""
    pass


class BookNotFoundError(LibraryException):
    """Raised when a book is not found."""
    pass


class BookNotAvailableError(LibraryException):
    """Raised when a book is not available for borrowing."""
    pass


class MemberNotFoundError(LibraryException):
    """Raised when a member is not found."""
    pass


class MaxBooksExceededError(LibraryException):
    """Raised when member exceeds maximum borrowed books limit."""
    pass


class InvalidDateError(LibraryException):
    """Raised when an invalid date is provided."""
    pass
