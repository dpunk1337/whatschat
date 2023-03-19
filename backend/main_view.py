from flask import Blueprint, redirect, url_for, jsonify, request
from flask_login import login_required, current_user
import os
import json
from backend.models import *
from backend.schemas import *
from sqlalchemy import desc
from datetime import datetime

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

@bp.route('/api/getMemberGroups', methods=['POST'])
def get_member_groups():
    id = request.form['id']
    user = User.query.get(int(id))
    return jsonify(GroupSchema(many=True).dump(user.groups))

@bp.route('/api/getMemberConversations', methods=['POST'])
def get_member_conversations():
    id = request.form['id']
    user = User.query.get(int(id))
    conversations = GroupSchema(many=True).dump(user.groups)
    return jsonify(conversations)

@bp.route('/api/getGroupMessages', methods=['POST'])
def get_group_messages():
    id = request.form['id']
    group = Group.query.get(int(id))
    group_messages = group.group_messages.order_by(desc(GroupMessage.created_at))
    messages = GroupMessageSchema(many=True).dump(group_messages)
    user_id_to_name_map = {}
    for user in group.members:
        user_id_to_name_map[user.id]=user.username
    for index, message in enumerate(messages):
        message['user_id'] = group_messages[index].user_id
        message['group_id'] = group_messages[index].group_id
        message['timestamp'] = datetime.strptime(message['created_at'], "%Y-%m-%dT%H:%M:%S.%f").strftime("%d %B %I:%M %p")
        message['username'] = user_id_to_name_map[group_messages[index].user_id]
    return jsonify(messages)

@bp.route('/api/addGroupMessage', methods=['POST'])
def add_group_message():
    data = request.json
    user_id = data.get('user_id')
    group_id = data.get('group_id')

    body = data.get('body')
    user = User.query.get(user_id)
    group = Group.query.get(group_id)

    group_message = GroupMessage(body=body, user=user, chat_group=group)
    db.session.add(group_message)
    db.session.commit()

    return {'message': 'Message persisted successfully'}

@bp.route('/api/saveUser', methods= ["POST"])
def save_user():
    user = request.json['user']
    isEdit = request.json['isEdit']
    returned_user = None

    if not isEdit :
        new_user = User(username = user['username'], password_hash = user['password'], mobile_number = user['mobile_number'], is_admin = user['is_admin'] )
        db.session.add(new_user)
        db.session.commit()

        returned_user = UserSchema().dump(new_user)
        returned_user.pop('password_hash')
    else:
        updated_user = User.query.get(int(user['id']))
        if updated_user is None:
            return jsonify({'message': 'user not found or user is not a member'}), 404
        updated_user.username = user['username']
        updated_user.mobile_number = user['mobile_number']
        updated_user.is_admin = user['is_admin']
        db.session.commit()

        returned_user = UserSchema().dump(updated_user)
        returned_user.pop('password_hash')

    return jsonify(returned_user)


@bp.route('/api/deleteUser', methods=["POST"])
def delete_user():
    user = request.json['user']
    deleted_user = User.query.get(int(user['id']))

    if deleted_user is not None:
        db.session.delete(deleted_user)
        db.session.commit()
        return jsonify({ 'message' : 'User deleted successfully'})

    return jsonify({ 'message' : 'User does not exist'})
