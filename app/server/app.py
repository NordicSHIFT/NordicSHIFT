# server.py
from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from calRetrieve import *
import datetime

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table, Column, Integer, String, create_engine, Sequence, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
import createTables
# import subprocess
#
# subprocess.call(['cd','app/static'],cwd ='/', shell=True)
# subprocess.call(['npm','build'])
# subprocess.call('python3', './app/server/app.py')

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

Base=declarative_base()
postgresql_uri='postgres://fhscjkxvzpcgky:6b3962c83e75cd9864ef296dd8d45f4ea58a2fd129875a65d74040eaec8b0e92@ec2-23-21-220-152.compute-1.amazonaws.com:5432/d2ijd81slr7fhm'
engine=create_engine(postgresql_uri)

Session = sessionmaker(bind=engine)
db = Session()

@app.route("/")
def index():
  calendarCall()
  return render_template("index.html")
  #return calendarCall()

@app.route('/oauth2callback')
def oauth2callback():
  import uuid
  app.secret_key = str(uuid.uuid4())
  return mainOauth2callback()

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
    res = db.execute("""SELECT id from student where username = '%s' and password= '%s';"""%(item['username'], item['password']))
    res1 = res.fetchall()
    res = db.execute("""SELECT id from manager where username = '%s' and password= '%s';"""%(item['username'], item['password']))
    res2 = res.fetchall()
    if len(res1) > 0:
        print('right student login')
        return '/'
    elif len(res2)> 0:
        print('right manager login')
        return '/'
    else:
        print('wrong combination for username and password')
        return '/login'
    # if item['password'] == 'password' and item['username'] == 'admin':
    #     print('right login')
    #     return "/"
    # else:
    #     print("wrong login")
    #     return "/login"

@app.route('/signup')
def signup():
    print("sign up is  here")
    return render_template('index.html')

@app.route('/signupC', methods = ['POST'])
def signupC():
    inputusername = str(request.args.get("inputusername"))
    inputpassword = str(request.args.get("inputpassword"))
    inputrole = request.args.get("inputrole")
    data = request.get_json(silent=True)
    item = {'username': data.get('inputusername'), 'password': data.get('inputpassword'),'role': data.get('inputrole')}
    print(item)
    res = db.execute("""SELECT id from %s where username = '%s' and password= '%s';"""%(item['role'], item['username'], item['password']))
    res = res.fetchall()
    if len(res) >0:
        return '/login'
    else:
        db.execute("""INSERT into %s(username, password) VALUES ('%s','%s');"""%(item['role'],item['username'],item['password']))
        db.commit()
        print("insert is executed")
        return '/'
    # if item['password'] == 'password' and item['username'] == 'admin':
    #     print('right login')
    #     return "/"
    # else:
    #     print("wrong login")
    #     return "/login"
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
  myevents = [{
  "title": 'Your Shift',
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
  myEvent['title'] = 'New Shift' 
  myEvent['hexColor'] = '#f89406'
  print('myEvent: ', myEvent)
  data = myEvent
  #TODO write change to database
  return jsonify(data)

@app.route("/api/moveEvent", methods = ['POST'])
def moveEvent():
  print ('IN MOVE EVENT!')
  #title = request.args.get("title")
  #print("title: ", title)
  data = request.get_json(silent=True)
  myEvent = data.get('myEvent')
  data = myEvent
  #TODO write change to database 
  return jsonify(data)

if __name__ == "__main__":
    createTables.createTables()
    app.run(debug=True)
