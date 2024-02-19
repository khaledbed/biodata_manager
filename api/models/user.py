# api/models/user.py

from api.utils.database import get_database_connection

class User:
    """User model."""

    def __init__(self, username, email, password, _id=None):
        self._id = _id
        self.username = username
        self.email = email
        self.password = password

    def save(self):
        """Save the user to the database."""
        connection = get_database_connection()
        connection.users.insert_one({
            'username': self.username,
            'email': self.email,
            'password': self.password
        })

    @staticmethod
    def find_by_username(username):
        """Find a user by username."""
        connection = get_database_connection()
        user_data = connection.users.find_one({'username': username})
        if user_data:
            return User(username=user_data['username'], email=user_data['email'], password=user_data['password'])
        else:
            return None

    @staticmethod
    def find_by_email(email):
        """Find a user by email."""
        connection = get_database_connection()
        user_data = connection.users.find_one({'email': email})
        if user_data:
            return User(username=user_data['username'], email=user_data['email'], password=user_data['password'])
        else:
            return None

    @staticmethod
    def find_by_id(user_id):
        """Find a user by ID."""
        connection = get_database_connection()
        user_data = connection.users.find_one({'_id': user_id})
        if user_data:
            return User(username=user_data['username'], email=user_data['email'], password=user_data['password'])
        else:
            return None

