import os
import sys

from flask import Flask, request, redirect, url_for, session
from flask_session import Session
from datetime import timedelta
from dotenv import load_dotenv

sys.path.append(os.path.abspath("/shopping-list-app/flaskr/db"))
from users import register, edit_user_data, delete_user_data
from helpers import login_credentials_valid, register_credentials_valid


app = Flask(__name__)


load_dotenv()
app.secret_key = os.environ["SECRET_KEY"]

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


@app.route("/login", methods=["GET", "POST"])
def login():
    session.clear()

    if request.method == "POST":
        credentials = {
            "username": request.form["username"],
            "password": request.form["password"]
        }

        if login_credentials_valid(credentials):
            session["name"] = credentials["username"]

            return redirect(url_for("profile", username=session["name"]))
        
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


@app.route("/logout")
def logout():
    session.clear()
    
    return redirect("/login")


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


# Display user profile
@app.route("/profile/<username>")
def profile(username):
    # Check if session object length is 1
    # If true - redirect to logout
    # Set this somwhere globally
    if "name" not in session:
        return redirect(url_for("logout"))
    # Is a temporary solution for front-end
    return f'''
        {username}'s profile

        <a href="/logout">Logout</a>
        <a href={url_for("change_user", username=username)}>Change user's data</a>
    '''

# Change user data
# Delete user data
@app.route("/profile/<username>/change", methods=["GET", "POST"])
def change_user(username):
    if "name" not in session:
        return redirect(url_for("logout"))

    if request.method == "POST":
        # Get data
        # Dmytro Malienik, not Dmytro
        # Get data from session
        # Expand session time
        user = {
            "username": session["name"],
            "action": request.form["action"]
        }

        # Edit user data
        if user["action"] == "edit":
            edit_user = {
                "username": request.form["username"],
                "email": request.form["email"],
                "password": request.form["password"],
            }

            # Update data in db
            edit_user_data(user, edit_user)

            return redirect(url_for("logout"))
        
        # Delete user data
        if user["action"] == "delete":
            delete_user_data(user)

            return redirect(url_for("index"))
    
    # Is a temporary solution for front-end
    return f'''
        {username}, change you data here!

        <form action="/profile/<username>/change" method="post">
            <input name="username" placeholder="Name"/>
            <input name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="password"/>
            <input type="hidden" name="action" value="edit"/>
            <button type="submit">Change data</button>
        </form>

        {username}, delete your data here!

        <form action="/profile/<username>/change" method="post">
            <input type="hidden" name="queryname" value={username}/>
            <input type="hidden" name="action" value="delete"/>
            <button type="submit">Delete profile</button>
        </form>
    '''

# Logout user
@app.route("/logout")
def logout():
    session.clear()
    
    return redirect("/login")


