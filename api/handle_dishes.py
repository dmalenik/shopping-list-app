from os import environ

import psycopg2
import psycopg2.extras
import json

from dotenv import load_dotenv

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "testing_dishes"


# Add dish data to DB
def add_dish(dish):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            # Adapt objects
            list_to_json_components = [json.dumps(component) for component in dish["components"]]
            curs.execute(f"INSERT INTO {db_table}(dish, components, userid) VALUES (%s, %s, %s);", (dish["dish"], list_to_json_components, dish["userid"]))

            # For tests
            curs.execute(f"SELECT dish, components, userid FROM {db_table};")
            res = dict(curs.fetchone())
            # Decode JSON
            res["components"] = [json.loads(component) for component in res["components"]]
    
    return res


# Update dish data
def edit_dish(dish, edit_dish):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            # Put edit_dish data into the DB
            if edit_dish["dish"]:
                curs.execute(f"UPDATE {db_table} SET dish = %s WHERE dish = %s AND userid = %s", (edit_dish["dish"], dish["dish"], dish["userid"]))

            if edit_dish["components"]:
                # Convert components key to JSON
                list_to_json_components = [json.dumps(component) for component in edit_dish["components"]]
                curs.execute(f"UPDATE {db_table} SET components = %s WHERE dish = %s AND userid = %s", (list_to_json_components, edit_dish["dish"], dish["userid"]))

            # For tests
            curs.execute(f"SELECT dish, components, userid FROM {db_table}")
            res = dict(curs.fetchone())
            # Decode JSON data
            res["components"] = [json.loads(component) for component in res["components"]]

    return res


def delete_dish(dish):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"DELETE FROM {db_table} WHERE dish = %s AND userid = %s RETURNING dish", (dish["dish"], dish["userid"]))

            # Fore tests
            res = dict(curs.fetchone())

    return res["dish"]


