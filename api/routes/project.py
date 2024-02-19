# api/routes/project.py

from flask import Blueprint, jsonify, request
from api.services.project_service import ProjectService

project_blueprint = Blueprint('project', __name__, url_prefix='/projects')
project_service = ProjectService()

@project_blueprint.route('/', methods=['GET'])
def get_all_projects():
    projects = project_service.get_all_projects()

    return jsonify({'projects': projects})

@project_blueprint.route('/<project_id>', methods=['GET'])
def get_project(project_id):
    project = project_service.get_project_by_id(project_id)
    if project:
        return jsonify(project), 200
    return jsonify({'message': 'Project not found'}), 404

@project_blueprint.route('/', methods=['POST'])
def create_project():
    data = request.json
    project = project_service.create_project(data)
    return jsonify(project), 201

@project_blueprint.route('/<project_id>', methods=['PUT'])
def update_project(project_id):
    data = request.json
    project = project_service.update_project(project_id, data)
    if project:
        return jsonify(project), 200
    return jsonify({'message': 'Project not found'}), 404

@project_blueprint.route('/<project_id>', methods=['DELETE'])
def delete_project(project_id):
    deleted = project_service.delete_project(project_id)
    if deleted:
        return jsonify({'message': 'Project deleted successfully'}), 200
    return jsonify({'message': 'Project not found'}), 404

