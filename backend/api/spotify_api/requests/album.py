#!/usr/bin/python3
'''Get album data from Spotify API'''
from api.spotify_api.config import spotify_auth
import json
import requests


class GetAlbum:
    def get_album(self, album_id):
        '''Get album data from Spotify API'''
        url = "https://api.spotify.com/v1/albums/" + album_id
        headers = spotify_auth.get_auth_header()

        result = requests.get(url, headers=headers)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)

        album_content = {}
        tracks = []

        for track in json_result.get("tracks", {}).get("items", []):
            tracks.append({
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
                ]
            })
        
        album_content['name'] = json_result.get("name")
        album_content['release_date'] = json_result.get("release_date")
        album_content["total_tracks"] = json_result.get("total_tracks")
        album_content["spotify_link"] = json_result.get("external_urls", {}).get("spotify")
        album_content["images"] = json_result.get("images", [])[0].get("url") if json_result.get("images", []) else None
        album_content["artists"] = [
            {
                "id": artist.get("id"),
                "name": artist.get("name"),
                "spotify_link": artist.get("external_urls", {}).get("spotify"),
            } for artist in json_result.get("artists", [])
        ]
        album_content["tracks"] = tracks

        return album_content
    
    # def get_album_tracks(self, album_id, limit=20):
    #     '''Get album tracks from Spotify API'''
    #     url = "https://api.spotify.com/v1/albums/" + album_id + "/tracks"
    #     headers = spotify_auth.get_auth_header()

    #     params = {
    #         "limit": limit,
    #     }

    #     result = requests.get(url, headers=headers, params=params)

    #     if result.status_code != 200:
    #         return {"error": "Faild to retrive data"}

    #     json_result = json.loads(result.content)

    #     return json_result
    
    def get_new_release_albums(self, limit=20):
        '''Get new release albums from Spotify API'''
        url = "https://api.spotify.com/v1/browse/new-releases"
        headers = spotify_auth.get_auth_header()

        params = {
            "limit": limit,
        }

        result = requests.get(url, headers=headers, params=params)

        if result.status_code != 200:
            return {"error": "Faild to retrive data"}

        json_result = json.loads(result.content)
        items = json_result["albums"]["items"]

        new_releases = []

        for item in items:
            new_releases.append({
                "id": item.get("id"),
                "name": item.get("name"),
                "release_date": item.get("release_date"),
                "total_tracks": item.get("total_tracks"),
                "images": item.get("images", [])[0].get("url") if item.get("images", []) else None,
                "external_urls": item.get("external_urls", {}).get("spotify"),
                "artists": [
                    {
                        "id": artist.get("id"),
                        "name": artist.get("name"),
                        "spotify_link": artist.get("external_urls", {}).get("spotify"),
                    } for artist in item.get("artists", [])
                ],
            })

        return new_releases


album = GetAlbum()