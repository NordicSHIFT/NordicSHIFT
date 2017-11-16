import os
import flask

import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery

def calendarCall():
  if 'credentials' not in flask.session: 
    return flask.redirect('authorize')

  credentials = google.oauth2.credentials.Credentials(
      **flask.session['credentials'])

  calendar = googleapiclient.discovery.build('calendar', 'v3', credentials=credentials)

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
  return flask.jsonify(eventsResult)

def mainAuthorize(): 
  print("in mainAuthorize")
  curr_dir = os.path.dirname(os.path.realpath(__file__))
  security_path = os.path.join(curr_dir, 'security')
  client_secrets_file =  os.path.join(security_path,'client_secrets.json')
  flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      client_secrets_file, scopes=['https://www.googleapis.com/auth/calendar.readonly'])

  flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

  authorization_url, state = flow.authorization_url(
      # Enable offline access so that you can refresh an access token without
      # re-prompting the user for permission. Recommended for web server apps.
      access_type='offline',
      # Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes='true')

  flask.session['state'] = state
  print("line before return flask.redirect(authorization_url)")
  print(flask.redirect(authorization_url))
  response = flask.redirect(authorization_url)
  response.headers.add('Access-Control-Allow-Origin', '*')
  print("response: ", response)
  return response

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

  return flask.redirect(flask.url_for('index'))


def credentials_to_dict(credentials):
  return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}