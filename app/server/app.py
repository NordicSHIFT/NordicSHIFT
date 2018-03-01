# server.py
from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from oAuth import *
import datetime
import os
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table, Column, Integer, String, create_engine, Sequence, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
import createTables
import hashlib, uuid
from scheduler import scheduler2, Schedule
from shift import Shift
from student import Student
#import calRetrieve
import oAuth

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
app.secret_key=os.environ['SECRET_KEY']
salt =  os.environ['SALT']

Base=declarative_base()
postgresql_uri=os.environ['DATABASE_URL']
engine=create_engine(postgresql_uri)

Session = sessionmaker(bind=engine)
db = Session()

suggestedSchedules = None

@app.route("/")
def index():
    return render_template("index.html")

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
    session['l_or_s'] = 'l'
    return authCall()

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
            session['schedules'] = "Schedules"
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
    session['l_or_s'] = 's'
    return authCall()

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
    #print(session)
    data = request.get_json(silent=True)
    department = data.get("department")
    student = data.get("student")
    print("department: ", data.get("department"))
    print("student: ", data.get("student"))
    if department!='' and department!=None:
        res = db.execute("""SELECT * from department where name ='%s';"""%department)
        res = res.fetchall()
        if len(res) == 0:
            db.execute("""INSERT into department(name) VALUES ('%s');"""%department)
        db.execute("""UPDATE manager SET dept = (SELECT id from department where name ='%s') WHERE username = '%s';"""%(department, session.get('username')))
        db.commit()
        return department
    if student!='':
        if '@luther.edu' not in student:
            return 'error'
        res = db.execute("""SELECT * from student where username ='%s'"""%student)
        res = res.fetchall()
        if len(res)==0:
            db.execute("""INSERT into student(username, password) VALUES ('%s','student');"""%student)
        db.execute("""INSERT into ds(department,student) VALUES ((SELECT dept from manager where username = '%s'),(SELECT id from student where username ='%s'));"""%(session.get("username"), student))
        db.commit()
        res = db.execute("""SELECT * from student where username ='%s'"""%student)
        res = res.fetchall()
        returnStudent = {"username": res[0].username, "name": res[0].name, "hours": res[0].hours}
        return jsonify(returnStudent)
    return jsonify([department, student])

@app.route("/api/getStudents")
def getStudents():
    res = db.execute("""SELECT * from student inner join ds on student.id = ds.student where department = (SELECT dept from manager where username = '%s' );"""%(session.get("username")))
    res = res.fetchall()
    # print(res)
    # return "students"
    students = {"student":[]}
    for student in res:
        students["student"].append({"id": student.id, "username": student.username, "name": student.name, "hours": student.hours})
    # print(students)
    return jsonify(students)

@app.route("/api/studentUpdates", methods = ['POST'])
def studentUpdate():
    data = request.get_json(silent=True)
    modifiedStudents = data.get("students")
    for student in modifiedStudents:
        if student['hours'] is None:
            student['hours'] = 0
        if student['name'] == 'None':
            student['name'] = 'Empty'
        # if student['name'] is not None and student['hours'] is not None and student['username'] is not None:
        # print(str(student['hours'])+ student['name']+ student['username']+ str(student['id']))
        db.execute("""UPDATE student SET hours = '%d', name = '%s', username = '%s' where id = '%d'; """%(student['hours'], student['name'], student['username'], student['id']))
        db.commit()
    return "done"

@app.route("/api/getAllDepartments")
def getAllDepartments():
    res = db.execute("""SELECT * from department;""")
    res = res.fetchall()
    print('res: ', res)
    departments = []
    for dept in res:
        departments.append([dept.id,dept.name]);
    return jsonify(departments)

@app.route("/api/getManagerDept")
def getManagerDept():
    res = db.execute("""SELECT name from department where id =(SELECT dept from manager where username = '%s');"""%session.get("username"))
    res = res.fetchall()
    if (len(res) > 0):
        return res[0][0]
    return ""

