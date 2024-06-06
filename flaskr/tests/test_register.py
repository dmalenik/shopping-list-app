import os
import sys

sys.path.append(os.path.abspath("../flaskr/"))
from db.users import register, edit_user_data, delete_user_data


class TestRegister:
    # Data for testing
    user = {
        "username": "testing_surname",
        "email": "testing_email",
        "hash": "testing_hash"
    }

    edit_user = {
        "username": "edit_username",
        "email": "edit@email.com",
        "hash": "edit_hash"
    }


    # Test cases
    def test_register(self):
        assert register(self.user) == self.user

    def test_edit_user_data(self):
        assert edit_user_data(self.user, self.edit_user) == self.edit_user

    def test_delete_user_data(self):
        assert delete_user_data(self.edit_user) == self.edit_user


