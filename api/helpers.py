from os import environ

import psycopg2
import psycopg2.extras
from werkzeug.security import check_password_hash

from dotenv import load_dotenv

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "testing_users"


# Implement helper functions for user data handling


def login_credentials_valid(credentials):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"SELECT username, hash FROM {db_table} WHERE username = %s;", (credentials["username"],))
            res = curs.fetchone()
            
            # Handle NoneType error
            if res:
                res = dict(res)
                # Compare data to credentials provided in the input
                if res["username"] == credentials["username"] and check_password_hash(res["hash"], credentials["password"]):
                    return True
    
    return False


def register_credentials_valid(credentials):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"SELECT username FROM {db_table} WHERE username = %s;", (credentials["username"],))
            if not curs.fetchone():
                return True if credentials["username"] and credentials["email"] and credentials["password"] else False


# Update function
def update_credentials_valid(credentials):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"SELECT username FROM {db_table} WHERE username = %s;", (credentials["current"],))
            res = curs.fetchone()

    return True if res else False


# Implement helper functions for dish data handling

# Checks if dish exists in db
# User have to provide current dish name to be changed
def dish_exists(dish):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:  
            curs.execute(f"SELECT id FROM testing_dishes WHERE id = %s;", (dish["id"],))

            return True if curs.fetchone() else False


# Implement helper functions for shopping lists data handling


def list_exists(query_list):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:    
            curs.execute(f"SELECT id FROM testing_lists WHERE id = %s;", (query_list["id"],))
            
            return True if curs.fetchone() else False
