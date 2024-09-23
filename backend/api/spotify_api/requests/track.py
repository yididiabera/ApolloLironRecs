#!/usr/bin/python3
from api.spotify_api.config import spotify_auth
import json
import requests

class GetTrack:
    def get_track(self, track_id):
        url = "https://api.spotify.com/v1/tracks/" + track_id
        headers = spotify_auth.get_auth_header()

        result = requests.get(url, headers=headers)

        if result.status_code != 200:
            return {"error": "Failed to retrive data"}

        json_result = json.loads(result.content)

        track_content = {}

        track_content["album"] = {
            "id": json_result.get("album", {}).get("id"),
            "name": json_result.get("album", {}).get("name"),
            "images": json_result.get("album", {}).get("images", [])[0].get("url") if json_result.get("album", {}).get("images", []) else None,
            "spotify_link": json_result.get("album", {}).get("external_urls", {}).get("spotify"),
            "release_date": json_result.get("album", {}).get("release_date"),
            "artists": [
                {
                    "id": artist.get("id"),
                    "name": artist.get("name"),
                    "spotify_link": artist.get("external_urls", {}).get("spotify"),
                } for artist in json_result.get("album", {}).get("artists", [])
            ]
        }

        track_content["id"] = json_result.get("id")
        track_content["name"] = json_result.get("name")
        track_content["preview_url"] = json_result.get("preview_url")
        track_content["duration"] = json_result.get("duration_ms")
        track_content["track_number"] = json_result.get("track_number")
        track_content["spotify_link"] = json_result.get("external_urls", {}).get("spotify")
        track_content["explicit"] = json_result.get("explicit")
        track_content["album_name"] = json_result.get("album", {}).get("name")
        track_content["artists"] = [
            {
                "id": artist.get("id"),
                "name": artist.get("name"),
                "spotify_link": artist.get("external_urls", {}).get("spotify"),
            } for artist in json_result.get("artists", [])
        ]

        print(track_content["album_name"])
        return track_content

class GetRecommendation:
    def filter_recommendation(self, track):
        return {
            "id": track.get("id"),
            "name": track.get("name"),
            "preview_url": track.get("preview_url"),
            "duration": track.get("duration_ms"),
            "track_number": track.get("track_number"),
            "spotify_link": track.get("external_urls", {}).get("spotify"),
            "explicit": track.get("explicit"),
            "artists": [
                {
                    "id": artist.get("id"),
                    "name": artist.get("name"),
                    "spotify_link": artist.get("external_urls", {}).get("spotify"),
                } for artist in track.get("artists", [])
            ],
            "album": {
                "id": track.get("album", {}).get("id"),
                "name": track.get("album", {}).get("name"),
                "images": track.get("album", {}).get("images", [])[0].get("url") if track.get("album", {}).get("images", []) else None,
                "spotify_link": track.get("album", {}).get("external_urls", {}).get("spotify"),
                "release_date": track.get("album", {}).get("release_date"),
                "artists": [
                    {
                        "id": artist.get("id"),
                        "name": artist.get("name"),
                        "spotify_link": artist.get("external_urls", {}).get("spotify"),
                    } for artist in track.get("album", {}).get("artists", [])
                ]
            }
        }

    def get_recommendation(self, seed_artists, seed_genres, seed_tracks, limit=20):
        url = "https://api.spotify.com/v1/recommendations"
        headers = spotify_auth.get_auth_header()

        params = {
            "seed_artists": ",".join(seed_artists),
            "seed_genres": ",".join(seed_genres),
            "seed_tracks": ",".join(seed_tracks),
            "limit": limit,
        }

        result = requests.get(url, headers=headers, params=params)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)["tracks"]

        reccomendation_content = []

        for track in json_result:
            reccomendation_content.append(self.filter_recommendation(track))

        return reccomendation_content
    
    def get_recommendation_genre(self, seed_genres, limit=20):
        url = "https://api.spotify.com/v1/recommendations"
        headers = spotify_auth.get_auth_header()

        params = {
            "seed_genres": ",".join(seed_genres),
            "limit": limit,
        }

        result = requests.get(url, headers=headers, params=params)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)["tracks"]

        reccomendation_content = []

        for track in json_result:
            reccomendation_content.append(self.filter_recommendation(track))

        return reccomendation_content

track = GetTrack()
recommendations = GetRecommendation()