import os
import sys

sys.path.append(os.path.abspath("../flaskr/"))
from db.lists import create_list, edit_list, delete_list


class TestLists:
    # Data for testing
    list = {
        "list": "title",
        "elements": [
            {"name": "component1", "unit": "kg", "size": 21},
            {"name": "component2", "unit": "gr", "size": 32},
            {"name": "component3", "unit": "cm", "size": 43},
        ],
        "userid": 59
    }

    edit_list = {
        "list": "edit",
        "elements": [
            {"name": "component111", "unit": "kg", "size": 211},
            {"name": "component222", "unit": "gr", "size": 322},
            {"name": "component333", "unit": "cm", "size": 433},
        ],
        "userid": 59
    }


    # Test cases
    def test_create_list(self):
        assert create_list(self.list) == self.list
    
    def test_edit_list(self):
        assert edit_list(self.list, self.edit_list) == self.edit_list

    def test_delete_list(self):
        assert delete_list(self.edit_list) == self.edit_list

