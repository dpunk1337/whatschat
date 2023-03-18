from flask import Blueprint, redirect, url_for, jsonify, request
from flask_login import login_required, current_user
import os
from backend.models import *
from backend.schemas import *

bp = Blueprint('main', __name__, static_folder=os.path.abspath(r'frontend/dist/frontend/'), static_url_path='/')


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
def getUsers():
    users = db.session.query(User).all()
    return jsonify(UserSchema(many=True).dump(users))


@bp.route('/api/create_group', methods=['POST'])
@login_required
def create_group():
    name = request.json['name']
    member_ids = request.json['ids']

    group = Group(name=name)
    for member_id in member_ids:
        user = User.query.get(member_id)
        if user:
            group.members.append(user)

    group.members.append(current_user)

    db.session.add(group)
    db.session.commit()

    returned_group = GroupSchema().dump(group)
    returned_group['members'] = UserSchema(many=True).dump(group.members)
    return jsonify(returned_group)


@bp.route('/api/group', methods=['GET'])
def get_group():
    id = request.form['id']
    return jsonify(GroupSchema().dump(Group.query.get(int(id))))


@bp.route('/api/getGroupMembers', methods=['POST'])
def get_group_members():
    id = request.form['id']
    group = Group.query.get(int(id))
    return jsonify(UserSchema(many=True).dump(group.members))

@bp.route('/api/addGroupMember', methods=['POST'])
def add_group_member():
    user_id = request.form['user_id']
    group_id = request.form['group_id']
    group = Group.query.get(int(group_id))
    user = User.query.get(int(user_id))
    if user is None or user in group.members:
        return jsonify({'message': 'user not found or user already added'}), 404
    group.members.append(user)
    db.session.commit()
    return jsonify({'message': 'Member added successfully'})

@bp.route('/api/removeGroupMember', methods=['POST'])
def remove_group_member():
    user_id = request.form['user_id']
    group_id = request.form['group_id']
    group = Group.query.get(int(group_id))
    user = User.query.get(int(user_id))
    if user is None or user not in group.members:
        return jsonify({'message': 'user not found or user is not a member'}), 404
    group.members.remove(user)
    db.session.commit()
    return jsonify({'message': 'Member removed successfully'})
