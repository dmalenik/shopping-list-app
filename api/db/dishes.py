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
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"SELECT id, name, logo FROM {db_table} WHERE userid = %s;", (user["id"],))
            res = curs.fetchall()

    return [dict(res[i]) for i in range(len(res))] if res else None

# Get dish data
def get_dish_data(query_data):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"SELECT * FROM {db_table} WHERE userid = %s AND id = %s;", (query_data["userid"], query_data["dishid"]))
            res = curs.fetchone()

            res = dict(res)
            for i in range(len(res["components"])):
                res["components"][i] = json.loads(res["components"][i])
    
    return res if res else None


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


