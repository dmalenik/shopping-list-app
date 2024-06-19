# Implement helper functions for shopping lists data handling

def list_exists(list):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:    
            curs.execute(f"SELECT name FROM testing_lists WHERE name = %s AND id = %s;", (list["name"], list["id"]))

            if curs.fetchone():
                return True
    
    return False
