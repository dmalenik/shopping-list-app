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
