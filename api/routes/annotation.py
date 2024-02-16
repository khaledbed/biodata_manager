# api/routes/annotation.py

from flask import Blueprint, jsonify, request
from api.services.annotation_service import AnnotationService

annotation_blueprint = Blueprint('annotation', __name__, url_prefix='/annotations')
annotation_service = AnnotationService()

@annotation_blueprint.route('/', methods=['GET'])
def get_all_annotations():
    annotations = annotation_service.get_all_annotations()
    return jsonify({'annotations': annotations})

@annotation_blueprint.route('/<annotation_id>', methods=['GET'])
def get_annotation(annotation_id):
    annotation = annotation_service.get_annotation_by_id(annotation_id)
    if annotation:
        return jsonify(annotation), 200
    return jsonify({'message': 'Annotation not found'}), 404

@annotation_blueprint.route('/', methods=['POST'])
def create_annotation():
    data = request.json
    annotation = annotation_service.create_annotation(data)
    return jsonify(annotation), 201

@annotation_blueprint.route('/<annotation_id>', methods=['PUT'])
def update_annotation(annotation_id):
    data = request.json
    annotation = annotation_service.update_annotation(annotation_id, data)
    if annotation:
        return jsonify(annotation), 200
    return jsonify({'message': 'Annotation not found'}), 404

@annotation_blueprint.route('/<annotation_id>', methods=['DELETE'])
def delete_annotation(annotation_id):
    deleted = annotation_service.delete_annotation(annotation_id)
    if deleted:
        return jsonify({'message': 'Annotation deleted successfully'}), 200
    return jsonify({'message': 'Annotation not found'}), 404

