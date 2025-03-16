import os
from dotenv import load_dotenv

load_dotenv()

class Config(object):
    SECRET_KEY = os.environ.get('SECREK_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', '').replace('postgres://', 'postgresql://')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = 'Content-Type'