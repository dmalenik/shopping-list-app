from os import environ

import psycopg2
import psycopg2.extras
from werkzeug.security import check_password_hash

from dotenv import load_dotenv

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"
db_table = "testing_users"
