# server.py
from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from oAuth import *
import datetime
import os
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table, Column, Integer, String, create_engine, Sequence, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
import createTables
import os
import hashlib, uuid
from scheduler import scheduler2, Schedule
from shift import Shift
from student import Student

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
app.secret_key=os.environ['SECRET_KEY']
salt =  os.environ['SALT']

Base=declarative_base()
postgresql_uri=os.environ['DATABASE_URL']
engine=create_engine(postgresql_uri)

Session = sessionmaker(bind=engine)
db = Session()

@app.route("/")
def index():
    return authCall()
    #return render_template("index.html")

@app.route("/authorize")
def authorize():
    print("in app.py.authorize")
    return mainAuthorize()

@app.route('/oauth2callback')
def oauth2callback():
    print("in app.py oauth2callback")
    return mainOauth2callback()

@app.route('/login')
def login():
    # If you are logged in already, redirect you to the proper webpage
    if session.get('logged_in') == True:
        if session['role'] == 'Manager':
            return redirect('/managerdashboard')
        elif session['role'] == 'Student':
            return redirect('/studentdashboard')
    return render_template("login.html")

@app.route('/loginC', methods = ['POST'])
def loginC():
    data = request.get_json(silent=True)
    item = {'username': data.get('inputusername'), 'password': data.get('inputpassword')}
    res = db.execute("""SELECT password from student where username = '%s';"""%(item['username']))
    res1= res.fetchall()
    res = db.execute("""SELECT password from manager where username = '%s';"""%(item['username']))
    res2 = res.fetchall()
    if len(res1) > 0:
        hashed_password = hashlib.sha512(item['password'].encode('utf-8') + salt.encode('utf-8')).hexdigest()
        dbpass = res1[0][0]
        if hashed_password == dbpass:
            session['username'] = item['username']
            session['role'] = 'Student'
            session['logged_in'] = True

            print('student logged in')

            go_to = check_and_redirect_back('/studentdashboard')
            return go_to
        else:
            print('wrong combination for username and password for student')
            return '/login'
    elif len(res2)> 0:
        hashed_password = hashlib.sha512(item['password'].encode('utf-8') + salt.encode('utf-8')).hexdigest()
        dbpass = res2[0][0]
        if hashed_password == dbpass:
            session['username'] = item['username']
            session['role'] = 'Manager'
            session['logged_in'] = True
            print('manager logged in')
            go_to = check_and_redirect_back('/managerdashboard')
            return go_to
        else:
            print('wrong combination for username and password for manager')
            return '/login'
    else:
        print('Username does not exists, please sign up')
        return '/signup'

@app.route('/signup')
def signup():
    # If you are logged in already, redirect you to the proper webpage
    if session.get('logged_in') == True:
        if session['role'] == 'Manager':
            return redirect('/managerdashboard')
        elif session['role'] == 'Student':
            return redirect('/studentdashboard')
    return render_template('index.html')

@app.route('/signupC', methods = ['POST'])
def signupC():
    data = request.get_json(silent=True)
    item = {'username': data.get('inputusername'), 'password': data.get('inputpassword'),'role': data.get('inputrole')}
    # salt =  uuid.uuid4().hex
    hashed_password = hashlib.sha512(item['password'].encode('utf-8') + salt.encode('utf-8')).hexdigest()
    # item['password'] = hashed_password
    # hashed_password = bcrypt.hashpw('password'.encode('utf-8'), bcrypt.gensalt())
    item['password'] = hashed_password
    print(item)
    res = db.execute("""SELECT id from %s where username = '%s' and password= '%s';"""%(item['role'], item['username'], item['password']))
    res = res.fetchall()
    if len(res) >0:
        return '/login'
    else:
        db.execute("""INSERT into %s(username, password) VALUES ('%s','%s');"""%(item['role'],item['username'],item['password']))
        db.commit()

        session['username'] = item['username']
        session['role'] = item['role']
        session['logged_in'] = True

        print("insert is executed")

        if item['role'] == 'Manager':
            go_to = check_and_redirect_back('/managerdashboard')
            return  go_to
        elif item['role'] == 'Student':
            go_to = check_and_redirect_back('/studentdashboard')
            return  go_to
        return '/'

