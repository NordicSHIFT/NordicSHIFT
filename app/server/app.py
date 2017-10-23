# server.py
from flask import Flask, render_template, jsonify
from calRetrieve import *

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

# @app.route("/")
# def index():
#   calendarCall()
#   return render_template("index.html") 
#   # return calendarCall(); 

@app.route("/calendar2")
def calendar():
  print("In calendar!!")
  data = {"calData": "Calendar Data"}
  return jsonify(data)

@app.route('/oauth2callback')
def oauth2callback():
  import uuid
  app.secret_key = str(uuid.uuid4())
  return mainOauth2callback(); 

@app.route('/nordicshift.ico')
def icon():
  print("in icon route")
  return render_template("index.html")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
  print("test test test test test")
  print(path)
  return render_template("index.html")

if __name__ == "__main__":
  app.run()