from os import environ

import psycopg2
import psycopg2.extras
import json

from dotenv import load_dotenv
from dishes import add_dish

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "testing_lists"


def create_list(list):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            # Prepare dictionaries to be placed in db
            list_to_string_elements = [json.dumps(element) for element in list["elements"]]
            curs.execute(f"INSERT INTO {db_table}(list, elements, userid) VALUES(%s, %s, %s);", (list["list"], list_to_string_elements, list["userid"]))

            # For tests
            curs.execute(f"SELECT list, elements, userid FROM {db_table} WHERE userid = %s AND list = %s;", (list["userid"], list["list"]))
            res = dict(curs.fetchone())
            # Decode JSON
            res["elements"] = [json.loads(element) for element in res["elements"]]

    return res


def edit_list(list, edit_list):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            # Edit list name
            if edit_list["list"]:
                curs.execute(f"UPDATE {db_table} SET list = %s WHERE list = %s AND userid = %s;", (edit_list["list"], list["list"], list["userid"]))
            
            # Edit list elements
            if edit_list["elements"]:
                list_to_string_elements = [json.dumps(element) for element in edit_list["elements"]]
                curs.execute(f"UPDATE {db_table} SET elements = %s WHERE list = %s AND userid = %s;", (list_to_string_elements, edit_list["list"], edit_list["userid"]))
            

            # For tests
            curs.execute(f"SELECT list, elements, userid FROM {db_table} WHERE list = %s AND userid = %s;", (edit_list["list"], edit_list["userid"]))
            res = dict(curs.fetchone())
            res["elements"] = [json.loads(element) for element in res["elements"]]

    return res


def delete_list(list):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"DELETE FROM {db_table} WHERE list = %s AND userid = %s RETURNING list, elements, userid;", (list["list"], list["userid"]))

            # For tests
            res = dict(curs.fetchone())
            # Decode string to dict
            res["elements"] = [json.loads(element) for element in res["elements"]]

    return res

def add_dish_to_list(dish, list):
    # For tests
    # Insert some data into dishes table
    add_dish(dish)
    # Insert some data into lists table
    create_list(list)
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:    
            # Update shopping list with dish elements
            # Get shopping list of some user
            curs.execute(f"SELECT elements FROM {db_table} WHERE name = %s AND userid = %s;", (list["name"], list["userid"]))
            res = dict(curs.fetchone())
            res["elements"] = [json.loads(element) for element in res["elements"]]
            print(res)

            # Append elements from dish to shopping list
            for component in dish["components"]:
                for element in res["elements"]:
                    # If some of dish elements are already present
                    if component["name"] == element["name"]:
                        # Then update only their size
                        element["size"] += component["size"]
                    else:
                        res["elements"].append(component)
                    
                    break
            
            # Convert elements list to json again
            res["elements"] = [json.dumps(element) for element in res["elements"]]
            # Insert updated elements list back to db
            curs.execute(f"UPDATE {db_table} SET elements = %s WHERE name = %s AND userid = %s;", (res["elements"], list["name"], list["userid"]))

            # For tests
            curs.execute(f"SELECT * FROM {db_table} WHERE name = %s AND userid = %s;", (list["name"], list["userid"]))
            res = dict(curs.fetchone())
            res["elements"] = [json.loads(element) for element in res["elements"]]

    return res["elements"]

