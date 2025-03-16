from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from flask_migrate import Migrate

src = Flask(__name__)
src.config.from_object(Config)

db = SQLAlchemy(src)

migrate = Migrate(src, db)

login_manager = LoginManager()
login_manager.init_app(src)
login_manager.login_view = 'login'

CORS(src)
from src.views import views

from src.auth import auth

src.register_blueprint(views)
src.register_blueprint(auth)