@app.route("/logout")
def logout():
    session['username'] = None
    session['role'] = None
    session['logged_in'] = False

    return redirect('/')

# @app.route('/nordicshift.ico')
# def icon():
#   print("in icon route")
#   return render_template("index.html")
@app.route('/myprofile')
def myprofile():
    print(session)
    if session.get('role') == 'Manager':
        return redirect('/managerprofile')
    elif session.get('role') == 'Student':
        return redirect('/studentprofile')
    else:
        return redirect('/login')

@app.route('/api/managerprofile', methods = ['POST'])
def managerprofile():
    print(session)
    data = request.get_json(silent=True)
    department = data.get("department")
    student = data.get("student")
    print("department: ", data.get("department"))
    print("student: ", data.get("student"))
    if department!='':
        res = db.execute("""SELECT * from department where name ='%s';"""%department)
        res = res.fetchall()
        if len(res) == 0:
            db.execute("""INSERT into department(name) VALUES ('%s');"""%department)
        db.execute("""UPDATE manager SET dept = (SELECT id from department where name ='%s') WHERE username = '%s';"""%(department, session.get('username')))
        db.commit()
    if student!='':
        if '@luther.edu' not in student:
            return 'error'
        res = db.execute("""SELECT * from student where username ='%s'"""%student)
        res = res.fetchall()
        if len(res)==0:
            db.execute("""INSERT into student(username, password) VALUES ('%s','student');"""%student)
        db.execute("""INSERT into ds(department,student) VALUES ((SELECT dept from manager where username = '%s'),(SELECT id from student where username ='%s'));"""%(session.get("username"), student))
        db.commit()
    return '/myprofile'

#naming standard, if it is being used for an axios call, use /api/name_of_call
@app.route("/api/calendar")
def calendar():
  myevents = [{
  "title": 'Your Shift',
  "start":  datetime.datetime(2017, 10, 31, 13),
  "end": datetime.datetime(2017, 10, 31, 15),
  "hexColor" : "#ee5f5b"
  }]
  #color scheme colors: #62c462, #5bc0de, #f89406,  #ee5f5b
  print("In calendar!!")
  data = {"calData": "Calendar Data", "events": myevents}
  return jsonify(data)

@app.route("/api/addEvent", methods = ['POST'])
def addEvent():
  #print ('IN ADD EVENT!')
  #title = request.args.get("title")
  #print("title: ", title)
  data = request.get_json(silent=True)
  myEvent = data.get('myEvent')
  myEvent['hexColor'] = '#f89406'
  #print('myEvent: ', myEvent)
  data = myEvent
  print(data)
  #TODO write change to database, add new shift
  old_format = "%Y-%m-%dT%H:%M:%S.%fZ"
  new_format = '%Y-%m-%d %H:%M:%S'
  startTime = data.get('start')
  start=datetime.datetime.strptime(startTime, old_format).strftime(new_format)
  endTime = data.get('end')
  end = datetime.datetime.strptime(endTime, old_format).strftime(new_format)
  db.execute("""INSERT into shift(dept, startTime, endTime) VALUES ((SELECT dept from manager where username = '%s'), '%s', '%s');"""%(session.get('username'),start, end))
  db.commit()
  print(myEvent)
  return jsonify(data)

