# api/services/annotation_service.py
from bson import ObjectId
from api.models.annotation import Annotation
from api.utils.serialization import serialize_object


class AnnotationService:
    def create_annotation(self, annotation_data):
        """
        Create a new annotation.
        :param annotation_data: Data for creating the annotation.
        :return: Created annotation.
        """
        annotation = Annotation(**annotation_data)
        annotation.save()
        return annotation

    def get_annotation_by_id(self, annotation_id):
        """
        Get an annotation by its ID.
        :param annotation_id: ID of the annotation to retrieve.
        :return: Retrieved annotation if found, otherwise None.
        """
        annotation = Annotation.find_by_id(ObjectId(annotation_id))
        return serialize_object(annotation)

    def update_annotation(self, annotation_id, annotation_data):
        """
        Update an annotation's attributes.
        :param annotation_id: ID of the annotation to update.
        :param annotation_data: New data for updating the annotation.
        :return: Updated annotation if successful, otherwise None.
        """
        annotation = Annotation.find_by_id(ObjectId(annotation_id))
        if annotation:
            annotation.update(**annotation_data)
        return serialize_object(annotation)

    def delete_annotation(self, annotation_id):
        """
        Delete an annotation.
        :param annotation_id: ID of the annotation to delete.
        :return: True if deletion was successful, otherwise False.
        """
        annotation = Annotation.find_by_id(ObjectId(annotation_id))
        if annotation:
            annotation.delete()
            return True
        return False

    def get_all_annotations(self):
        """
        Get all annotations.
        :return: List of all annotations.
        """
        annotations = Annotation.find_all()
        return [serialize_object(annotation) for annotation in annotations]
