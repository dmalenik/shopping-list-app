import os
import sys

from flask import Flask, request, redirect, url_for, session, jsonify, Request, send_from_directory
from flask_session import Session

from werkzeug.datastructures import ImmutableOrderedMultiDict

sys.path.append(os.path.abspath("./db"))

from users import register_user, update_user, delete_user, get_user, get_user_session_data
from helpers import login_credentials_valid, register_credentials_valid, dish_name_available, dish_id_available, item_exists, update_credentials_valid
from dishes import get_dishes_list, get_dish, add_dish, update_dish, delete_dish
from items import get_shopping_list, add_item, update_item, delete_item
from routes import api, client


app = Flask(__name__, static_folder="build", static_url_path="/")
app.config.from_pyfile("config.py")

Session(app)

# Change the order of request data
class OrderedParamsContainer(Request):
    parameter_storage_class = ImmutableOrderedMultiDict

app.request_class = OrderedParamsContainer


# Modify requests
@app.before_request
def func():
    session.modified = True


# Handle unspecified routes
# Handle client-side requests to the server for pages

# TODO: generate each single file for each route
@app.route(client["main"])
def main_page():
    return app.send_static_file("index.html")

@app.route(client["register"])
def register_page():
    return app.send_static_file("index.html")


@app.route(client["login"])
def login_page():
    return app.send_static_file("index.html")


@app.route(client["home"])
def home_page():
    return send_from_directory(app.static_folder, "index.html")


@app.route(client["add_dish"])
def dish_add_page():
    return send_from_directory(app.static_folder, "index.html")


@app.route(client["dish"])
def dish_id(id):
    return app.send_static_file("index.html")


@app.route(client["shopping_list"])
def list_page():
    return app.send_static_file("index.html")


@app.route(client["logout"])
def logout_page():
    return app.send_static_file("index.html")


# Implement routes related to user authentication
# Register
@app.route(api["register"], methods=["GET", "POST"])
def register():
    if request.method == "POST":
        credentials = dict(request.form)

        if register_credentials_valid(credentials):
            register_user(credentials)
            return jsonify(success=True)

    return jsonify(success=False)


# Login
@app.route(api["login"], methods=["GET", "POST"])
def login():
    # Restart session every time a user logs in
    session.clear()

    if request.method == "POST":
        credentials = dict(request.form)

        if login_credentials_valid(credentials):
            # Set session for available user
            user = get_user_session_data(credentials)
            session["id"] = user["id"]
            return jsonify(login=True)
        
    return jsonify(login=False)


# Logout user
@app.route(api["logout"])
def logout():
    session.clear()
    
    return jsonify(logout=True)


# Display home page 
@app.route(api["home"])
def home():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    # Session name cannot be found because username was changed
    credentials = dict(id=session["id"])
    user = get_user(credentials)
    dishes = get_dishes_list(credentials)
    items = get_shopping_list(credentials)
    return jsonify(user=user, dishes=dishes, items=items)


# Implement routes related to user
# Update user data
# Delete user data
@app.route(api["user_update"], methods=["GET", "POST"])
def user_update():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))

    if request.method == "POST":
        query = dict(id=session["id"], action=request.form["action"])

        # # Update user data
        if query["action"] == "edit":
            user = dict(request.form)

            if update_credentials_valid(user):
                update_user(query, user)
                return jsonify(success=True)
        
        # # Delete user data
        if query["action"] == "delete":
            delete_user(query)
            return redirect(url_for("logout"))


# Implement routes related to dishes
# Create a route to add new dish
@app.route(api["add_dish"], methods=["GET", "POST"])
def dish_add():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    if request.method == "POST":
        # Create dish object to add
        dishname, *ingridients = request.form.items(multi=True)
        dish = dict(name=dishname[1], ingridients=list(), logo=None, userid=session["id"])

        for i in range(0, len(ingridients), 4):
            ingridient = dict()

            for k in range(i, i+4):
                ingridient[ingridients[k][0]] = ingridients[k][1]
            
            dish["ingridients"].append(ingridient)

        # Handle image file
        if "logo" in request.files:
            logo = request.files["logo"]
            path = os.path.join(app.config["UPLOAD_FOLDER"], logo.filename)
            logo.save(path)
            # images are searched starting from index.html location not from build folder location  
            dish["logo"] = path.replace("build", "")

        # Check if dish with the same name exists
        if dish_name_available(dish):
            return jsonify(success=False)

        add_dish(dish)
        
    return jsonify(success=True)


@app.route(api["dish"])
def dish(id):
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    query = dict(userid=session["id"], dishid=id)
    dish_data = get_dish(query)
    return jsonify(dish_data)


# Create a route to edit dishes
@app.route(api["update_dish"], methods=["GET", "POST"])
def dish_update():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    if request.method == "POST":
        if request.form["action"] == "edit":
            dishname, *ingridients, dishid, action = request.form.items(multi=True)
            # Create dish object to change
            dish = dict(id=dishid[1], userid=session["id"], name=dishname[1])

            # Create object with dish updates
            updates = dict(name=dishname[1], ingridients=list())

            for i in range(0, len(ingridients), 4):
                ingridient = dict()

                for k in range(i, i+4):
                    ingridient[ingridients[k][0]] = ingridients[k][1]
                
                updates["ingridients"].append(ingridient)
            
            # Add dish updates to db    
            if dish_id_available(dish):
                update_dish(dish, updates)
                return jsonify(success=True)

        if request.form["action"] == "delete":
            id, dishname, action = request.form.items(multi=True)
            # Create dish object to change
            dish = dict(id=id[1], userid=session["id"], name=dishname[1])

            # Delete dish data
            if dish_id_available(dish):
                delete_dish(dish)
                return jsonify(delete=True)
            
    return jsonify(success=False)


# Implement routes related to shopping lists
# Get current shopping lists related to a user
@app.route(api["shopping_list"])
def shopping_list():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))

    user = dict(id=session["id"])
    # Get shopping lists for current user
    sh_list = get_shopping_list(user)
    return jsonify(sh_list)


# Add new item to shopping list
@app.route(api["add_item"], methods=["GET", "POST"])
def item_add():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    if request.method == "POST":
        name, quantity, unit = request.form.items(multi=True)
        # Create item object
        item = dict(name=name[1], quantity=quantity[1], unit=unit[1], userid=session["id"])
        
        add_item(item)
        return jsonify(success=True)


@app.route(api["update_item"], methods=["GET", "POST"])
def item_update():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    if request.method == "POST":

        # Update existing shopping list
        if request.form["action"] == "update":
            name, quantity, unit, id, action = request.form.items(multi=True)
            # Create list object to change
            query = dict(id=id[1], userid=session["id"])
            # Create object with list updates
            updates = dict(name=name[1], quantity=quantity[1], unit=unit[1])
            
            if item_exists(query):
                # Add list updates to db
                # Fix - update only certain columns in db
                update_item(query, updates)
                return jsonify(success=True)

        # Delete existing shopping list 
        if request.form["action"] == "delete":
            id, action = request.form.items(multi=True)
            # Create list object to change
            query = dict(id=id[1], userid=session["id"])

            if item_exists(query):
                # Delete list data
                delete_item(query)
                return jsonify(success=True)
            
        return jsonify(success=False)


