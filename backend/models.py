from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from backend import db

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mobile_number = db.Column(db.Integer, index=True, unique=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        # return check_password_hash(self.password_hash, password)
        return (self.password_hash == password)

