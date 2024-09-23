#!/usr/bin/python3
import requests
from dotenv import load_dotenv
from os import getenv
import base64
import json
import time


load_dotenv()

CLIENT_ID = getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = getenv("SPOTIFY_CLIENT_SECRET")

class SpotifyAuth:
    def __init__(self):
        self.token = None
        self.token_expiers = 0
    
    def get_token(self):
        if self.token is None or self.token_is_expired():
            self.refresh_token()
        
        return self.token

    def token_is_expired(self):
        return time.time() > self.token_expiers
    
    def refresh_token(self):
        auth_string = CLIENT_ID + ":" + CLIENT_SECRET
        auth_bytes = auth_string.encode("utf-8")
        auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

        url = "https://accounts.spotify.com/api/token"
        headers = {
            "Authorization": "Basic " + auth_base64,
            "Content-Type": "application/x-www-form-urlencoded"
        }
        data = {
            "grant_type": "client_credentials"
        }

        result = requests.post(url, headers=headers, data=data)
        json_result = json.loads(result.content)
        self.token = json_result["access_token"]
        
        expires_in = json_result["expires_in"] #usually 3600 seconds
        self.token_expiers = time.time() + expires_in - 60
    
    def get_auth_header(self):
        return {
            "Authorization": "Bearer " + self.get_token()
        }


spotify_auth = SpotifyAuth()