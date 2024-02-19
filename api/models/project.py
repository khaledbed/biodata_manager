# models/project.py

from api.utils.database import get_database_connection

class Project:
    def __init__(self, project_name, project_description, methods_used, samples, _id=None):
        self._id = _id
        self.project_name = project_name
        self.project_description = project_description
        self.methods_used = methods_used
        self.samples = samples

    def save(self):
        """
        Save the project to the database.
        """
        db = get_database_connection()
        result = db.projects.insert_one({
            "project_name": self.project_name,
            "project_description": self.project_description,
            "methods_used": self.methods_used,
            "samples": self.samples
        })
        return result.inserted_id

    def update(self, **kwargs):
        """
        Update the project attributes.
        """
        db = get_database_connection()
        db.projects.update_one({"_id": self._id}, {"$set": kwargs})

    def delete(self):
        """
        Delete the project from the database.
        """
        db = get_database_connection()
        db.projects.delete_one({"_id": self._id})

    @staticmethod
    def find_by_id(project_id):
        """
        Find a project by its ID.
        """
        db = get_database_connection()
        project_data = db.projects.find_one({"_id": project_id})
        if project_data:
            return Project(**project_data)
        return None

    @staticmethod
    def find_all():
        """
        Find all projects in the database.
        """
        db = get_database_connection()
        projects_data = db.projects.find()
        return [Project(**project_data) for project_data in projects_data]

