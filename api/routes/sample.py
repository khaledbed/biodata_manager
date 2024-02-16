# api/routes/sample.py

from flask import Blueprint, jsonify, request
from api.services.sample_service import SampleService

sample_blueprint = Blueprint('sample', __name__, url_prefix='/samples')
sample_service = SampleService()

@sample_blueprint.route('/', methods=['GET'])
def get_all_samples():
    samples = sample_service.get_all_samples()
    return jsonify({'samples': samples})

@sample_blueprint.route('/<sample_id>', methods=['GET'])
def get_sample(sample_id):
    sample = sample_service.get_sample_by_id(sample_id)
    if sample:
        return jsonify(sample), 200
    return jsonify({'message': 'Sample not found'}), 404

@sample_blueprint.route('/', methods=['POST'])
def create_sample():
    data = request.json
    sample = sample_service.create_sample(data)
    return jsonify(sample), 201

@sample_blueprint.route('/<sample_id>', methods=['PUT'])
def update_sample(sample_id):
    data = request.json
    sample = sample_service.update_sample(sample_id, data)
    if sample:
        return jsonify(sample), 200
    return jsonify({'message': 'Sample not found'}), 404

@sample_blueprint.route('/<sample_id>', methods=['DELETE'])
def delete_sample(sample_id):
    deleted = sample_service.delete_sample(sample_id)
    if deleted:
        return jsonify({'message': 'Sample deleted successfully'}), 200
    return jsonify({'message': 'Sample not found'}), 404

