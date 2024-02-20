# api/routes/user_routes.py

from flask import Blueprint, request, jsonify
from api.services.user_service import UserService

user_blueprint = Blueprint('user', __name__, url_prefix='/users')
user_service = UserService()

@user_blueprint.route('/register', methods=['POST'])
def register_user():
    """Route for user registration."""
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return {'message': 'Username, email, and password are required'}, 400

    response, status_code = user_service.register_user(username, email, password)
    return jsonify(response), status_code

@user_blueprint.route('/login', methods=['POST'])
def login_user():
    """Route for user login."""
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return {'message': 'Username and password are required'}, 400

    response, status_code = user_service.authenticate_user(username, password)
    print(request.json ," ___ ",jsonify(response).json)
    return jsonify(response), status_code

@user_blueprint.route('/profile/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    """Route to get user profile."""
    response, status_code = user_service.get_user_details(user_id)
    return jsonify(response), status_code

# You can add more routes for updating user details, deleting users, etc.

