import os
import sys

# Get data to be placed in the database
from user import user

sys.path.append(os.path.abspath("/shopping-list-app/api/"))
from register import delete_user_data


def test_delete_user_data():
    assert delete_user_data(user) == user


