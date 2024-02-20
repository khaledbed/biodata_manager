# models/metadata.py

from api.utils.database import get_database_connection

class Metadata:
    def __init__(self, dataset_id, key, value, _id=None):
        self._id = _id
        self.dataset_id = dataset_id
        self.key = key
        self.value = value

    def save(self):
        """
        Save the metadata to the database.
        """
        db = get_database_connection()
        result = db.metadata.insert_one({
            "dataset_id": self.dataset_id,
            "key": self.key,
            "value": self.value
        })
        return result.inserted_id

    def update(self, **kwargs):
        """
        Update the metadata attributes.
        """
        db = get_database_connection()
        db.metadata.update_one({"_id": self._id}, {"$set": kwargs})

    def delete(self):
        """
        Delete the metadata from the database.
        """
        db = get_database_connection()
        db.metadata.delete_one({"_id": self._id})

    @staticmethod
    def find_by_dataset_id(dataset_id):
        """
        Find metadata by dataset ID.
        """
        db = get_database_connection()
        metadata_data = db.metadata.find({"dataset_id": dataset_id})
        return [Metadata(**meta_data) for meta_data in metadata_data]
