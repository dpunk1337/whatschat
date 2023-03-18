from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from backend import db

group_membership = db.Table('group_membership',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('group_id', db.Integer, db.ForeignKey('chat_group.id'))
)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mobile_number = db.Column(db.Integer, index=True, unique=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    group_messages = db.relationship('GroupMessage', backref='user', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        # return check_password_hash(self.password_hash, password)
        return (self.password_hash == password)

class Group(db.Model):
    __tablename__ = 'chat_group'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    group_messages = db.relationship('GroupMessage', backref='chat_group', lazy='dynamic')
    members = db.relationship('User', secondary=group_membership, backref=db.backref('groups', lazy='dynamic'), lazy='dynamic')
    # members = db.relationship('User', secondary=group_membership, backref=db.backref('groups', lazy='joined'), lazy='joined')

    def __repr__(self):
        return '<Group {}>'.format(self.name)

class GroupMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(256))
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('chat_group.id'))

    def __repr__(self):
        return '<GroupMessage {}>'.format(self.body)

