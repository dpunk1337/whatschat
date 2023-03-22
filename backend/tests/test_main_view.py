from flask_testing import TestCase
from backend import create_test_app
from backend.schemas import *
from backend.models import *

class TestMainView(TestCase):
    def create_app(self):
        app = create_test_app()
        with app.app_context():
            db.create_all()
        return app

    def setUp(self):
        db.session.remove()
        db.drop_all()
        db.create_all()

        self.admin = User(username='test_admin', mobile_number=9000000000, password_hash='test_admin', is_admin=1)
        db.session.add(self.admin)

        self.user1 = User(username='test_user1', mobile_number=9000000001, password_hash='test_password_1', is_admin=0)
        db.session.add(self.user1)

        self.user2 = User(username='test_user2', mobile_number=9000000002, password_hash='test_password_2', is_admin=0)
        db.session.add(self.user2)

        self.user3 = User(username='test_user3', mobile_number=9000000003, password_hash='test_password_3', is_admin=0)
        db.session.add(self.user3)

        self.group1 = Group(name='test_group1')
        self.group1.members.append(self.user1)
        self.group1.members.append(self.user2)
        db.session.add(self.group1)

        self.group2 = Group(name='test_group2')
        self.group2.members.append(self.user3)
        db.session.add(self.group2)

        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()


    def test_create_group(self):
        # login as user1
        data = {'username': self.user1.username, 'password': self.user1.password_hash}
        response = self.client.post('/api/login', data=data)
        self.assertEqual(response.status_code, 200)

        data = {
            'name': 'test_create_group',
            'ids': [self.user2.id, self.user3.id]
        }

        response = self.client.post('/api/create_group', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['name'], 'test_create_group')
        self.assertEqual(len(response.json['members']), 3)

    def test_get_group(self):
        # Login as user1
        data = {'username': self.user1.username, 'password': self.user1.password_hash}
        response = self.client.post('/api/login', data=data)
        self.assertEqual(response.status_code, 200)

        group = self.group1

        # Fetch the group
        data = {'id': group.id}
        response = self.client.post('/api/group', data=data)
        self.assertEqual(response.status_code, 200)

        # Check that the correct group data was returned
        expected = GroupSchema().dump(group)
        self.assertEqual(response.json, expected)

    def test_get_group_members(self):
        # Login as user1
        data = {'username': self.user1.username, 'password': self.user1.password_hash}
        response = self.client.post('/api/login', data=data)
        self.assertEqual(response.status_code, 200)

        group = self.group1

        # Fetch the members of the group
        data = {'id': group.id}
        response = self.client.post('/api/getGroupMembers', data=data)
        self.assertEqual(response.status_code, 200)

        # Check that the correct group members were returned
        expected = UserSchema(many=True).dump(group.members)
        self.assertEqual(response.json, expected)

    def test_add_group_member(self):
        # login as user1
        data = {'username': self.user1.username, 'password': self.user1.password_hash}
        response = self.client.post('/api/login', data=data)
        self.assertEqual(response.status_code, 200)

        # add user3 to group1
        data = {'user_id': self.user3.id, 'group_id': self.group1.id}
        response = self.client.post('/api/addGroupMember', data=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['message'], 'Member added successfully')

        # get the group from the database and assert that user3 is in the members list
        group = Group.query.get(self.group1.id)
        self.assertIn(self.user3, group.members)

    def test_save_user(self):
        # login as admin
        data = {'username': self.admin.username, 'password': self.admin.password_hash}
        response = self.client.post('/api/login', data=data)
        self.assertEqual(response.status_code, 200)

        # create a new user
        data = {
            'username': 'new_user',
            'password': 'new_password',
            'mobile_number': 9000000004,
            'is_admin': False
        }
        response = self.client.post('/api/saveUser', json={'user': data, 'isEdit': False})
        self.assertEqual(response.status_code, 200)

        # check if user was added
        new_user = User.query.filter_by(username='new_user').first()
        self.assertIsNotNone(new_user)
        self.assertEqual(new_user.mobile_number, 9000000004)

        # update the user
        data = {
            'id': new_user.id,
            'username': 'updated_user',
            'mobile_number': 9000000005,
            'is_admin': True
        }
        response = self.client.post('/api/saveUser', json={'user': data, 'isEdit': True})
        self.assertEqual(response.status_code, 200)

        # check if user was updated
        updated_user = User.query.filter_by(id=new_user.id).first()
        self.assertIsNotNone(updated_user)
        self.assertEqual(updated_user.username, 'updated_user')
        self.assertEqual(updated_user.mobile_number, 9000000005)
        self.assertEqual(updated_user.is_admin, True)
