import os
import sys

sys.path.append(os.path.abspath("/shopping-list-app/flaskr/db"))
from lists import edit_list

list = {
    "name": "title",
    "elements": [
        {"name": "component1", "unit": "kg", "size": 21},
        {"name": "component2", "unit": "gr", "size": 32},
        {"name": "component3", "unit": "cm", "size": 43},
    ],
    "userid": 59
}

list_edit = {
    "name": "edit",
    "elements": [
        {"name": "component111", "unit": "kg", "size": 211},
        {"name": "component222", "unit": "gr", "size": 322},
        {"name": "component333", "unit": "cm", "size": 433},
    ],
    "userid": 59
}


def test_edit_list():
    assert edit_list(list, list_edit) == list_edit


