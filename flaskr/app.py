import os
import sys

from flask import Flask, request, redirect, url_for, session
from flask_session import Session
from datetime import timedelta
from dotenv import load_dotenv

sys.path.append(os.path.abspath("/shopping-list-app/flaskr/db"))
from users import register
from helpers import login_credentials_valid, register_credentials_valid


app = Flask(__name__)


load_dotenv()
app.secret_key = os.environ["SECRET_KEY"]

# Server-side session settings
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_FILE_THRESHOLD"] = 1
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(seconds=60 )
# Secret key was configured
# Use it to cryptographically-sign cookies
app.config["SESSION_USE_SIGNER"] = True

Session(app)


@app.route("/profile/<username>")
def profile(username):
    # Is a temporary solution for front-end
    return f'''
        {username}'s profile

        <a href="/logout">Logout</a>
    '''


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
            return redirect(url_for("error"), type="login")

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


