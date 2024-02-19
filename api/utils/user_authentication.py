# api/utils/user_authentication.py

import bcrypt
import jwt
from datetime import datetime, timedelta
from flask import current_app

# Secret key for JWT token
SECRET_KEY = "your_secret_key_here"  # Replace with your actual secret key

def generate_password_hash(password):
    """Generate a hashed password."""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

def verify_password(password, hashed_password):
    """Verify a password against its hashed value."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

def generate_access_token(user_id):
    """Generate an access token."""
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }
    access_token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return access_token

def decode_access_token(access_token):
    """Decode an access token."""
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=['HS256'])
        return payload.get('user_id')
    except jwt.ExpiredSignatureError:
        return None  # Token has expired
    except jwt.InvalidTokenError:
        return None  # Token is invalid

# You can add more functions for token validation, refresh token generation, etc.

