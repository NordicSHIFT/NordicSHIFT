# server.py
from flask import Flask, flash, redirect, render_template, request, session, abort
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

@app.route('/login')
def login():
    print("hello from login")
    return render_template("login.html")

def loginSuccess():
    login()
    if request.form['password'] == 'password' and request.form['username'] == 'admin':
        return render_template('calendar.html')
    else:
        return login()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
  print("test test test test test")
  print(path)
  return render_template("index.html")

if __name__ == "__main__":
  app.run()
