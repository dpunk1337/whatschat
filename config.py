import os

class Config:
    SECRET_KEY = 'my-secret-key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite'
    DEBUG = True