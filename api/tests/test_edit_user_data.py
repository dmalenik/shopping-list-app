import os
import sys

# Get data to be placed in the database
from user import user, edit_user

sys.path.append(os.path.abspath("/shopping-list-app/api/"))
from register import edit_user_data


def test_edit_user_data():
    assert edit_user_data(user, edit_user) == edit_user


