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
        
        components = list()
        for component in dish["components"]:
            components.append(json.loads(component))
        
        dish["components"] = components

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
def edit_dish(dish, dish_update):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:

            if dish_update["name"]:
                # Convert components key to JSON
                list_to_json_components = [json.dumps(component) for component in dish_update["list"]]
                curs.execute(f"UPDATE {db_table} SET dish = %s, components = %s WHERE id = %s;", (dish_update["name"], list_to_json_components, dish["id"]))


def delete_dish(dish):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"DELETE FROM {db_table} WHERE id = %s AND userid = %s;", (dish["id"], dish["user"]))


