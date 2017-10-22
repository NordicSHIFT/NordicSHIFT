# server.py
from flask import Flask, render_template
from calRetrieve import *

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

# @app.route("/")
# def index():
#   calendarCall()
#   return render_template("index.html") 
#   # return calendarCall(); 

@app.route("/calendar")
def calendar():
  return render_template("calendar.html")

@app.route('/oauth2callback')
def oauth2callback():
  import uuid
  app.secret_key = str(uuid.uuid4())
  return mainOauth2callback(); 

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
  return render_template("index.html")

if __name__ == "__main__":
  app.run()