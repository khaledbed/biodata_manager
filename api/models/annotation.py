# models/annotation.py

from api.utils.database import get_database_connection

class Annotation:
    def __init__(self, content, _id=None):
        self._id = _id
        self.content = content

    def save(self):
        """
        Save the annotation to the database.
        """
        db = get_database_connection()
        result = db.annotations.insert_one({"content": self.content})
        return result.inserted_id

    def update(self, **kwargs):
        """
        Update the annotation attributes.
        """
        db = get_database_connection()
        db.annotations.update_one({"_id": self._id}, {"$set": kwargs})

    def delete(self):
        """
        Delete the annotation from the database.
        """
        db = get_database_connection()
        db.annotations.delete_one({"_id": self._id})

    @staticmethod
    def find_by_id(annotation_id):
        """
        Find an annotation by its ID.
        """
        db = get_database_connection()
        annotation_data = db.annotations.find_one({"_id": annotation_id})
        if annotation_data:
            return Annotation(**annotation_data)
        return None

    @staticmethod
    def find_all():
        """
        Find all annotations in the database.
        """
        db = get_database_connection()
        annotations_data = db.annotations.find()
        return [Annotation(**annotation_data) for annotation_data in annotations_data]

