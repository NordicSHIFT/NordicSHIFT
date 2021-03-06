import os
import flask
from flask import session

import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery

import webbrowser
import datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

POSTGRESQL_URI = os.environ['DATABASE_URL']
ENGINE = create_engine(POSTGRESQL_URI)

SESSION = sessionmaker(bind=ENGINE)
DB = SESSION()

def clearStudentUnavailability(studentUsername):
    #TODO Linh, remove all rows in the unavailability table where 
    #the student is equal to this student.
    DB.execute("DELETE from unavailability WHERE student = (SELECT id from student where username = '%s');"%studentUsername)
    DB.commit()

def insertEventIntoDb(studentUsername, startDate, endDate): 
    EX_STRING = """INSERT INTO unavailability\
            (starttime, endtime, student)\
            VALUES ('%s', '%s', (SELECT id from student where username = '%s'))
            """
    DB.execute(EX_STRING%(startDate, endDate, studentUsername))
    DB.commit()

def authCall():
    print("in calendar call")
    if 'credentials' not in flask.session:
        print ("not credentials in flask.session")
        return flask.redirect('/authorize')
    return flask.render_template("login.html")

def calendarCall(workers, startDate):
  #print("in calendar call")
  if 'credentials' not in flask.session:
      print ("not credentials in flask.session")
      return flask.redirect('/authorize')
  #print("before credentials = ")
  credentials = google.oauth2.credentials.Credentials(
      **flask.session['credentials'])

  #print("before calendar = ... ")
  calendar = googleapiclient.discovery.build('calendar', 'v3', credentials=credentials)

  #TODO change this to the dates entered from the generateSchedule screen
  #now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
  now = startDate.isoformat() + 'Z'
  #print(now)
  d = datetime.timedelta(days=7)
  end = (startDate + d).isoformat() + 'Z'
  #print(end)

  #print("Getting the next week's events")
#   workers = ['chriia01@luther.edu', 'davial02@luther.edu', 'millro04@luther.edu','hangde01@luther.edu', 'css@luther.edu', 'nguyli03@luther.edu', 'hermaa02@luther.edu']
  if not isinstance(workers, list):
      workers = workers.split()
      
  #print(workers)
  for studentId in workers:
    #if (studentId.endswith('@luther.edu')):
    #print("studentId: ", studentId)
    try: 
        #print("before eventsResult")
        eventsResult = calendar.events().list(
            calendarId=studentId, timeMin=now, timeMax=end, singleEvents=True,
            orderBy='startTime').execute()
        #print("got eventsResult")
        events = eventsResult.get('items', [])
        clearStudentUnavailability(studentId)
        i = 0
        for event in events:
            # if i==0:
            #     print(studentId, "'s first event")
            #     print("the event: ", event)
            if 'dateTime' in event['start']:
                start = event['start']['dateTime']
                end = event['end']['dateTime']
                # print("start: ",event['start']['dateTime'])
                # print('end: ', event['end']['dateTime'])
                #write event to db
                insertEventIntoDb(studentId, start, end)
            #else:
                #if dateTime is not in event['start'], it's an all day event and we'll ignore it
                #if it is an all day event, the object is a little different millro04 has one on 12/1 
            i = 1
    except:
        pass
  #print("EVENTS", events)
  #return flask.jsonify(eventsResult)

def mainAuthorize():
    print("in mainAuthorize")
    curr_dir = os.path.dirname(os.path.realpath(__file__))
    security_path = os.path.join(curr_dir, 'security')
    client_secrets_file =  os.path.join(security_path,'client_secrets.json')
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        client_secrets_file, scopes=['https://www.googleapis.com/auth/calendar.readonly'])

    flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

    authorizationUrl, state = flow.authorization_url(
        # Enable offline access so that you can refresh an access token without
        # re-prompting the user for permission. Recommended for web server apps.
        access_type='offline',
        # Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes='true')

    flask.session['state'] = state
    response = flask.redirect(authorizationUrl)
    response.headers.add('Access-Control-Allow-Origin', '*')
    # print("response: ", str(response))
    # webbrowser.open(authorizationUrl, new=0)
    # response = flask.Response(headers={'Access-Control-Allow-Origin': '*'},is_redirect=True,url=authorizationUrl)
    return flask.redirect(authorizationUrl)
    # return response

def mainOauth2callback():
  state = flask.session['state']
  curr_dir = os.path.dirname(os.path.realpath(__file__))
  security_path = os.path.join(curr_dir, 'security')
  client_secrets_file =  os.path.join(security_path,'client_secrets.json')

  flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      client_secrets_file, scopes=['https://www.googleapis.com/auth/calendar.readonly'], state=state)
  flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

  authorization_response = flask.request.url
  flow.fetch_token(authorization_response=authorization_response)

  credentials = flow.credentials
  flask.session['credentials'] = credentials_to_dict(credentials)

  if session.get('l_or_s') == 'l':
    return flask.redirect(flask.url_for('login'))
  if session.get('l_or_s') == 's':
    return flask.redirect(flask.url_for('signup'))

def credentials_to_dict(credentials):
  return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}
