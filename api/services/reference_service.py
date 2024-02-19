# api/services/reference_service.py
from bson import ObjectId
from api.models.reference import Reference
from api.utils.serialization import serialize_object

class ReferenceService:
    def create_reference(self, reference_data):
        """
        Create a new reference.
        :param reference_data: Data for creating the reference.
        :return: Created reference.
        """
        reference = Reference(**reference_data)
        reference.save()
        return reference

    def get_reference_by_id(self, reference_id):
        """
        Get a reference by its ID.
        :param reference_id: ID of the reference to retrieve.
        :return: Retrieved reference if found, otherwise None.
        """
        reference = Reference.find_by_id(ObjectId(reference_id))
        return serialize_object(reference) 

    def update_reference(self, reference_id, reference_data):
        """
        Update a reference's attributes.
        :param reference_id: ID of the reference to update.
        :param reference_data: New data for updating the reference.
        :return: Updated reference if successful, otherwise None.
        """
        reference = Reference.find_by_id(ObjectId(reference_id))
        if reference:
            reference.update(**reference_data)
        return serialize_object(reference) 

    def delete_reference(self, reference_id):
        """
        Delete a reference.
        :param reference_id: ID of the reference to delete.
        :return: True if deletion was successful, otherwise False.
        """
        reference = Reference.find_by_id(ObjectId(reference_id))
        if reference:
            reference.delete()
            return True
        return False

    def get_all_references(self):
        """
        Get all references.
        :return: List of all references.
        """
        references = Reference.find_all()
        return [serialize_object(reference) for reference in references]

