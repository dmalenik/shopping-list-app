from os import environ

import psycopg2
import psycopg2.extras
from werkzeug.security import generate_password_hash

from dotenv import load_dotenv

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "testing_users"


# Register a new user
def register(user):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            # Check if user is already registered
            curs.execute(f"SELECT * FROM {db_table} WHERE username = %s AND email = %s;", (user["username"], user["email"]))
            if not curs.fetchone():
                hash = generate_password_hash(user["hash"])
                curs.execute(f"INSERT INTO {db_table} (username, email, hash) VALUES (%s, %s, %s);", (user["username"], user["email"], hash))


# Edit user credentials
# Get current user data
def edit_user_data(user, edit_user):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            if edit_user["username"]:
                curs.execute(f"UPDATE {db_table} SET username = %s WHERE username = %s AND email = %s;", (edit_user["username"], user["username"], user["email"]))

            if edit_user["email"]:
                curs.execute(f"UPDATE {db_table} SET email = %s WHERE username = %s AND email = %s;", (edit_user["email"], edit_user["username"], user["email"]))
            
            if edit_user["hash"]:
                curs.execute(f"UPDATE {db_table} SET hash = %s WHERE username = %s AND email = %s;", (edit_user["hash"], edit_user["username"], edit_user["email"]))
            
            # For tests
            curs.execute(f"SELECT username, email, hash FROM {db_table} WHERE username = %s AND email = %s;", (edit_user["username"], edit_user["email"]))
            res = dict(curs.fetchone())

    return res


# Delete user credentials
def delete_user_data(user):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"DELETE FROM {db_table} WHERE username = %s AND email = %s RETURNING username, email, hash", (user["username"], user["email"]))
            # For tests
            res = dict(curs.fetchone())

    return res
        

