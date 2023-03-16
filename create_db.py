from backend import db, create_app
from backend.models import *
app = create_app()
with app.app_context():
    db.create_all()