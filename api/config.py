# api/config.py

import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key'
    MONGODB_URI = os.environ.get('MONGODB_URI') or 'mongodb://localhost:27017/biodata_manager'

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

class TestingConfig(Config):
    TESTING = True

