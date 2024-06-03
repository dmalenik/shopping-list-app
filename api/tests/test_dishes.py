import sys
import os

sys.path.append(os.path.abspath("/shopping-list-app/api/"))
from handle_dishes import add_dish

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


    # Define test cases
    def test_add_dish(self):
        assert add_dish(self.dish) == self.dish


