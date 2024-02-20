# api/routes/dataset.py

from flask import Blueprint, jsonify, request
from api.services.dataset_service import DatasetService

dataset_blueprint = Blueprint('dataset', __name__, url_prefix='/datasets')
dataset_service = DatasetService()

@dataset_blueprint.route('/', methods=['GET'])
def get_all_datasets():
    datasets = dataset_service.get_all_datasets()
    return jsonify({'datasets': datasets})

@dataset_blueprint.route('/<dataset_id>', methods=['GET'])
def get_dataset(dataset_id):
    dataset = dataset_service.get_dataset_by_id(dataset_id)
    if dataset:
        return jsonify(dataset), 200
    return jsonify({'message': 'Dataset not found'}), 404

@dataset_blueprint.route('/', methods=['POST'])
def create_dataset():
    data = request.json
    dataset = dataset_service.create_dataset(data)
    return jsonify(dataset), 201

@dataset_blueprint.route('/<dataset_id>', methods=['PUT'])
def update_dataset(dataset_id):
    data = request.json
    dataset = dataset_service.update_dataset(dataset_id, data)
    if dataset:
        return jsonify(dataset), 200
    return jsonify({'message': 'Dataset not found'}), 404

@dataset_blueprint.route('/<dataset_id>', methods=['DELETE'])
def delete_dataset(dataset_id):
    deleted = dataset_service.delete_dataset(dataset_id)
    if deleted:
        return jsonify({'message': 'Dataset deleted successfully'}), 200
    return jsonify({'message': 'Dataset not found'}), 404

@dataset_blueprint.route('/<dataset_id>/metadata', methods=['GET'])
def get_metadata_for_dataset(dataset_id):
    metadata = dataset_service.get_metadata_for_dataset(dataset_id)
    return jsonify(metadata)

@dataset_blueprint.route('/<dataset_id>/metadata', methods=['DELETE'])
def delete_metadata_from_dataset(dataset_id):
    deleted = dataset_service.delete_metadata_from_dataset(dataset_id)
    if deleted:
        return jsonify({'message': 'Metadata deleted successfully'}), 200
    return jsonify({'message': 'Metadata not found'}), 404
