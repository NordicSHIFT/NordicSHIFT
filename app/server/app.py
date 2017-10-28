# server.py
from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from calRetrieve import *
import datetime

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
  myevents = [{
  "title": 'Python Event',
  "start":  datetime.datetime(2017, 10, 25, 13),
  "end": datetime.datetime(2017, 10, 25, 15),
  "hexColor" : "#ee5f5b"
  }]
  #color scheme colors: #62c462, #5bc0de, #f89406,  #ee5f5b
  print("In calendar!!")
  data = {"calData": "Calendar Data", "events": myevents}
  return jsonify(data)

@app.route("/api/addEvent", methods = ['POST'])
def addEvent():
  print ('IN ADD EVENT!')
  #title = request.args.get("title")
  #print("title: ", title)
  data = request.get_json(silent=True)
  myEvent = data.get('myEvent')
  myEvent['title'] = 'From Py title' 
  myEvent['hexColor'] = '#f89406'
  print('myEvent: ', myEvent)
  data = myEvent
  return jsonify(data)

if __name__ == "__main__":
  app.run()