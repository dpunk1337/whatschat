from marshmallow import EXCLUDE
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from backend.models import *


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User


class GroupSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Group

class GroupMessageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = GroupMessage
