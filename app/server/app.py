# server.py
from flask import Flask, render_template, jsonify
from calRetrieve import *

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

# @app.route("/")
# def index():
#   calendarCall()
#   return render_template("index.html") 
#   # return calendarCall(); 

@app.route('/oauth2callback')
def oauth2callback():
  import uuid
  app.secret_key = str(uuid.uuid4())
  return mainOauth2callback(); 

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