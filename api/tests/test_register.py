import os
import sys

from user import user

sys.path.append(os.path.abspath("/shopping-list-app/api/"))
from register import register


def test_register():
    assert register(user) == user


