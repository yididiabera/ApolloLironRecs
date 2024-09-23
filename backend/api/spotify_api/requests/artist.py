#!/usr/bin/python3
from api.spotify_api.config import spotify_auth
import requests
import json


class GetArtist:
    def get_artist(self, artist_id):
        url = "https://api.spotify.com/v1/artists/" + artist_id
        headers = spotify_auth.get_auth_header()

        result = requests.get(url, headers=headers)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        artist_content = {}

        artist_content["id"] = json_result["id"]
        artist_content["name"] = json_result["name"]
        artist_content["genres"] = json_result["genres"]
        artist_content["images"] = json_result.get("images", [])[0].get("url") if json_result.get("images", []) else None
        artist_content["followers"] = json_result["followers"]["total"]
        artist_content["spotif_link"] = json_result["external_urls"]["spotify"]

        return artist_content
    
    def get_artist_albums(self, artist_id, limit=20):
        url = "https://api.spotify.com/v1/artists/" + artist_id + "/albums"
        headers = spotify_auth.get_auth_header()

        params = {
            "limit": limit,
            "include_groups": "album,single",
        }

        result = requests.get(url, headers=headers, params=params)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        albums_content = []

        for album in json_result.get("items", []):
            albums_content.append({
                "id": album["id"],
                "name": album["name"],
                "type": album["album_type"],
                "release_date": album["release_date"],
                "total_tracks": album.get("total_tracks"),
                "spotify_link": album.get("external_urls", {}).get("spotify"),
                "images": album.get("images", [])[0].get("url") if album.get("images", []) else None,
            })

        return albums_content
    
    def get_artist_top_tracks(self, artist_id, country="US"):
        url = "https://api.spotify.com/v1/artists/" + artist_id + "/top-tracks"
        headers = spotify_auth.get_auth_header()

        params = {
            "country": country,
        }

        result = requests.get(url, headers=headers, params=params)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)["tracks"]

        top_tracks = []

        for track in json_result:
            top_tracks.append({
                "id": track["id"],
                "name": track["name"],
                "track_number": track["track_number"],
                "explicit": track["explicit"],
                "duration": track["duration_ms"],
                "spotify_link": track["external_urls"]["spotify"],
                "preview_url": track["preview_url"],
                "images": track.get("album", {}).get("images", [])[0].get("url") if track.get("album", {}).get("images", []) else None,
                "artists": [
                    {
                        "id": artist["id"],
                        "name": artist["name"],
                        "spotify_link": artist["external_urls"]["spotify"],
                    } for artist in track.get("artists", [])
                ]
            })

        return top_tracks
    
    def get_artist_related_artists(self, artist_id):
        url = "https://api.spotify.com/v1/artists/" + artist_id + "/related-artists"
        headers = spotify_auth.get_auth_header()

        result = requests.get(url, headers=headers)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)["artists"]

        related_artists = []

        for artist in json_result:
            related_artists.append({
                "id": artist["id"],
                "name": artist["name"],
                "genres": artist["genres"],
                "images": artist.get("images", [])[0].get("url") if artist.get("images", []) else None,
                "followers": artist["followers"]["total"],
                "spotify_link": artist["external_urls"]["spotify"],
            })

        return related_artists

artist = GetArtist()