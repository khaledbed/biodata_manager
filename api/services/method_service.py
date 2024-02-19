# api/services/method_service.py
from bson import ObjectId
from api.models.method import Method
from api.utils.serialization import serialize_object

class MethodService:
    def create_method(self, method_data):
        """
        Create a new method.
        :param method_data: Data for creating the method.
        :return: Created method.
        """
        method = Method(**method_data)
        method.save()
        return method

    def get_method_by_id(self, method_id):
        """
        Get a method by its ID.
        :param method_id: ID of the method to retrieve.
        :return: Retrieved method if found, otherwise None.
        """
        method = Method.find_by_id(ObjectId(method_id))
        return serialize_object(method)

    def update_method(self, method_id, method_data):
        """
        Update a method's attributes.
        :param method_id: ID of the method to update.
        :param method_data: New data for updating the method.
        :return: Updated method if successful, otherwise None.
        """
        method = Method.find_by_id(ObjectId(method_id))
        if method:
            method.update(**method_data)
        return serialize_object(method)

    def delete_method(self, method_id):
        """
        Delete a method.
        :param method_id: ID of the method to delete.
        :return: True if deletion was successful, otherwise False.
        """
        method = Method.find_by_id(ObjectId(method_id))
        if method:
            method.delete()
            return True
        return False

    def get_all_methods(self):
        """
        Get all methods.
        :return: List of all methods.
        """
        methods = Method.find_all()
        return [serialize_object(method) for method in methods]

