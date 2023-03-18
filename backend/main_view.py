from flask import Blueprint, redirect, url_for, jsonify, request
from flask_login import login_required, current_user
import os
from backend.models import *
from backend.schemas import *

bp = Blueprint('main',__name__, static_folder=os.path.abspath(r'frontend/dist/frontend/'), static_url_path='/')

@login_required
@bp.route('/')
def home():
    return bp.send_static_file('index.html')


@bp.route('/<path:path>')
def catch_all(path):
    return redirect(url_for('bp.home'))

@bp.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

@bp.route('/api/users')
def getUsers() :
    users = db.session.query(User).all()
    return jsonify(UserSchema(many=True).dump(users))

@bp.route('/api/create_group', methods=[ 'POST'])
@login_required
def create_group():
    name = request.json['name']
    member_ids = request.json['ids']

    group = Group(name=name)
    for member_id in member_ids :
        user = User.query.get(member_id)
        if user:
            group.members.append(user)

    group.members.append(current_user)

    db.session.add(group)
    db.session.commit()

    returned_group = GroupSchema().dump(group)
    returned_group['members'] = UserSchema(many=True).dump(group.members)
    return jsonify(returned_group)