@app.route("/api/calendar")
def calendar():
    myevents = []
    res = db.execute("""SELECT * from shift where dept =(SELECT dept from manager where username = '%s');"""%session.get("username"))
    shiftRe = res.fetchall()
    shifts = []
    for shift in shiftRe:
        newShift = Shift(shift[0],shift[2],shift[4],shift[5])
        myevents.append(newShift)
    #color scheme colors: #62c462, #5bc0de, #f89406,  #ee5f5b
    print("In calendar!!")
    serialEvents = [event.serialize() for event in myevents]
    data = {"calData": "Calendar Data", "events": serialEvents}
    return jsonify(data)

@app.route("/api/addEvents", methods = ['POST'])
def addEvents():
  data = request.get_json(silent=True)
  myEvents = data.get('myEvents')
  for myEvent in myEvents:
    old_format = "%Y-%m-%dT%H:%M:%S.%fZ"
    new_format = '%Y-%m-%d %H:%M:%S'

    startTime = myEvent.get('start')
    start=datetime.datetime.strptime(startTime, old_format).strftime(new_format)

    endTime = myEvent.get('end')
    end = datetime.datetime.strptime(endTime, old_format).strftime(new_format)

    db.execute("""INSERT into shift(dept, startTime, endTime) VALUES ((SELECT dept from manager where username = '%s'), '%s', '%s');"""%(session.get('username'),start, end))
    db.commit()

  return "success"

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
  old_format = "%Y-%m-%dT%H:%M:%S.%fZ"
  new_format = '%Y-%m-%d %H:%M:%S'
  start=datetime.datetime.strptime(myEvent.get('start'), old_format).strftime(new_format)
  end = datetime.datetime.strptime(myEvent.get('end'), old_format).strftime(new_format)
  db.execute("""DELETE from shift WHERE startTime ='%s' and endTime='%s' and dept = (SELECT dept from manager where username = '%s')"""%(start,end, session.get('username')))
  return "done"

@app.route("/api/generateSchedule", methods=['GET','OPTIONS','POST'])
def generateSchedule():
    #calendarCall to fill in all the students' schedules to the db
    #run the algorithm
    #return the results
    res = db.execute("""SELECT * from shift where dept =(SELECT dept from manager where username = '%s');"""%session.get("username"))
    shiftRe = res.fetchall()
    shifts = []
    for shift in shiftRe:
        newShift = Shift(shift[0],shift[2],shift[4],shift[5])
        shifts.append(newShift)

    res = db.execute("""SELECT * from student inner join ds on student.id = ds.student where student.hours > 0 and ds.department = (SELECT dept from manager where username ='%s');"""%session.get("username"))
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

    #print("in generate schedules,", suggestedSchedules)
    res = [schedule.serialize() for schedule in schedules]
    session.modified = True
    print("session.get('schedules')",session.get('schedules'))
    return jsonify(res)

@app.route('/api/chooseSchedule', methods=['POST'])
def chooseSchedule():
    print ("IN CHOOSE SCHEDULE")
    data = request.get_json(silent=True)
    schedule = data.get('schedule')['assigned shifts']
    # print("schedule", schedule)
    # This function will save the selected schedule in the database by making changes to the shift schedule with student for each shift
    for shift in schedule:
        db.execute("UPDATE shift SET student = (select id from student where username = '%s') where id = '%d';"%(shift['student'],shift['id']))
        db.commit()
    return "done"

@app.route('/api/retrieveSchedule', methods=['GET','OPTIONS'])
def retrieveSchedule():
    #TODO make sure this query looks right
    res = db.execute("""SELECT * from shift where dept =(SELECT dept from manager where username = '%s');"""%session.get("username"))
    shiftRe = res.fetchall()
    shifts = []
    for shift in shiftRe:
      newShift = Shift(shift[0],shift[2],shift[4],shift[5])
      shifts.append(newShift)
    schedule = Schedule(shifts)
    res = schedule.serialize()
    return jsonify(res)

@app.route('/api/calRetrieve', methods=['GET'])
def calRetrieve():
    #TODO: Implement calRetrieve.py. Pass in either a list or individual
    studentWorkers = ['chriia01@luther.edu', 'nguyli03@luther.edu', 'hermaa02@luther.edu', 'davial02@luther.edu', 'millro04@luther.edu','hangde01@luther.edu', 'css@luther.edu']

    foo = oAuth.calendarCall() #pass in student workers here, change calendarCall 
    print(foo)
    print('here')
    return foo

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
