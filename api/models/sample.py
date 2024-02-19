# models/sample.py

from api.utils.database import get_database_connection

class Sample:
    def __init__(self, sample_name, sample_type, metadata, data, _id=None):
        self._id = _id
        self.sample_name = sample_name
        self.sample_type = sample_type
        self.metadata = metadata
        self.data = data

    def save(self):
        """
        Save the sample to the database.
        """
        db = get_database_connection()
        result = db.samples.insert_one({
            "sample_name": self.sample_name,
            "sample_type": self.sample_type,
            "metadata": self.metadata,
            "data": self.data
        })
        return result.inserted_id

    def update(self, **kwargs):
        """
        Update the sample attributes.
        """
        db = get_database_connection()
        db.samples.update_one({"_id": self._id}, {"$set": kwargs})

    def delete(self):
        """
        Delete the sample from the database.
        """
        db = get_database_connection()
        db.samples.delete_one({"_id": self._id})

    @staticmethod
    def find_by_id(sample_id):
        """
        Find a sample by its ID.
        """
        db = get_database_connection()
        sample_data = db.samples.find_one({"_id": sample_id})
        if sample_data:
            return Sample(**sample_data)
        return None

    @staticmethod
    def find_all():
        """
        Find all samples in the database.
        """
        db = get_database_connection()
        samples_data = db.samples.find()
        return [Sample(**sample_data) for sample_data in samples_data]

