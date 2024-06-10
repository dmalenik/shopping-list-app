import os
import sys

sys.path.append(os.path.abspath("/shopping-list-app/flaskr/db"))
from lists import add_dish_to_list

# Data for testing
dish = {
    "dish": "dish123",
    "components": [
        {"name": "ingridient123", "unit": "kg", "size": 1005001}, 
        {"name": "ingridient456", "unit": "gr", "size": 1005002}, 
        {"name": "ingridient789", "unit": "pieces", "size": 1005003}
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

update_list = [
        {"name": "component111", "unit": "kg", "size": 211},
        {"name": "component222", "unit": "gr", "size": 322},
        {"name": "component333", "unit": "cm", "size": 433},
        {"name": "ingridient123", "unit": "kg", "size": 1005001}, 
        {"name": "ingridient456", "unit": "gr", "size": 1005002}, 
        {"name": "ingridient789", "unit": "pieces", "size": 1005003}
]


# Check if dish components were added to shopping list items
def test_add_dish_to_list():
    assert add_dish_to_list(dish, list_edit) == update_list

