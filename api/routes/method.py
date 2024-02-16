# api/routes/method.py

from flask import Blueprint, jsonify, request
from api.services.method_service import MethodService

method_blueprint = Blueprint('method', __name__, url_prefix='/methods')
method_service = MethodService()

@method_blueprint.route('/', methods=['GET'])
def get_all_methods():
    methods = method_service.get_all_methods()
    return jsonify({'methods': methods})

@method_blueprint.route('/<method_id>', methods=['GET'])
def get_method(method_id):
    method = method_service.get_method_by_id(method_id)
    if method:
        return jsonify(method), 200
    return jsonify({'message': 'Method not found'}), 404

@method_blueprint.route('/', methods=['POST'])
def create_method():
    data = request.json
    method = method_service.create_method(data)
    return jsonify(method), 201

@method_blueprint.route('/<method_id>', methods=['PUT'])
def update_method(method_id):
    data = request.json
    method = method_service.update_method(method_id, data)
    if method:
        return jsonify(method), 200
    return jsonify({'message': 'Method not found'}), 404

@method_blueprint.route('/<method_id>', methods=['DELETE'])
def delete_method(method_id):
    deleted = method_service.delete_method(method_id)
    if deleted:
        return jsonify({'message': 'Method deleted successfully'}), 200
    return jsonify({'message': 'Method not found'}), 404

