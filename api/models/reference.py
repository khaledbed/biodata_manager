# models/reference.py

from api.utils.database import get_database_connection

class Reference:
    def __init__(self, title, authors, journal, pub_year, _id =None):
        self._id = _id
        self.title = title
        self.authors = authors
        self.journal = journal
        self.pub_year = pub_year

    def save(self):
        """
        Save the reference to the database.
        """
        db = get_database_connection()
        result = db.references.insert_one({
            "title": self.title,
            "authors": self.authors,
            "journal": self.journal,
            "pub_year": self.pub_year
        })
        return result.inserted_id

    def update(self, **kwargs):
        """
        Update the reference attributes.
        """
        db = get_database_connection()
        db.references.update_one({"_id": self._id}, {"$set": kwargs})

    def delete(self):
        """
        Delete the reference from the database.
        """
        db = get_database_connection()
        db.references.delete_one({"_id": self._id})

    @staticmethod
    def find_by_id(reference_id):
        """
        Find a reference by its ID.
        """
        db = get_database_connection()
        reference_data = db.references.find_one({"_id": reference_id})
        if reference_data:
            return Reference(**reference_data)
        return None

    @staticmethod
    def find_all():
        """
        Find all references in the database.
        """
        db = get_database_connection()
        references_data = db.references.find()
        return [Reference(**reference_data) for reference_data in references_data]

