from os import environ

import psycopg2
import psycopg2.extras
import json

from dotenv import load_dotenv

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

