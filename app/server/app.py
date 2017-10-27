# server.py
from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from calRetrieve import *
import subprocess

subprocess.call(['./startbuild.sh'],cwd ='/', shell=True)

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
  calendarCall()
  return render_template("index.html")
  # return calendarCall();

@app.route('/oauth2callback')
def oauth2callback():
  import uuid
  app.secret_key = str(uuid.uuid4())
  return mainOauth2callback();

@app.route('/login')
def login():
    print("hello from login")
    return render_template("login.html")

@app.route('/loginC', methods = ['POST'])
def loginC():
    inputusername = request.args.get("inputusername")
    inputpassword = request.args.get("inputpassword")
    data = request.get_json(silent=True)
    item = {'username': data.get('inputusername'), 'password': data.get('inputpassword')}
    print(item)
    if item['password'] == 'password' and item['username'] == 'admin':
        print('right login')
        return "/"
    else:
        print("wrong login")
        return "/login"

# @app.route('/nordicshift.ico')
# def icon():
#   print("in icon route")
#   return render_template("index.html")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
  print("test test test test test")
  print(path)
  return render_template("index.html")

#naming standard, if it is being used for an axios call, use /api/name_of_call
@app.route("/api/calendar")
def calendar():
  print("In calendar!!")
  data = {"calData": "Calendar Data"}
  return jsonify(data)

if __name__ == "__main__":
  app.run()
