from os import environ

import psycopg2
import psycopg2.extras
from werkzeug.security import check_password_hash

from dotenv import load_dotenv

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "testing_users"


def login_credentials_valid(credentials):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            # Get name and password from db of specific user
            curs.execute(f"SELECT username, hash FROM {db_table} WHERE username = %s;", (credentials["username"],))
            res = dict(curs.fetchone())
            # Compare data to credentials provided in the input
            # Check if name matches the name from db
            # Check if password matches the password from db
            if res and res["username"] == credentials["username"] and check_password_hash(res["hash"], credentials["password"]):
                return True
    
    return False


