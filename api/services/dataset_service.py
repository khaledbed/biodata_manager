# api/services/dataset_service.py

from bson import ObjectId
from api.models.dataset import Dataset
from api.models.metadata import Metadata
from api.utils.serialization import serialize_object

class DatasetService:
    def create_dataset(self, dataset_data):
        """
        Create a new dataset.
        :param dataset_data: Data for creating the dataset.
        :return: Created dataset.
        """
        dataset = Dataset(**dataset_data)
        dataset.save()
        return dataset

    def get_dataset_by_id(self, dataset_id):
        """
        Get a dataset by its ID.
        :param dataset_id: ID of the dataset to retrieve.
        :return: Retrieved dataset if found, otherwise None.
        """
        dataset = Dataset.find_by_id(ObjectId(dataset_id))
        return serialize_object(dataset)

    def update_dataset(self, dataset_id, dataset_data):
        """
        Update a dataset's attributes.
        :param dataset_id: ID of the dataset to update.
        :param dataset_data: New data for updating the dataset.
        :return: Updated dataset if successful, otherwise None.
        """
        dataset = Dataset.find_by_id(ObjectId(dataset_id))
        if dataset:
            dataset.update(**dataset_data)
        return serialize_object(dataset)

    def delete_dataset(self, dataset_id):
        """
        Delete a dataset.
        :param dataset_id: ID of the dataset to delete.
        :return: True if deletion was successful, otherwise False.
        """
        dataset = Dataset.find_by_id(ObjectId(dataset_id))
        if dataset:
            dataset.delete()
            return True
        return False

    def get_all_datasets(self):
        """
        Get all datasets.
        :return: List of all datasets.
        """
        datasets = Dataset.find_all()
        return [serialize_object(dataset) for dataset in datasets]

    def get_metadata_for_dataset(self, dataset_id):
        """
        Get metadata associated with a dataset.
        :param dataset_id: ID of the dataset to retrieve metadata for.
        :return: Metadata associated with the dataset.
        """
        metadata = Metadata.find_by_dataset_id(ObjectId(dataset_id))
        return [serialize_object(meta) for meta in metadata]

    def delete_metadata_from_dataset(self, dataset_id):
        """
        Delete metadata associated with a dataset.
        :param dataset_id: ID of the dataset to delete metadata from.
        :return: True if deletion was successful, otherwise False.
        """
        metadata = Metadata.find_by_dataset_id(ObjectId(dataset_id))
        if metadata:
            for meta in metadata:
                meta.delete()
            return True
        return False
