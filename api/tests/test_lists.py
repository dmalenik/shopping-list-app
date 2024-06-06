import os
import sys

sys.path.append(os.path.abspath("/shopping-list-app/api/"))
from lists import create_list


class TestLists:
    # Data for testing
    list = {
        "list": "title",
        "date": "date",
        "elements": [
            {"name": "component1", "unit": "kg", "size": 21},
            {"name": "component2", "unit": "gr", "size": 32},
            {"name": "component3", "unit": "cm", "size": 43},
        ],
        "userid": 59
    }


    # Test cases
    def test_create_list(self):
        assert create_list(self.list) == self.list


