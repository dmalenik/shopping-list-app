import sys
import os

sys.path.append(os.path.abspath("/shopping-list-app/api/"))
from handle_dishes import add_dish, edit_dish, delete_dish

# Create class with tests
class TestDishes:
    # Define dishes data for testing
    dish = {
        "name": "dish1",
        "components": [
            {"name": "component1", "unit": "kg", "size": 20}, 
            {"name": "component2", "unit": "gr", "size": 30}, 
            {"name": "component3", "unit": "pieces", "size": 29}
        ],
        "userid": 59
    }

    edit_dish = {
        "name": "dish2",
        "components": [
            {"name": "component11", "unit": "kg", "size": 100500}, 
            {"name": "component22", "unit": "gr", "size": 999}, 
            {"name": "component33", "unit": "pieces", "size": 777}
        ],
        "userid": 59
    }


    # Define test cases
    def test_add_dish(self):
        assert add_dish(self.dish) == self.dish

    def test_edit_dish(self):
        assert edit_dish(self.dish, self.edit_dish) == self.edit_dish

    def test_delete_dish(self):
        assert delete_dish(self.edit_dish) == self.edit_dish["dish"]

