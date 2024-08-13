import os
import sys

sys.path.append(os.path.abspath("/shopping-list-app/flaskr/db"))
from items import create_list

# Testing data
list = {
    "name": "title",
    "elements": [
        {"name": "component1", "unit": "kg", "size": 21},
        {"name": "component2", "unit": "gr", "size": 32},
        {"name": "component3", "unit": "cm", "size": 43},
    ],
    "userid": 59
}


# Returb from db the same dictionary
def test_create_list():
    assert create_list(list) == list

