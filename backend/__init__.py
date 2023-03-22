from flask import Flask
from flask_login import LoginManager
from config import Config, TestConfig
from backend.database import db
from backend.models import *

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

    with app.app_context():
        db.create_all()
        create_admin_user()

    return app

def create_test_app():
    app = Flask(__name__)
    app.config.from_object(TestConfig)
    login_manager.login_view = 'auth.login'

    db.init_app(app)
    login_manager.init_app(app)

    from backend import auth_view, main_view
    app.register_blueprint(auth_view.bp)
    app.register_blueprint(main_view.bp)

    return app

def create_admin_user():
    admin_user_details = {'username': 'admin', 'mobile_number': 1234567890, 'password_hash': 'admin', 'is_admin': 1}
    existing_admin_user = db.session.query(User).filter(
        (User.mobile_number == admin_user_details['mobile_number']) &
        (User.username == admin_user_details['username'])).first()
    if not existing_admin_user:
        admin_user = User(username=admin_user_details['username'],
                          mobile_number=admin_user_details['mobile_number'],
                          password_hash=admin_user_details['password_hash'],
                          is_admin=admin_user_details['is_admin'])
        db.session.add(admin_user)
        db.session.commit()