import json

import flask
import httplib2
import os
import datetime

from googleapiclient import discovery
from oauth2client import client

from app import app
# app = flask.Flask(__name__)
# app routes don't seem to work if they are imported

@app.route('/cal')
def calendarCall():
  print("in index")
  if 'credentials' not in flask.session:
    print("if 'credentials'")
    return flask.redirect(flask.url_for('oauth2callback'))
  credentials = client.OAuth2Credentials.from_json(flask.session['credentials'])
  if credentials.access_token_expired:
    print("if expired")
    return flask.redirect(flask.url_for('oauth2callback'))
  else:
    print("get creds")
    http_auth = credentials.authorize(httplib2.Http())
    calendar = discovery.build('calendar', 'v3', http_auth)

    now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
    d = datetime.timedelta(days=7)
    end = (datetime.datetime.utcnow() + d).isoformat() + 'Z'
    endDate = datetime.datetime.now()

    print("Getting the next week's events")

    eventsResult = calendar.events().list(
        calendarId='nguyli03@luther.edu', timeMin=now, timeMax=end, singleEvents=True,
        orderBy='startTime').execute()
    events = eventsResult.get('items', [])
    return json.dumps(eventsResult)


@app.route('/oauth2callback')
def mainOauth2callback():
  print("in callback")
  curr_dir = os.path.dirname(os.path.realpath(__file__))
  security_path = os.path.join(curr_dir, 'security')
  cred_path =  os.path.join(security_path,
                                   'client_secrets.json')
  flow = client.flow_from_clientsecrets(
    cred_path,
    scope='https://www.googleapis.com/auth/calendar.readonly',
    redirect_uri=flask.url_for('oauth2callback', _external=True))
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
  import uuid
  app.secret_key = str(uuid.uuid4())
  app.debug = False
  app.run()
