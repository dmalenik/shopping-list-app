from os import environ

from psycopg2 import connect
from psycopg2.extras import DictCursor
from werkzeug.security import check_password_hash

from dotenv import load_dotenv

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "users"


# Implement helper functions for user data handling
def register_credentials_valid(credentials):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"SELECT username FROM {db_table} WHERE username = %s;", (credentials["username"],))
            res = curs.fetchone()

    if not res:
        return True if credentials["username"] and credentials["email"] and credentials["password"] else False
    
    return False
            

def login_credentials_valid(credentials):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"SELECT username, hash FROM {db_table} WHERE username = %s;", (credentials["username"],))
            res = curs.fetchone()
            
    # Handle NoneType error
    if res:
        # Compare data to credentials provided in the input
        res = dict(res)
        if res["username"] == credentials["username"] and check_password_hash(res["hash"], credentials["password"]):
            return True
    
    return False


# Update function
def update_credentials_valid(credentials):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"SELECT username FROM {db_table} WHERE username = %s;", (credentials["current"],))
            res = curs.fetchone()

    return True if res else False


# Implement helper functions for dish data handling
# Checks if dish exists in db
def dish_available(dish):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"SELECT name FROM dishes WHERE userid = %s;", (dish["userid"],))
            res = curs.fetchone()

    return bool(res)


# Implement helper functions for shopping lists data handling
def item_exists(query):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:    
            curs.execute(f"SELECT id FROM items WHERE id = %s;", (query["id"],))
            res = curs.fetchone()
            
    return bool(res)

