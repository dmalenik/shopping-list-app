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
