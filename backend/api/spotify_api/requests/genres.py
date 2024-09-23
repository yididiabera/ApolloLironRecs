#!/usr/bin/python3
from api.spotify_api.config import spotify_auth
import json
import requests


class GetGenres:
    def genres(self):
        url = "https://api.spotify.com/v1/recommendations/available-genre-seeds"
        headers = spotify_auth.get_auth_header()

        result = requests.get(url, headers=headers)
        json_result = json.loads(result.content)
        
        return json_result


get_genres = GetGenres()
