# [START calendar_quickstart]
import datetime
# import os.path

from flask import jsonify, json
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from datetime import timedelta

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar"]


def get_events(access_token, dateStr): #Todos os eventos da data
  """Shows basic usage of the Google Calendar API.
  Prints the start and name of the next 10 events on the user's calendar.
  """
  # creds = None
  # The file token.json stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  # if os.path.exists("token.json"):
  #   creds = Credentials.from_authorized_user_file("token.json", SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  # if not creds or not creds.valid:
  #   if creds and creds.expired and creds.refresh_token:
  #     creds.refresh(Request())
  #   else:
  #     flow = InstalledAppFlow.from_client_secrets_file(
  #         "credentials.json", SCOPES
  #     )
  #     creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    # with open("token.json", "w") as token:
    #   token.write(creds.to_json())
  
  try:
    info = json.loads(access_token)
    creds = build_credentials(info)
    service = build("calendar", "v3",credentials=creds)

    base_date = datetime.datetime.strptime(dateStr, "%Y-%m-%d")
    tz = datetime.timezone(datetime.timedelta(hours=-3))
    start_time = base_date.replace(tzinfo=tz)
    end_time = start_time + datetime.timedelta(days=1)

    # Call the Calendar API
    # now = datetime.datetime.now(tz=datetime.timezone.utc-3).isoformat()
    # print("Getting the upcoming 10 events")
    events_result = (
        service.events()
        .list(
            calendarId="primary",
            timeMin=start_time.isoformat(),
            timeMax=end_time.isoformat(),
            q="Consulta com",
            maxResults=30,
            singleEvents=True,
            orderBy="startTime",
        )
        .execute()
    )
    events = events_result.get("items", [])

    if not events:
      print("No upcoming events found.")
      return jsonify({"status": "success", "events": []})
    
    return jsonify({"status": "success", "events": events})

    # for event in events:
    #   start = event["start"].get("dateTime", event["start"].get("date"))
    #   print(start, event["summary"])
  except HttpError as error:
    print(f"An error occurred: {error}")

def next_event(access_token):
  try:
    info = json.loads(access_token)
    creds = build_credentials(info)
    service = build("calendar", "v3",credentials=creds)
    now = datetime.datetime.now(tz=datetime.timezone(datetime.timedelta(hours=-3))).isoformat()
    events_result = (service.events().list(
      calendarId="primary",
      timeMin=now,
      q="Consulta com",
      orderBy="startTime",
      maxResults=1,
      singleEvents=True,
      ).execute()
    )
    next_event = events_result.get("items", [])
    
    return next_event
  except HttpError as error:
    print(f"An error occurred: {error}")

def get_specific_event(access_token, event_id): #Apenas um eventos
  
  try:
    info = json.loads(access_token)
    creds = build_credentials(info)
    service = build("calendar", "v3",credentials=creds)

    # base_date = datetime.datetime.strptime(dateStr, "%Y-%m-%d")
    # tz = datetime.timezone(datetime.timedelta(hours=-3))
    # start_time = base_date.replace(tzinfo=tz)
    # end_time = start_time + datetime.timedelta(days=1)
    event_result = (
        service.events()
        .get(
            calendarId="primary",
            eventId=event_id
        )
        .execute()
    )
    event = event_result
    
    return event
  
  except HttpError as error:
    print(f"An error occurred: {error}")

def obtain_credentials(access_token):
  if not access_token or not access_token.valid:
    if access_token and access_token.expired and access_token.refresh_token:
      access_token.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          "credentials.json", SCOPES
      )
      access_token = flow.run_local_server(port=0)
    # Save the credentials for the next run
    google_access_token = access_token.to_json()
  return google_access_token

def delete_event(access_token, event_id):
  try:
    info = json.loads(access_token)
    creds = build_credentials(info)
    service = build("calendar", "v3",credentials=creds)
    service.events().delete(
      calendarId="primary",
      eventId=event_id,
      sendUpdates="all"
    ).execute()
    
    return jsonify({"status": "success", "event_id_deleted": event_id})
  
  except HttpError as error:
    print(f"An error occurred: {error}")


def add_event(access_token,event_data):
  try:
    info = json.loads(access_token)
    creds = build_credentials(info)
    service = build("calendar", "v3",credentials=creds)
    supabase_time = event_data['horario']
    if len(supabase_time) > 5:
      supabase_time = supabase_time[:5]
    combined_str = f"{event_data['data']} {supabase_time}"
    start_datetime = datetime.datetime.strptime(combined_str,"%Y-%m-%d %H:%M")
    duration_minutes = int(event_data['duracao'])
    end_datetime = start_datetime + timedelta(minutes=duration_minutes)

    start_iso = start_datetime.strftime("%Y-%m-%dT%H:%M:%S")
    end_iso = end_datetime.strftime("%Y-%m-%dT%H:%M:%S")
    timezone_str = "America/Sao_Paulo"

    recurrence_variable = []
    if event_data.get('recorrencia') and str(event_data['recorrencia']).lower() not in ['no', 'false', 'none']:
      recurrence_variable = ['RRULE:FREQ=WEEKLY;COUNT=4']
    event = {
      'summary': 'Consulta com ' + event_data['paciente'],
      'start': {
        'dateTime': start_iso,
        'timeZone': timezone_str,
      },
      'end': {
        'dateTime': end_iso,
        'timeZone': timezone_str,
      },
      'recurrence': [
        recurrence_variable if recurrence_variable else None,
      ],
      'reminders': {
        'useDefault': False,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10},
        ],
      },
    }

    event = service.events().insert(calendarId='primary', body=event).execute()
    print ('Event created: %s' % (event.get('htmlLink')))
    
    return jsonify({"status": "success"})
  
  except HttpError as error:
    print(f"An error occurred: {error}")

def patch_event(access_token,event_data):
  try:
    info = json.loads(access_token)
    creds = build_credentials(info)
    service = build("calendar", "v3",credentials=creds)
    supabase_time = event_data['horario']
    if len(supabase_time) > 5:
      supabase_time = supabase_time[:5]
    combined_str = f"{event_data['data']} {supabase_time}"
    start_datetime = datetime.datetime.strptime(combined_str,"%Y-%m-%d %H:%M")
    duration_minutes = int(event_data['duracao'])
    end_datetime = start_datetime + timedelta(minutes=duration_minutes)

    start_iso = start_datetime.strftime("%Y-%m-%dT%H:%M:%S")
    end_iso = end_datetime.strftime("%Y-%m-%dT%H:%M:%S")
    timezone_str = "America/Sao_Paulo"

    event = {
      'start': {
        'dateTime': start_iso,
        'timeZone': timezone_str,
      },
      'end': {
        'dateTime': end_iso,
        'timeZone': timezone_str,
      },
    }

    event = service.events().patch(calendarId='primary', eventId=event_data['id'], body=event).execute()
    print ('Event created: %s' % (event.get('htmlLink')))
    
    return jsonify({"status": "success"})
  
  except HttpError as error:
    print(f"An error occurred: {error}")

def build_credentials(info):
  creds = Credentials(
      token=info.get("access_token"),
      refresh_token=info.get("refresh_token"),
      token_uri=info.get("token_uri"),
      client_id=info.get("client_id"),
      client_secret=info.get("client_secret")
    )
  return creds

# if __name__ == "__main__":
#   main()
# [END calendar_quickstart]






