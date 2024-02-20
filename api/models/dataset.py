# models/dataset.py

from api.utils.database import get_database_connection

class Dataset:
    def __init__(self, name, description, data, _id=None):
        self._id = _id
        self.name = name
        self.description = description
        self.data = data

    def save(self):
        """
        Save the dataset to the database.
        """
        db = get_database_connection()
        result = db.datasets.insert_one({
            "name": self.name,
            "description": self.description,
            "data": self.data
        })
        return result.inserted_id

    def update(self, **kwargs):
        """
        Update the dataset attributes.
        """
        db = get_database_connection()
        db.datasets.update_one({"_id": self._id}, {"$set": kwargs})

    def delete(self):
        """
        Delete the dataset from the database.
        """
        db = get_database_connection()
        db.datasets.delete_one({"_id": self._id})

    @staticmethod
    def find_by_id(dataset_id):
        """
        Find a dataset by its ID.
        """
        db = get_database_connection()
        dataset_data = db.datasets.find_one({"_id": dataset_id})
        if dataset_data:
            return Dataset(**dataset_data)
        return None

    @staticmethod
    def find_all():
        """
        Find all datasets in the database.
        """
        db = get_database_connection()
        datasets_data = db.datasets.find()
        return [Dataset(**dataset_data) for dataset_data in datasets_data]
