import os
import sys

from flask import Flask, request, redirect, url_for, session, Request, jsonify
from flask_cors import CORS
from flask_session import Session
from datetime import timedelta
from dotenv import load_dotenv
from werkzeug.datastructures import ImmutableOrderedMultiDict

sys.path.append(os.path.abspath("./db"))

from users import register_user, edit_user_data, delete_user_data, get_user_data, get_user_session_data
from helpers import login_credentials_valid, register_credentials_valid, dish_exists, list_exists, update_credentials_valid
from dishes import get_dishes_list, add_dish, edit_dish, delete_dish
from lists import get_shopping_lists, create_list, edit_list, delete_list


app = Flask(__name__)


# Responses are stored in a server storage
app.config["SESSION_TYPE"] = "filesystem"
# User remains logged in for 1 hour
# app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=1)
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=1)
# Use it to cryptographically-sign cookies
app.config["SESSION_USE_SIGNER"] = True

# Secret key configurations
load_dotenv()
app.secret_key = os.environ["SECRET_KEY"]

# Change the order of request data
class OrderedParamsContainer(Request):
    parameter_storage_class = ImmutableOrderedMultiDict

app.request_class = OrderedParamsContainer

Session(app)

# Enable CORS
cors = CORS(app, origins=["http://127.0.0.1:3000"], resources=[r"/api/*"], supports_credentials=True)

# Use Ctrl+F to navigate through views

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


# Create a route to add new dish
@app.route("/api/profile/dishes/add", methods=["GET", "POST"])
def dish_add():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))
    
    if request.method == "POST":
        # Create dish object to add
        dish_name, *components = request.form.items(multi=True)

        dish = dict(dish=dish_name[1], components=list(), id=None, user=session["id"])

        for i in range(0, len(components), 3):
            component = dict()

            for k in range(i, i+3):
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
            dishname, *components, id, action = request.form.items(multi=True)
            # Create dish object to change
            dish = dict(id=id[1], user=session["id"])

            # Create object with dish updates
            dish_update = dict(name=dishname[1], list=list())

            for i in range(0, len(components), 3):
                component = dict()

                for k in range(i, i+3):
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
@app.route("/profile/lists")
def lists():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("login"))

    user = {
        "userid": session["id"]
    }
    # Get shopping lists for current user
    shopping_lists = get_shopping_lists(user)
    # Is a temporary solution for front-end
    return f'''
        Shopping lists

        {shopping_lists}

        <a href={url_for("list_create")}>Create new shopping list</a>
        <a href={url_for("list_update")}>Update shopping list</a>
        <a href={url_for("profile")}>Go back to profile</a>
    '''


# Create new shopping list
@app.route("/profile/lists/create", methods=["GET", "POST"])
def list_create():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("login"))
    
    if request.method == "POST":
        list_name, *elements, userid = request.form.items(multi=True)
        # Create list object
        list = dict()

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


@app.route("/profile/lists/update", methods=["GET", "POST"])
def list_update():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("login"))
    
    if request.method == "POST":

        # Update existing shopping list
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

        # Delete existing shopping list 
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


