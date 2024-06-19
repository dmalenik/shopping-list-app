import os
import sys

from flask import Flask, request, redirect, url_for, session, Request
from flask_session import Session
from datetime import timedelta
from dotenv import load_dotenv
from werkzeug.datastructures import ImmutableOrderedMultiDict

sys.path.append(os.path.abspath("/shopping-list-app/api/db"))

from users import register, edit_user_data, delete_user_data, get_user_data
from helpers import login_credentials_valid, register_credentials_valid, dish_exists, list_exists
from dishes import get_dishes_list, add_dish, edit_dish, delete_dish
from lists import get_shopping_lists, create_list, edit_list, delete_list


app = Flask(__name__)


# Server-side session settings
# Responses are stored in a server storage
app.config["SESSION_TYPE"] = "filesystem"
# User remains logged in for 1 hour
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=1)
# Use it to cryptographically-sign cookies
app.config["SESSION_USE_SIGNER"] = True

# Secret key was configured
load_dotenv()
app.secret_key = os.environ["SECRET_KEY"]

# Change the order of grouped values which appear in request
class OrderedParamsContainer(Request):
    parameter_storage_class = ImmutableOrderedMultiDict

app.request_class = OrderedParamsContainer

Session(app)


# Use Ctrl+F to navigate through views

# Modify requests
@app.before_request
def func():
    session.modified = True


# Implement routes related to user authentication


# Enter page of the app
@app.route("/")
def index():
    # Is a temporary solution for front-end on GET method
    return f'''
        Welcome!

        <a href={url_for("register")}>Register here!</a>
    '''


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        credentials = {
            "username": request.form["username"],
            "email": request.form["email"],
            "password": request.form["password"]
        }

        if register_credentials_valid(credentials):
            register(credentials)

            return redirect(url_for("login"))

        return redirect(url_for("error", type="register"))

    # Is a temporary solution for front-end on GET method
    return f'''
        <form action="/register" method="post">
            <input name="username" placeholder="Name"/>
            <input name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="password"/>
            <button type="submit">Submit</button>
        </form>
    '''

# Login
@app.route("/login", methods=["GET", "POST"])
def login():
    # Restart session every time a user logs in
    session.clear()

    if request.method == "POST":
        credentials = {
            "username": request.form["username"],
            "password": request.form["password"]
        }

        if login_credentials_valid(credentials):
            # Get logged in user data
            user = get_user_data(credentials)
            # Assign to session data user's name and id
            session["id"] = user["id"]
            session["name"] = user["username"]

            return redirect(url_for("profile"))
        
        return redirect(url_for("error", type="login"))

    # Is a temporary solution for front-end on GET method
    return '''
        <form action="/login" method="post">
            <input name="username" placeholder="Name"/>
            <input type="password" name="password" placeholder="password"/>
            <button type="submit">Log in</button>
        </form>
    '''


# Logout user
@app.route("/logout")
def logout():
    session.clear()
    
    return redirect(url_for("login"))


# Display error
@app.route("/error/<type>")
def error(type):
    # Is a temporary solution for front-end
    return f'''
        Invalid {type}! Try again!
        Go to: <a href={url_for(type)}>{type}</a>
    '''


# Implement routes related to user


# Display user profile
@app.route("/profile")
def profile():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))

    # Is a temporary solution for front-end
    return f'''
        {session["name"]}'s profile

        <a href={url_for("profile_update")}>Change user's data</a>
        <a href={url_for("dishes")}>See dishes list</a>
        <a href={url_for("lists")}>See shopping lists</a>

        <a href={url_for("logout")}>Logout</a>
    '''


# Change user data
@app.route("/profile/update", methods=["GET", "POST"])
def profile_update():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))

    if request.method == "POST":
        # Dmytro Malienik, not Dmytro
        query = {
            "username": session["name"],
            "action": request.form["action"]
        }

        # Update user data
        if query["action"] == "edit":
            edit_user = {
                "username": request.form["username"],
                "email": request.form["email"],
                "password": request.form["password"],
            }

            # Fix - check if data to edit is valid
            # Update data in db
            edit_user_data(query, edit_user)

            return redirect(url_for("logout"))
        
        # Delete user data
        if query["action"] == "delete":
            delete_user_data(query)

            return redirect(url_for("index"))
        
        return redirect(url_for("error"), type="profile_update")
    
    # Is a temporary solution for front-end
    return f'''
        {session["name"]}, change you data here!

        <form action="/profile/update" method="post">
            <input name="username" placeholder="Name"/>
            <input name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="password"/>
            <input type="hidden" name="action" value="edit"/>
            <button type="submit">Change data</button>
        </form>

        {session["name"]}, delete your data here!

        <form action="/profile/update" method="post">
            <input type="hidden" name="queryname" value={session["name"]}/>
            <input type="hidden" name="action" value="delete"/>
            <button type="submit">Delete profile</button>
        </form>
    '''


