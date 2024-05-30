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


