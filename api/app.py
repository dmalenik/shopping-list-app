from lists import get_shopping_lists, create_list, edit_list, delete_list
# Create new shopping list
@app.route("/profile/lists/create", methods=["GET", "POST"])
def list_create():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("login"))
    
    if request.method == "POST":
        # Create list object
        list = dict()

        list_name, *elements, userid = request.form.items(multi=True)

        list["name"] = list_name[1]

        list["elements"] = []
        for i in range(0, len(elements), 3):
            element = dict()

            for k in range(i, i+3):
                element[elements[k][0]] = elements[k][1]
            
            list["elements"].append(element)

        userid = int(userid[1].replace("/", ""))
        list["userid"] = userid
        
        create_list(list)

        return redirect(url_for("lists"))
    # Is a temporary solution for front-end
    return f'''
        <form action="/profile/lists/create" method="post">
            <input name="name" placeholder="List name"/>

            Elements:

            <fieldset id={os.urandom(2)}>
                <input name="name" placeholder="Name"/>
                <input name="unit" placeholder="Unit"/>
                <input name="size" placeholder="Size"/>
            </fieldset>
            <fieldset id={os.urandom(2)}>
                <input name="name" placeholder="Name"/>
                <input name="unit" placeholder="Unit"/>
                <input name="size" placeholder="Size"/>
            </fieldset>
            <fieldset id={os.urandom(2)}>
                <input name="name" placeholder="Name"/>
                <input name="unit" placeholder="Unit"/>
                <input name="size" placeholder="Size"/>
            </fieldset>

            <input type="hidden" name="userid" value={session["id"]}/>

            <button type="submit">Add list</button>
        </form>

        <a href={url_for("lists")}>Go back to shopping lists</a>
    '''


# Update existing shopping list
# Delete existing shopping list 
@app.route("/profile/lists/update", methods=["GET", "POST"])
def list_update():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("login"))
    
    if request.method == "POST":

        if request.form["action"] == "edit":
            querylist, queryid, newlistname, *elements, userid, action = request.form.items(multi=True)
            # Create list object to change
            list = dict()

            list["name"] = querylist[1]

            list["id"] = queryid[1]

            # Create object with list updates
            list_edit = dict()

            list_edit["name"] = newlistname[1]

            list_edit["elements"] = []
            for i in range(0, len(elements), 3):
                element = dict()

                for k in range(i, i+3):
                    element[elements[k][0]] = elements[k][1]
                
                list_edit["elements"].append(element)
            
            if list_exists(list):
                # Add list updates to db
                # Fix - update only certain columns in db
                edit_list(list, list_edit)

                return redirect(url_for("lists"))

        if request.form["action"] == "delete":
            querylist, queryid, userid, action = request.form.items(multi=True)
            # Create list object to change
            list = dict()

            list["name"] = querylist[1]

            list["id"] = queryid[1]

            if list_exists(list):
                # Delete list data
                delete_list(list)

                return redirect(url_for("lists"))
            
        return redirect(url_for("error", type="list_update"))

    # Implement a form to edit
    # Implement a button to delete a dish
    # Go back to dishes list
    # Is a temporary solution for front-end
    return f'''
        <form action="/profile/lists/update" method="post">
            <input name="querylist" placeholder="List to change"/>
            <input name="queryid" placeholder="List id to change"/>

            <input name="newlistname" placeholder="New name"/>

            Elements:

            <fieldset id={os.urandom(2)}>
                <input name="name" placeholder="Name"/>
                <input name="unit" placeholder="Unit"/>
                <input name="size" placeholder="Size"/>
            </fieldset>
            <fieldset id={os.urandom(2)}>
                <input name="name" placeholder="Name"/>
                <input name="unit" placeholder="Unit"/>
                <input name="size" placeholder="Size"/>
            </fieldset>
            <fieldset id={os.urandom(2)}>
                <input name="name" placeholder="Name"/>
                <input name="unit" placeholder="Unit"/>
                <input name="size" placeholder="Size"/>
            </fieldset>

            <input type="hidden" name="userid" value={session["id"]}/>
            <input type="hidden" name="action" value="edit"/>

            <button type="submit">Change list</button>
        </form>

        <form action="/profile/lists/update" method="post">
            <input name="querylist" placeholder="List to delete"/>
            <input name="queryid" placeholder="List id to delete"/>

            <input type="hidden" name="userid" value={session["id"]}/>
            <input type="hidden" name="action" value="delete"/>

            <button type="submit">Delete list</button>
        </form>

        <a href={url_for("lists")}>Go back to shopping lists</a>
    '''