# Implement routes related to dishes


# Create a route to see dishes
@app.route("/profile/dishes")
def dishes():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("login"))

    user = {
        "userid": session["id"]
    }
    # Get dishes list for current user
    dishes_list = get_dishes_list(user)
    # Is a temporary solution for front-end
    return f'''
        Dishes list

        {dishes_list}
        <a href={url_for("dish_add")}>Add new dish</a>
        <a href={url_for("update_dish")}>Update dish</a>
        <a href={url_for("profile")}>Go back to profile</a>
    '''


# Create a route to add new dish
@app.route("/profile/dishes/add", methods=["GET", "POST"])
def dish_add():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("login"))
    
    if request.method == "POST":
        # Create dish object
        dish = dict()

        dish_name, *components, userid = request.form.items(multi=True)

        dish["dish"] = dish_name[1]

        dish["components"] = []
        for i in range(0, len(components), 3):
            component = dict()

            for k in range(i, i+3):
                component[components[k][0]] = components[k][1]
            
            dish["components"].append(component)

        userid = int(userid[1].replace("/", ""))
        dish["userid"] = userid
        # Check if dish with the same name exists
        if dish_exists(dish):
            return redirect(url_for("error", type="dish_add"))
        
        else:
            # Was error due to similar with dish_add function names
            add_dish(dish)

            return redirect(url_for("dishes"))
    # Is a temporary solution for front-end
    return f'''
        <form action="/profile/dishes/add" method="post">
            <input name="dish" placeholder="Dish"/>

            Components:

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

            <button type="submit">Add dish</button>
        </form>

        <a href={url_for("dishes")}>Go back to dishes list</a>
    '''


# Create a route to edit dishes
@app.route("/profile/dishes/update", methods=["GET", "POST"])
def dish_update():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("login"))
    
    if request.method == "POST":
        if request.form["action"] == "edit":
            querydish, newdishname, *components, userid, action = request.form.items(multi=True)
            # Create dish object to change
            dish = dict()

            dish["dish"] = querydish[1]

            userid = int(userid[1].replace("/", ""))
            dish["userid"] = userid

            # Create object with dish updates
            dish_edit = dict()

            dish_edit["dish"] = newdishname[1]

            dish_edit["components"] = []
            for i in range(0, len(components), 3):
                component = dict()

                for k in range(i, i+3):
                    component[components[k][0]] = components[k][1]
                
                dish_edit["components"].append(component)
            
            if dish_exists(dish):
                # Add dish updates to db
                edit_dish(dish, dish_edit)

                return redirect(url_for("dishes"))

        if request.form["action"] == "delete":
            querydish, userid, action = request.form.items(multi=True)
            # Create dish object to change
            dish = dict()

            dish["dish"] = querydish[1]

            userid = int(userid[1].replace("/", ""))
            dish["userid"] = userid
            if dish_exists(dish):
                # Delete dish data
                delete_dish(dish)

                return redirect(url_for("dishes"))
            
        return redirect(url_for("error", type="dish_update"))

    # Implement a form to edit
    # Implement a button to delete a dish
    # Go back to dishes list
    # Is a temporary solution for front-end
    return f'''
        <form action="/profile/dishes/update" method="post">
            <input name="querydish" placeholder="Dish to change"/>

            <input name="newdishname" placeholder="New name"/>

            Components:

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
            <button type="submit">Change dish</button>
        </form>

        <form action="/profile/dishes/update" method="post">
            <input name="querydish" placeholder="Dish to delete"/>
            <input type="hidden" name="userid" value={session["id"]}/>
            <input type="hidden" name="action" value="delete"/>
            <button type="submit">Delete dish</button>
        </form>

        <a href={url_for("dishes")}>Go back to dishes list</a>
    '''


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


