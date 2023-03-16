from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_user, login_required, logout_user, current_user
from backend import login_manager
from backend.models import User
from backend.forms import *

bp = Blueprint('auth',__name__)

@bp.route('/api/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    print(request)
    print(request.form['username'])
    form = LoginForm()
    # if form.validate_on_submit():
    print('yes')
    user = User.query.filter_by(username=form.username.data).first()
    if user is None or not user.check_password(form.password.data):
        flash('Invalid username or password')
        print("no go")
        return redirect(url_for('auth.login'))
    login_user(user, remember=form.remember_me.data)
    return jsonify({'message': 'Login successful'})


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@login_required
@bp.route('/api/logout',methods=['GET'])
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'})


