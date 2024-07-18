from os import environ

import psycopg2
import psycopg2.extras
import json

from dotenv import load_dotenv

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "testing_dishes"

# Get dishes list
def get_dishes_list(user):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"SELECT * FROM {db_table} WHERE userid = %s;", (user["userid"],))
            res = curs.fetchall()
    
    # convert dishes list into dishes dict
    dishes = list()

    for dish in res:
        dishes.append(dict(dish))
    
    return dishes if res else None


# Add dish data to DB
def add_dish(dish):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            # Adapt objects
            list_to_json_components = [json.dumps(component) for component in dish["components"]]
            curs.execute(f"INSERT INTO {db_table}(dish, components, userid) VALUES (%s, %s, %s);", (dish["dish"], list_to_json_components, dish["user"]))


# Update dish data
def edit_dish(dish, dish_edit):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            dish_update = False
            if dish_edit["dish"]:
                curs.execute(f"UPDATE {db_table} SET dish = %s WHERE dish = %s AND userid = %s;", (dish_edit["dish"], dish["dish"], dish["userid"]))
                dish_update = True

            # Update components
            # New component can be added
            # Current component can be updated
            # Current component can be deleted 
            if dish_edit["list"]:
                # Convert components key to JSON
                list_to_json_components = [json.dumps(component) for component in dish_edit["list"]]

                if dish_update:
                    curs.execute(f"UPDATE {db_table} SET components = %s WHERE dish = %s AND userid = %s;", (list_to_json_components, dish_edit["dish"], dish["userid"]))
                
                else:
                    curs.execute(f"UPDATE {db_table} SET components = %s WHERE dish = %s AND userid = %s;", (list_to_json_components, dish["dish"], dish["userid"]))


def delete_dish(dish):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"DELETE FROM {db_table} WHERE dish = %s AND userid = %s;", (dish["dish"], dish["userid"]))


