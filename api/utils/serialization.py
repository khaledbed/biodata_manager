# api/utils/serialization.py

from bson import ObjectId

def serialize_object(obj):
    """Serialize an object to a dictionary."""
    serialized_obj = obj.__dict__
    if '_id' in serialized_obj:
        serialized_obj['_id'] = str(serialized_obj['_id'])  # Convert ObjectId to string
    return serialized_obj

