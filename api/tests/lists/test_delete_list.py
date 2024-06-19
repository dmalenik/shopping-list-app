import os
import sys

sys.path.append(os.path.abspath("/shopping-list-app/flaskr/db"))
from lists import delete_list

list_edit = {
    "name": "edit",
    "elements": [
        {"name": "component111", "unit": "kg", "size": 211},
        {"name": "component222", "unit": "gr", "size": 322},
        {"name": "component333", "unit": "cm", "size": 433},
    ],
    "userid": 59
}


def test_delete_list():
    assert delete_list(list_edit) == list_edit

