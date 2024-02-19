# api/services/project_service.py
from bson import ObjectId
from api.models.project import Project
from api.utils.serialization import serialize_object


class ProjectService:
    def create_project(self, project_data):
        """
        Create a new project.
        :param project_data: Data for creating the project.
        :return: Created project.
        """
        project = Project(**project_data)
        project.save()
        return project

    def get_project_by_id(self, project_id):
        """
        Get a project by its ID.
        :param project_id: ID of the project to retrieve.
        :return: Retrieved project if found, otherwise None.
        """
        project = Project.find_by_id(ObjectId(project_id))
        return serialize_object(project)

    def update_project(self, project_id, project_data):
        """
        Update a project's attributes.
        :param project_id: ID of the project to update.
        :param project_data: New data for updating the project.
        :return: Updated project if successful, otherwise None.
        """
        project = Project.find_by_id(ObjectId(project_id))
        if project:
            project.update(**project_data)
        return serialize_object(project)

    def delete_project(self, project_id):
        """
        Delete a project.
        :param project_id: ID of the project to delete.
        :return: True if deletion was successful, otherwise False.
        """
        project = Project.find_by_id(ObjectId(project_id))
        if project:
            project.delete()
            return True
        return False

    def get_all_projects(self):
        """
        Get all projects.
        :return: List of all projects.
        """
        projects = Project.find_all()
        return [serialize_object(project) for project in projects]
