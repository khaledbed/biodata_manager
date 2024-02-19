# api/services/sample_service.py
from bson import ObjectId
from api.models.sample import Sample
from api.utils.serialization import serialize_object


class SampleService:
    def create_sample(self, sample_data):
        """
        Create a new sample.
        :param sample_data: Data for creating the sample.
        :return: Created sample.
        """
        sample = Sample(**sample_data)
        sample.save()
        return sample

    def get_sample_by_id(self, sample_id):
        """
        Get a sample by its ID.
        :param sample_id: ID of the sample to retrieve.
        :return: Retrieved sample if found, otherwise None.
        """
        sample = Sample.find_by_id(ObjectId(sample_id))
        return serialize_object(sample)

    def update_sample(self, sample_id, sample_data):
        """
        Update a sample's attributes.
        :param sample_id: ID of the sample to update.
        :param sample_data: New data for updating the sample.
        :return: Updated sample if successful, otherwise None.
        """
        sample = Sample.find_by_id(ObjectId(sample_id))
        if sample:
            sample.update(**sample_data)
        return serialize_object(sample)

    def delete_sample(self, sample_id):
        """
        Delete a sample.
        :param sample_id: ID of the sample to delete.
        :return: True if deletion was successful, otherwise False.
        """
        sample = Sample.find_by_id(ObjectId(sample_id))
        if sample:
            sample.delete()
            return True
        return False

    def get_all_samples(self):
        """
        Get all samples.
        :return: List of all samples.
        """
        samples = Sample.find_all()
        return [serialize_object(sample) for sample in samples]

