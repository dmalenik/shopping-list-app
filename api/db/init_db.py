from os import environ

import psycopg2
import psycopg2.extras

from dotenv import load_dotenv

load_dotenv()

db = f"dbname={environ["DATABASE"]} host={environ["DATABASE_HOST"]} user={environ["DATABASE_USER"]} password={environ["DATABASE_PASSWORD"]} port={environ["DATABASE_PORT"]}"

with psycopg2.connect(db) as conn:
    with conn.cursor() as curs:
        # Create user data table
        curs.execute("DROP TABLE IF EXISTS users")
        curs.execute("CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(20) NOT NULL, email VARCHAR(100) NOT NULL, hash VARCHAR(254) NOT NULL, photo bytea)")
        # Create dishes table
        curs.execute("DROP TABLE IF EXISTS dishes")
        curs.execute("CREATE TABLE dishes (id SERIAL, name VARCHAR(254) NOT NULL, ingridients hstore[], logo_path bytea, userid INT NOT NULL, PRIMARY KEY(id), CONSTRAINT userid FOREIGN KEY(userid) REFERENCES users(id))")
        # Create items table
        curs.execute("DROP TABLE IF EXISTS items")
        curs.execute("CREATE TABLE items (id SERIAL, name VARCHAR(254) NOT NULL, quantity VARCHAR(254) NOT NULL, unit VARCHAR(254) NOT NULL, userid INT NOT NULL, PRIMARY KEY(id), CONSTRAINT userid FOREIGN KEY(userid) REFERENCES users(id))")

