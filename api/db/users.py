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
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            hash = generate_password_hash(user["password"])
            curs.execute(f"INSERT INTO {db_table} (username, email, hash) VALUES (%s, %s, %s);", (user["username"], user["email"], hash))


# Get logged in user's data
def get_user_data(credentials):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"SELECT id, username FROM {db_table} WHERE username = %s;", (credentials["username"],))

            res = curs.fetchone()
            if res:
                res = dict(res)
        
    return res


# Edit user credentials
def edit_user_data(user, edit_user):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            username_change = False
            if edit_user["username"]:
                curs.execute(f"UPDATE {db_table} SET username = %s WHERE username = %s;", (edit_user["username"], user["username"]))
                username_change = True

            if edit_user["email"]:

                if username_change:
                    curs.execute(f"UPDATE {db_table} SET email = %s WHERE username = %s;", (edit_user["email"], edit_user["username"]))

                else:
                    curs.execute(f"UPDATE {db_table} SET email = %s WHERE username = %s;", (edit_user["email"], user["username"]))
            
            if edit_user["password"]:
                hash = generate_password_hash(edit_user["password"])

                if username_change:
                    curs.execute(f"UPDATE {db_table} SET hash = %s WHERE username = %s;", (hash, edit_user["username"]))

                else:
                    curs.execute(f"UPDATE {db_table} SET hash = %s WHERE username = %s;", (hash, user["username"]))


# Delete user credentials
def delete_user_data(user):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"DELETE FROM {db_table} WHERE username = %s;", (user["username"],))
        

