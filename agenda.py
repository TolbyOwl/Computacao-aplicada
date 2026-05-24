# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START calendar_quickstart]
import datetime
import os.path

from flask import jsonify, json
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]


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
    print("done1")
    service.events().delete(
      calendarId="primary",
      eventId=event_id,
      sendUpdates="all"
    ).execute()
    print("done2")
    
    return jsonify({"status": "success", "event_id_deleted": event_id})
  
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






