# api/services/user_service.py
from bson import ObjectId
from api.models.user import User
from api.utils.user_authentication import generate_password_hash, verify_password, generate_access_token

class UserService:
    """Service class for user management."""

    def register_user(self, username, email, password):
        """Register a new user."""
        # Check if the username or email is already in use
        if User.find_by_username(username) or User.find_by_email(email):
            return {'message': 'Username or email already exists'}, 400
        
        # Hash the password
        hashed_password = generate_password_hash(password)

        # Create a new user
        user = User(username=username, email=email, password=hashed_password)
        user.save()

        return {'message': 'User registered successfully'}, 201

    def authenticate_user(self, username, password):
        """Authenticate a user."""
        user = User.find_by_username(username)
        if user and verify_password(password, user.password):
            # Generate an access token
            access_token = generate_access_token(user._id)
            return {'access_token': access_token}, 200
        else:
            return {'message': 'Invalid username or password'}, 401

    def get_user_details(self, user_id):
        """Get user details."""
        user = User.find_by_id(ObjectId(user_id))
        if user:
            return {
                'username': user.username,
                'email': user.email
            }, 200
        else:
            return {'message': 'User not found'}, 404

    # You can add more methods for updating user details, deleting users, etc.

