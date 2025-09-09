class User:
    def __init__(self, email, password, name=""):
        self.email = email
        self.password = password
        self.name = name
        self.is_authenticated = False

    def login(self, email, password):
        if self.email == email and self.password == password:
            self.is_authenticated = True
            return True
        return False

    def logout(self):
        self.is_authenticated = False


class UserService:
    def __init__(self):
        self.users = {}

    def register_user(self, email, password, name=""):
        if email in self.users:
            raise ValueError("User already exists")

        user = User(email, password, name)
        self.users[email] = user
        return user

    def authenticate(self, email, password):
        user = self.users.get(email)
        if user and user.login(email, password):
            return user
        return None

    def get_user(self, email):
        return self.users.get(email)
