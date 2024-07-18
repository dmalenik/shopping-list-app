import os

from flask import Request

from datetime import timedelta
from dotenv import load_dotenv
from werkzeug.datastructures import ImmutableOrderedMultiDict

# Responses are stored in a server storage
SESSION_TYPE = "filesystem"
# User remains logged in for 1 hour
# app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=1)
PERMANENT_SESSION_LIFETIME = timedelta(minutes=1)
# Use it to cryptographically-sign cookies
SESSION_USE_SIGNER = True

# Secret key configurations
load_dotenv()
SECRET_KEY = os.environ["SECRET_KEY"]

# Change the order of request data
class OrderedParamsContainer(Request):
    parameter_storage_class = ImmutableOrderedMultiDict

REQUEST_CLASS = OrderedParamsContainer
