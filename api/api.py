import os
import sys

from flask import Flask, request, redirect, url_for, session, jsonify, Request
from flask_session import Session

from werkzeug.datastructures import ImmutableOrderedMultiDict

sys.path.append(os.path.abspath("./db"))

from users import register_user, edit_user_data, delete_user_data, get_user_data, get_user_session_data
from helpers import login_credentials_valid, register_credentials_valid, dish_exists, list_exists, update_credentials_valid
from dishes import get_dishes_list, get_dish_data, add_dish, edit_dish, delete_dish
from lists import get_shopping_lists, create_list, edit_list, delete_list


app = Flask(__name__)
app.config.from_pyfile('config.py')

Session(app)

# Change the order of request data
class OrderedParamsContainer(Request):
    parameter_storage_class = ImmutableOrderedMultiDict

app.request_class = OrderedParamsContainer


# Modify requests
@app.before_request
def func():
    session.modified = True


@app.route("/")
def index():
    # render build frontend static files here
    return jsonify(success=True)


# Implement routes related to user authentication
# Register
@app.route("/api/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        credentials = dict(request.form)

        if register_credentials_valid(credentials):
            register_user(credentials)
            return jsonify(success=True)

    return jsonify(success=False)


# Login
@app.route("/api/login", methods=["GET", "POST"])
def login():
    # Restart session every time a user logs in
    session.clear()

    if request.method == "POST":
        credentials = dict(request.form)

        if login_credentials_valid(credentials):
            # Set session for available user
            user = get_user_session_data(credentials)

            session["id"] = user["id"]

            return jsonify(success=True)
        
    return jsonify(success=False)


# Logout user
@app.route("/api/logout")
def logout():
    session.clear()
    
    return jsonify(success=True)


# Implement routes related to user
# Display user profile
@app.route("/api/profile")
def profile():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    # Session name cannot be found because username was changed
    credentials = dict(id=session["id"])
    user = get_user_data(credentials)
    return jsonify(user)


# Update user data
@app.route("/api/profile/update", methods=["GET", "POST"])
def profile_update():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))

    if request.method == "POST":
        # Dmytro Malienik, not Dmytro
        query = dict(id=session["id"], action=request.form["action"])

        # # Update user data
        if query["action"] == "edit":
            edit_user = dict(request.form)

            if update_credentials_valid(edit_user):
                edit_user_data(query, edit_user)
                return jsonify(success=True)
        
        # # Delete user data
        if query["action"] == "delete":
            delete_user_data(query)
            return redirect(url_for("logout"))


# Implement routes related to dishes
# Create a route to see dishes
@app.route("/api/profile/dishes")
def dishes():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))

    # Get dishes list for current user
    user = dict(userid=session["id"])
    dishes_list = get_dishes_list(user)
    return jsonify(dishes_list)


@app.route("/api/profile/dishes/<string:id>")
def dish(id):
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    query_data = dict(userid=session["id"], dishid=id)
    dish_data = get_dish_data(query_data)
    return jsonify(dish_data)


# Create a route to add new dish
@app.route("/api/profile/dishes/add", methods=["GET", "POST"])
def dish_add():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    if request.method == "POST":
        # Create dish object to add
        name, *components = request.form.items(multi=True)

        dish = dict(dish=name[1], components=list(), id=None, user=session["id"])

        for i in range(0, len(components), 4):
            component = dict()

            for k in range(i, i+4):
                component[components[k][0]] = components[k][1]
            
            dish["components"].append(component)

        # Check if dish with the same name exists
        if dish_exists(dish):
            return jsonify(success=False)
        
        # Was error due to similar with dish_add function names
        add_dish(dish)
        return jsonify(success=True)


# Create a route to edit dishes
@app.route("/api/profile/dishes/update", methods=["GET", "POST"])
def dish_update():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    if request.method == "POST":
        if request.form["action"] == "edit":
            dishname, *components, dishid, action = request.form.items(multi=True)
            # Create dish object to change
            dish = dict(id=dishid[1])

            # Create object with dish updates
            dish_update = dict(name=dishname[1], list=list())

            for i in range(0, len(components), 4):
                component = dict()

                for k in range(i, i+4):
                    component[components[k][0]] = components[k][1]
                
                dish_update["list"].append(component)
            
            # Add dish updates to db    
            if dish_exists(dish):
                edit_dish(dish, dish_update)
                return jsonify(success=True)

        if request.form["action"] == "delete":
            id, action = request.form.items(multi=True)
            # Create dish object to change
            dish = dict(id=id[1], user=session["id"])

            # Delete dish data
            if dish_exists(dish):
                delete_dish(dish)
                return jsonify(success=True)
            
        return jsonify(success=False)


# Implement routes related to shopping lists
# Get current shopping lists related to a user
@app.route("/api/profile/lists")
def lists():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))

    user = dict(id=session["id"])
    # Get shopping lists for current user
    shopping_lists = get_shopping_lists(user)
    return jsonify(shopping_lists)


# Create new shopping list
@app.route("/api/profile/lists/create", methods=["GET", "POST"])
def list_create():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    if request.method == "POST":
        title, *items = request.form.items(multi=True)
        # Create list object
        list = dict(name=title[1], elements=[], userid=session["id"])

        for i in range(0, len(items), 4):
            element = dict()

            for k in range(i, i+4):
                element[items[k][0]] = items[k][1]
            
            list["elements"].append(element)
        
        create_list(list)
        return jsonify(success=True)


@app.route("/api/profile/lists/update", methods=["GET", "POST"])
def list_update():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    if request.method == "POST":

        # Update existing shopping list
        if request.form["action"] == "edit":
            name, *elements, id, action = request.form.items(multi=True)
            # Create list object to change
            query_list = dict(id=id[1])

            # Create object with list updates
            list_edit = dict(name=name[1], elements=list())

            for i in range(0, len(elements), 4):
                element = dict()

                for k in range(i, i+4):
                    element[elements[k][0]] = elements[k][1]
                
                list_edit["elements"].append(element)
            
            if list_exists(query_list):
                # Add list updates to db
                # Fix - update only certain columns in db
                edit_list(query_list, list_edit)
                return jsonify(success=True)

        # Delete existing shopping list 
        if request.form["action"] == "delete":
            id, action = request.form.items(multi=True)
            # Create list object to change
            query_list = dict(id=id[1])

            if list_exists(query_list):
                # Delete list data
                delete_list(query_list)
                return jsonify(success=True)
            
        return jsonify(success=False)


