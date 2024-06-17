import os
import sys

from flask import Flask, request, redirect, url_for, session, Request
from flask_session import Session
from datetime import timedelta
from dotenv import load_dotenv

sys.path.append(os.path.abspath("/shopping-list-app/flaskr/db"))
from users import register, edit_user_data, delete_user_data
from helpers import login_credentials_valid, register_credentials_valid


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


# Display error
@app.route("/error/<type>")
def error(type):
    # Is a temporary solution for front-end
    return f'''
        Invalid {type}! Try again!
        Go to: <a href={url_for(type)}>{type}</a>
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
            session["name"] = credentials["username"]

            return redirect(url_for("profile"))
        
        else:
            return redirect(url_for("error", type="login"))

    # Is a temporary solution for front-end on GET method
    return '''
        <form action="/login" method="post">
            <input name="username" placeholder="Name"/>
            <input type="password" name="password" placeholder="password"/>
            <button type="submit">Log in</button>
        </form>
    '''


# Enter page of the app
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        credentials = {
            "username": request.form["username"],
            "email": request.form["email"],
            "password": request.form["password"]
        }

        if register_credentials_valid(credentials):
            register(credentials)

            return redirect(url_for("login"))
        
        else:
            return redirect(url_for("error", type="index"))

    # Is a temporary solution for front-end on GET method
    return '''
        <form action="/" method="post">
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
        
        else:
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
    
    return redirect("/login")


# Display user profile
@app.route("/profile")
def profile():
    # Check if session is valid
    if "id" not in session:
        return redirect(url_for("logout"))

    # Is a temporary solution for front-end
    return f'''
        {session["name"]}'s profile

        <a href={url_for("update_user")}>Change user's data</a>
        <a href={url_for("dishes")}>See dishes list</a>
        <a href="/logout">Logout</a>
    '''


# Change user data
@app.route("/profile/update", methods=["GET", "POST"])
def update_user():
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

            # Update data in db
            edit_user_data(query, edit_user)

            return redirect(url_for("logout"))
        
        # Delete user data
        if query["action"] == "delete":
            delete_user_data(query)

            return redirect(url_for("index"))
    
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


        dish_name, *components, userid = request.form.items(multi=True)
    # Is a temporary solution for front-end
    return f'''
            querydish, newdishname, *components, userid, action = request.form.items(multi=True)
            querydish, userid, action = request.form.items(multi=True)
# Display error
@app.route("/error/<type>")
def error(type):
    # Is a temporary solution for front-end
    return f'''
        Invalid {type}! Try again!
        Go to: <a href={url_for(type)}>{type}</a>
    '''


