from os import environ

import psycopg2
import psycopg2.extras
import json

from dotenv import load_dotenv

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "testing_lists"


# Get dishes list
def get_shopping_lists(user):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"SELECT id, name FROM {db_table} WHERE userid = %s;", (user["id"],))
            res = curs.fetchall()

    shopping_lists = list()

    for l in res:
        shopping_lists.append(dict(l))

    return shopping_lists if res else None
        

# Get dish data
def get_list_data(query_data):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"SELECT * FROM {db_table} WHERE id = %s;", (query_data["listid"],))
            res = curs.fetchone()

    res = dict(res)
    for i in range(len(res["elements"])):
        res["elements"][i] = json.loads(res["elements"][i])
    
    return res if res else None


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
                list_to_string_elements = [json.dumps(element) for element in list_edit["elements"]]
                curs.execute(f"UPDATE {db_table} SET name = %s, elements = %s WHERE id = %s;", (list_edit["name"], list_to_string_elements, query_list["id"]))


def delete_list(list):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"DELETE FROM {db_table} WHERE id = %s;", (list["id"],))
            

