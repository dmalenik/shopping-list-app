from os import environ

from dotenv import load_dotenv

import psycopg2 
from psycopg2 import extras

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"


def register(user):
    with psycopg2.connect(db, cursor_factory=extras.DictCursor) as conn:
        with conn.cursor() as curs:
            db_table = "testing_users"

            # Check if user is already registered
            curs.execute(f"SELECT * FROM {db_table} WHERE username = %s AND email = %s;", (user["username"], user["email"]))
            
            if not curs.fetchone():
                curs.execute(f"INSERT INTO {db_table} (username, email, hash) VALUES (%s, %s, %s);", (user['username'], user['email'], user['hash']))
            
            # For tests
            curs.execute(f"SELECT * FROM {db_table} WHERE username = %s AND email = %s;", (user["username"], user["email"]))
            return dict(curs.fetchone())
# Edit user credentials
def edit_user_data(user, edit_user):
    with psycopg2.connect(db) as conn:
        with conn.cursor() as curs:
            # Get current data of a user
            # Replace some user data with a given one
            # User may update either his username, email, or hash
            if edit_user["username"]:
                curs.execute(f"UPDATE {db_table} SET username = %s WHERE username = %s AND email = %s;", (edit_user["username"], user["username"], user["email"]))

            if edit_user["email"]:
                curs.execute(f"UPDATE {db_table} SET email = %s WHERE username = %s AND email = %s;", (edit_user["email"], user["username"], user["email"]))
            
            if edit_user["hash"]:
                curs.execute(f"UPDATE {db_table} SET hash = %s WHERE username = %s AND email = %s;", (edit_user["username"], user["username"], user["email"]))


            # For tests
            curs.execute(f"SELECT * FROM {db_table} WHERE username = %s AND email = %s;", (edit_user["username"], edit_user["email"]))
            return curs.fetchone()
        

