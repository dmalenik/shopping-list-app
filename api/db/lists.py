def create_list(list):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            # Prepare dictionaries to be placed in db
            list_to_string_elements = [json.dumps(element) for element in list["elements"]]
            curs.execute(f"INSERT INTO {db_table}(name, elements, userid) VALUES(%s, %s, %s);", (list["name"], list_to_string_elements, list["userid"]))


def edit_list(list, list_edit):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            name_update = False
            if list_edit["name"]:
                curs.execute(f"UPDATE {db_table} SET name = %s WHERE name = %s AND id = %s;", (list_edit["name"], list["name"], list["id"]))
                name_update = True
            
            if list_edit["elements"]:
                list_to_string_elements = [json.dumps(element) for element in list_edit["elements"]]
                
                if name_update:
                    curs.execute(f"UPDATE {db_table} SET elements = %s WHERE name = %s AND id = %s;", (list_to_string_elements, list_edit["name"], list["id"]))
                
                curs.execute(f"UPDATE {db_table} SET elements = %s WHERE name = %s AND id = %s;", (list_to_string_elements, list["name"], list["id"]))


def delete_list(list):
    with psycopg2.connect(db) as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as curs:
            curs.execute(f"DELETE FROM {db_table} WHERE name = %s AND id = %s;", (list["name"], list["id"]))
            

