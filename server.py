# api/app.py

from flask import Flask
from api.config import Config, DevelopmentConfig, ProductionConfig, TestingConfig
from api.utils.database import connect_to_database, disconnect_from_database
from api.routes.annotation import annotation_blueprint
from api.routes.method import method_blueprint
from api.routes.project import project_blueprint
from api.routes.reference import reference_blueprint
from api.routes.sample import sample_blueprint
from api.routes.user import user_blueprint
from api.test.insert_test_data import insert_test_data

def create_app(config_name):
    app = Flask(__name__)
    config_mapping = {
        'development': DevelopmentConfig,
        'production': ProductionConfig,
        'testing': TestingConfig
    }
    app.config.from_object(config_mapping[config_name])

    # Register blueprints
    register_blueprints(app)

    # Register extensions
    register_extensions(app)

    # Register error handlers
    register_error_handlers(app)

    # Register logging
    register_logging(app)

    # Register commands
    register_commands(app)

    return app

def register_blueprints(app):
    app.register_blueprint(annotation_blueprint)
    app.register_blueprint(method_blueprint)
    app.register_blueprint(project_blueprint)
    app.register_blueprint(reference_blueprint)
    app.register_blueprint(sample_blueprint)
    app.register_blueprint(user_blueprint)

def register_extensions(app):
    connect_to_database()

def register_error_handlers(app):
    pass

def register_logging(app):
    pass

def register_commands(app):
    pass

if __name__ == "__main__":
    app = create_app('development')
    #insert_test_data()
    app.run(debug=True)

