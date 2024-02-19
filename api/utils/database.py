# utils/database.py

# Import necessary libraries for database connection
import pymongo

# Database connection details
DATABASE_NAME = "biodata_manager"
DATABASE_URL = "mongodb://localhost:27017/biodata_manager"

# Database client instance
db_client = None

def connect_to_database():
    """
    Connect to the MongoDB database.
    """
    global db_client
    db_client = pymongo.MongoClient(DATABASE_URL)
    return db_client[DATABASE_NAME]

def disconnect_from_database():
    """
    Disconnect from the MongoDB database.
    """
    global db_client
    if db_client:
        db_client.close()

def get_database_connection():
    """
    Get the database connection instance.
    """
    return db_client[DATABASE_NAME]

