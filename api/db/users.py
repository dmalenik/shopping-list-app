from os import environ

import psycopg2
import psycopg2.extras
from werkzeug.security import generate_password_hash

from dotenv import load_dotenv

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "testing_users"


# Register a new user
def register_user(user):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            hash = generate_password_hash(user["password"])
            curs.execute(f"INSERT INTO {db_table} (username, email, hash) VALUES (%s, %s, %s);", (user["username"], user["email"], hash))
    
    return


# User is logged in
# Get user's data
def get_user(credentials):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"SELECT id, username, email FROM {db_table} WHERE id = %s;", (credentials["id"],))
            res = curs.fetchone()

    return dict(res) if res else None


def get_user_session_data(credentials):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"SELECT id, username, email FROM {db_table} WHERE username = %s;", (credentials["username"],))
            res = curs.fetchone()
        
    return dict(res) if res else None


# Edit user credentials
def update_user(query, updates):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            username_change = False
            if updates["username"]:
                curs.execute(f"UPDATE {db_table} SET username = %s WHERE id = %s;", (updates["username"], query["id"]))
                username_change = True

            if updates["email"]:

                if username_change:
                    curs.execute(f"UPDATE {db_table} SET email = %s WHERE username = %s;", (updates["email"], updates["username"]))

                else:
                    curs.execute(f"UPDATE {db_table} SET email = %s WHERE username = %s;", (updates["email"], query["username"]))
            
            if updates["password"]:
                hash = generate_password_hash(updates["password"])

                if username_change:
                    curs.execute(f"UPDATE {db_table} SET hash = %s WHERE username = %s;", (hash, updates["username"]))

                else:
                    curs.execute(f"UPDATE {db_table} SET hash = %s WHERE username = %s;", (hash, query["username"]))
    
    return


# Delete user credentials
def delete_user(user):
    with connect(db) as conn:
        with conn.cursor(cursor_factory=DictCursor) as curs:
            curs.execute(f"DELETE FROM {db_table} WHERE id = %s;", (user["id"],))
    
    return

