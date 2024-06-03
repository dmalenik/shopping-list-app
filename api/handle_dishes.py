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
            curs.execute(f"INSERT INTO {db_table}(name, components, userid) VALUES (%s, %s, %s);", (dish["name"], list_to_json_components, dish["userid"]))

            # For tests
            curs.execute(f"SELECT name, components, userid FROM {db_table};")
            res = dict(curs.fetchone())
            # Decode JSON
            res["components"] = [json.loads(component) for component in res["components"]]
    
    return res

