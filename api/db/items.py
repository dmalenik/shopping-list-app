from os import environ

from psycopg2 import connect
from psycopg2.extras import DictCursor

from dotenv import load_dotenv

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "items"


# Get shopping list
def get_shopping_list(user):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"SELECT * FROM {db_table} WHERE userid = %s;", (user["id"],))
            res = curs.fetchall()

    return [dict(res[i]) for i in range(len(res))] if res else None


def add_item(item):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            print("query", item)
            curs.execute(f"INSERT INTO {db_table}(name, quantity, unit, userid) VALUES(%s, %s, %s, %s);", (item["name"], item["quantity"], item["unit"], item["userid"]))
    
    return


def update_item(query, updates):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"UPDATE {db_table} SET name = %s, quantity = %s, unit = %s WHERE id = %s AND userid = %s;", (updates["name"], updates["quantity"], updates["unit"], query["id"], query["userid"]))
    
    return


def delete_item(item):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"DELETE FROM {db_table} WHERE id = %s AND userid = %s;", (item["id"], item["userid"]))
    
    return            

