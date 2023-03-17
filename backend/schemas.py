from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from backend.models import *

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User