from flask import Flask
from flask_login import LoginManager
from config import Config
from backend.database import db

login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    login_manager.login_view = 'auth.login'

    db.init_app(app)
    login_manager.init_app(app)

    from backend import auth_view, main_view
    app.register_blueprint(auth_view.bp)
    app.register_blueprint(main_view.bp)

    return app