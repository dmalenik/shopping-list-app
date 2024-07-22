from os import environ

import psycopg2
import psycopg2.extras
import json

from dotenv import load_dotenv

from dishes import add_dish

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "testing_lists"


# Get dishes list
def get_shopping_lists(user):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"SELECT * FROM {db_table} WHERE userid = %s;", (user["id"],))
            res = curs.fetchall()

            shopping_lists = list()

            for l in res:
                
                l_elems = list()
                for element in l["elements"]:
                    l_elems.append(json.loads(element))

                l["elements"] = l_elems

                shopping_lists.append(dict(l))

            return shopping_lists if res else None


def create_list(list):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            # Prepare dictionaries to be placed in db
            list_to_string_elements = [json.dumps(element) for element in list["elements"]]
            curs.execute(f"INSERT INTO {db_table}(name, elements, userid) VALUES(%s, %s, %s);", (list["name"], list_to_string_elements, list["userid"]))


def edit_list(query_list, list_edit):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            if list_edit["name"]:
                curs.execute(f"UPDATE {db_table} SET name = %s WHERE id = %s;", (list_edit["name"], query_list["id"]))
            
            # Add new element to list
            # Edit existing element
            # Delete existing element
            if list_edit["elements"]:
                list_to_string_elements = [json.dumps(element) for element in list_edit["elements"]]
                curs.execute(f"UPDATE {db_table} SET elements = %s WHERE id = %s;", (list_to_string_elements, query_list["id"]))


def delete_list(list):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"DELETE FROM {db_table} WHERE id = %s;", (list["id"],))
            

