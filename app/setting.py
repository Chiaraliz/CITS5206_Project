import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv('.env')

# Calculate the base directory for constructing the database file path
basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

class BaseConfig(object):
    # SQLAlchemy configuration, disable modification tracking to improve performance
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Get database connection information from environment variables (example)
    DATABASE_USER = os.getenv('DATABASE_USER')
    DATABASE_PWD = os.getenv('DATABASE_PWD')
    DATABASE_HOST = os.getenv('DATABASE_HOST')
    DATABASE_PORT = os.getenv('DATABASE_PORT')

class DevelopmentConfig(BaseConfig):
    # Use SQLite, database file named users.db, located in the project's root directory
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app/users.db')
    
    # Configure Redis, assuming Redis server is running locally on the default port 6379
    REDIS_URL = "redis://localhost:6379"



class ProductionConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app/users1.db')

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
