# models/method.py

from api.utils.database import get_database_connection

class Method:
    def __init__(self, name, description, _id=None):
        self._id = _id
        self.name = name
        self.description = description

    def save(self):
        """
        Save the method to the database.
        """
        db = get_database_connection()
        result = db.methods.insert_one({"name": self.name, "description": self.description})
        return result.inserted_id

    def update(self, **kwargs):
        """
        Update the method attributes.
        """
        db = get_database_connection()
        db.methods.update_one({"_id": self._id}, {"$set": kwargs})

    def delete(self):
        """
        Delete the method from the database.
        """
        db = get_database_connection()
        db.methods.delete_one({"_id": self._id})

    @staticmethod
    def find_by_id(method_id):
        """
        Find a method by its ID.
        """
        db = get_database_connection()
        method_data = db.methods.find_one({"_id": method_id})
        if method_data:
            return Method(**method_data)
        return None

    @staticmethod
    def find_all():
        """
        Find all methods in the database.
        """
        db = get_database_connection()
        methods_data = db.methods.find()
        return [Method(**method_data) for method_data in methods_data]