@app.route("/api/moveEvent", methods = ['POST'])
def moveEvent():
  print ('IN MOVE EVENT!')
  #title = request.args.get("title")
  #print("title: ", title)
  data = request.get_json(silent=True)
  print(data)
  myEvent = data.get('myEvent')
  old_format = "%Y-%m-%dT%H:%M:%S.%fZ"
  new_format = '%Y-%m-%d %H:%M:%S'
  newStart=datetime.datetime.strptime(data.get('newStart'), old_format).strftime(new_format)
  newEnd = datetime.datetime.strptime(data.get('newEnd'), old_format).strftime(new_format)
  oldStart = datetime.datetime.strptime(data.get('oldStart'), old_format).strftime(new_format)
  oldEnd = datetime.datetime.strptime(data.get('oldEnd'), old_format).strftime(new_format)
  #TODO write change to database , need to remove/modify old shift
  res = db.execute("""SELECT id from shift where startTime= '%s' and endTime = '%s'"""%(oldStart,oldEnd))
  res = res.fetchall()
  print(res)
  db.execute("""UPDATE shift SET startTime ='%s', endTime='%s' where id = (SELECT id from shift where startTime= '%s' and endTime = '%s');"""%(newStart, newEnd, oldStart, oldEnd))
  db.commit()
  return jsonify(data)

@app.route("/api/deleteEvent", methods = ['POST'])
def deleteEvent():
  print ("IN DELETE EVENT")
  data = request.get_json(silent=True)
  myEvent = data.get('myEvent')
  # print(data, myEvent.get('start'), myEvent.get('end'))
  #TODO delete shift from database
  #maybe return new list of events, or leave it to the front end
  old_format = "%Y-%m-%dT%H:%M:%S.%fZ"
  new_format = '%Y-%m-%d %H:%M:%S'
  start=datetime.datetime.strptime(myEvent.get('start'), old_format).strftime(new_format)
  end = datetime.datetime.strptime(myEvent.get('end'), old_format).strftime(new_format)
  db.execute("""DELETE from shift WHERE startTime ='%s' and endTime='%s' and dept = (SELECT dept from manager where username = '%s')"""%(start,end, session.get('username')))
  return "done"

@app.route("/api/generateSchedule", methods=['GET','OPTIONS'])
def generateSchedule():
    #calendarCall to fill in all the students' schedules to the db
    #run the algorithm
    #return the results
    res = db.execute("""SELECT * from shift where dept =(SELECT dept from manager where username = '%s');"""%session.get("username"))
    shiftRe = res.fetchall()
    shifts = []
    for shift in shiftRe:
      newShift = Shift(shift[2],shift[4],shift[5])
      shifts.append(newShift)

    res = db.execute("""SELECT * from student inner join ds on student.id = ds.student where ds.department = (SELECT dept from manager where username ='%s');"""%session.get("username"))
    studentRe = res.fetchall()
    students = []
    for student in studentRe:
      newStudent = Student(student[1],student[4])
      res = db.execute("""SELECT starttime, endtime from unavailability where student = %d; """%(int(student[0])))
      res = res.fetchall()
      for item in res:
          newStudent.assignedUnavailability((item[0],item[1]))
      students.append(newStudent)

    print("about to make calendar call")
    schedule = Schedule(shifts)
    schedules = scheduler2(schedule, students)
    res = [schedule.serialize() for schedule in schedules]
    return jsonify(res)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if session.get("logged_in") == True or path == '/':
        return render_template("index.html")
    else:
        print('path', path)
        if path != 'favicon.ico':
          session['attempted_url'] = path
          #this kind of works, except if you attempted to get to managerdashboard, then
          #log in as a student, it redirects you to the managerdashboard later. and vice versa
        return redirect("/login")

# This is a function that will redirect you to a credential protected page.
# It will check to see if you tried to access the page and redirect you to it if needed
# else, it will redirect you to the alt_url.
def check_and_redirect_back(alt_url):
    if session.get('attempted_url'):
        redir = session.get('attempted_url')
        del session['attempted_url']
        return '/' + redir
    else:
        return alt_url

if __name__ == "__main__":
    createTables.createTables()
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
    app.run(debug=True)
