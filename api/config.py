import os

from datetime import timedelta
from dotenv import load_dotenv

# Responses are stored in a server storage
SESSION_TYPE = "filesystem"

# User remains logged in for 1 hour
PERMANENT_SESSION_LIFETIME = timedelta(hours=1)
# PERMANENT_SESSION_LIFETIME = timedelta(minutes=1)

# Use it to cryptographically-sign cookies
SESSION_USE_SIGNER = True

# Secret key configurations
load_dotenv()
SECRET_KEY = os.environ["SECRET_KEY"]

# Set uploads folder
upload_folder = os.path.join("build", "uploads")
UPLOAD_FOLDER = upload_folder

