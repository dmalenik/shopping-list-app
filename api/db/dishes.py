from os import environ

import psycopg2
import psycopg2.extras
import json

from dotenv import load_dotenv

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "dishes"

# Get dishes list
def get_dishes_list(user):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"SELECT id, name, logo FROM {db_table} WHERE userid = %s;", (user["id"],))
            res = curs.fetchall()

    return [dict(res[i]) for i in range(len(res))] if res else None

# Get dish data
def get_dish(query):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"SELECT * FROM {db_table} WHERE userid = %s AND id = %s;", (query["userid"], query["dishid"]))
            res = curs.fetchone()

    return dict(res) if res else None


# Add dish data to DB
def add_dish(dish):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"INSERT INTO {db_table}(name, ingridients, logo, userid) VALUES (%s, %s, %s, %s);", (dish["name"], dumps(dish["ingridients"]), dish["logo"], dish["userid"]))

    return


# Update dish data
def update_dish(dish, updates):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"UPDATE {db_table} SET name = %s, ingridients = %s WHERE id = %s;", (updates["name"], dumps(updates["ingridients"]), dish["id"]))

    return


def delete_dish(dish):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"DELETE FROM {db_table} WHERE id = %s AND userid = %s;", (dish["id"], dish["userid"]))

    return

