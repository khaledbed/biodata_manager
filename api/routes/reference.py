# api/routes/reference.py

from flask import Blueprint, jsonify, request
from api.services.reference_service import ReferenceService

reference_blueprint = Blueprint('reference', __name__, url_prefix='/references')
reference_service = ReferenceService()

@reference_blueprint.route('/', methods=['GET'])
def get_all_references():
    references = reference_service.get_all_references()
    return jsonify({'references': references})

@reference_blueprint.route('/<reference_id>', methods=['GET'])
def get_reference(reference_id):
    reference = reference_service.get_reference_by_id(reference_id)
    if reference:
        return jsonify(reference), 200
    return jsonify({'message': 'Reference not found'}), 404

@reference_blueprint.route('/', methods=['POST'])
def create_reference():
    data = request.json
    reference = reference_service.create_reference(data)
    return jsonify(reference), 201

@reference_blueprint.route('/<reference_id>', methods=['PUT'])
def update_reference(reference_id):
    data = request.json
    reference = reference_service.update_reference(reference_id, data)
    if reference:
        return jsonify(reference), 200
    return jsonify({'message': 'Reference not found'}), 404

@reference_blueprint.route('/<reference_id>', methods=['DELETE'])
def delete_reference(reference_id):
    deleted = reference_service.delete_reference(reference_id)
    if deleted:
        return jsonify({'message': 'Reference deleted successfully'}), 200
    return jsonify({'message': 'Reference not found'}), 404

