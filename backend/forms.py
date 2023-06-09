from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    mobile_number = StringField('Mobile number', validators=[DataRequired()])
    remember_me = BooleanField('Remember me')
    # submit = SubmitField('Log in')
