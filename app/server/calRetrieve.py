import json

import flask
import httplib2
import os
import datetime

from googleapiclient import discovery
from oauth2client import client
#
# from app import app
# app = flask.Flask(__name__)
# app routes don't seem to work if they are imported

# @app.route('/cal')
def calendarCall():
  print("in calendarCall")
  if 'credentials' not in flask.session:
    print("first")
    return flask.redirect(flask.url_for('oauth2callback'))
  credentials = client.OAuth2Credentials.from_json(flask.session['credentials'])
  if credentials.access_token_expired:
    print("second")
    return flask.redirect(flask.url_for('oauth2callback'))
  else:
    print("third")
    http_auth = credentials.authorize(httplib2.Http())
    calendar = discovery.build('calendar', 'v3', http_auth)

    #TODO change this to the dates entered from the generateSchedule screen
    now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
    d = datetime.timedelta(days=7)
    end = (datetime.datetime.utcnow() + d).isoformat() + 'Z'
    endDate = datetime.datetime.now()

    print("Getting the next week's events")
    studentWorkers = ['chriia01@luther.edu', 'nguyli03@luther.edu', 'hermaa02@luther.edu', 'davial02@luther.edu', 'millro04@luther.edu','hangde01@luther.edu', 'css@luther.edu']
    for studentId in studentWorkers:
      eventsResult = calendar.events().list(
        calendarId=studentId, timeMin=now, timeMax=end, singleEvents=True,
        orderBy='startTime').execute()
      events = eventsResult.get('items', [])
      i = 0
      for event in events: 
        if i==0:
          print(studentId, "'s first event")
          print("start: ",event['start']['dateTime'])
          print('end: ', event['end']['dateTime'])
          i = 1
          #TODO add event to database 
    #print("EVENTS", events)
    return json.dumps(eventsResult)


# @app.route('/oauth2callback')
def mainOauth2callback():
  print("in callback")
  curr_dir = os.path.dirname(os.path.realpath(__file__))
  security_path = os.path.join(curr_dir, 'security')
  cred_path =  os.path.join(security_path,
                                   'client_secrets.json')
  #print("cred_path", cred_path)
  #print('BEFORE FLOW')
  #print("redirect_uri=flask.url_for('oauth2callback', _external=True)",flask.url_for('oauth2callback', _external=True))
  flow = client.flow_from_clientsecrets(
    cred_path,
    scope='https://www.googleapis.com/auth/calendar.readonly',
    redirect_uri=flask.url_for('oauth2callback', _external=True))
  #print('AFTER FLOW')
  if 'code' not in flask.request.args:
    print("no code")
    auth_uri = flow.step1_get_authorize_url()
    return flask.redirect(auth_uri)
  else:
    print("there was a code!")
    auth_code = flask.request.args.get('code')
    credentials = flow.step2_exchange(auth_code)
    flask.session['credentials'] = credentials.to_json()
    return flask.redirect(flask.url_for('index'))


if __name__ == '__main__':
  #import uuid
  #app.secret_key = str(uuid.uuid4())
  calendarCall()
  # app.debug = False
  # app.run()
