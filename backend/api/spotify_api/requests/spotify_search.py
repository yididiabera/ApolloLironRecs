#!/usr/bin/python3
from api.spotify_api.config import spotify_auth
import requests
import json

class SpotifySearch:
    def search(self, query_user, search_types, limit=1):
        url = "https://api.spotify.com/v1/search"
        headers = spotify_auth.get_auth_header()

        search_type_str = ",".join(search_types)

        params = {
            "q": query_user,
            "type": search_type_str,
            "limit": limit,
        }

        result = requests.get(url, headers=headers, params=params)

        if result.status_code != 200:
            return {"error": "Failed to retrieve data"}

        json_result = json.loads(result.content)
        search_results = {}

        for search_type in search_types:
            final_items = []
            items = json_result.get(search_type + 's', {}).get('items', [])
            for item in items:
                if item is None:
                    continue

                # Extracting values with safety checks
                item_id = item.get("id")
                name = item.get("name")
                duration = item.get("duration_ms")
                followers = item.get("followers", {}).get("total")
                genres = item.get("genres", [])
                if search_type == 'track':
                    images = item.get("album", {}).get("images", [])[1].get("url") if item.get("album") else None
                    artists = item.get('artists')
                else:
                    images = item.get("images", [])[0].get("url") if item.get("images") else None

                spotify_link = item.get("external_urls", {}).get("spotify")

                final_items.append({
                    "id": item_id,
                    "name": name,
                    "duration": duration,
                    "followers": followers,
                    "genres": genres,
                    "type": search_type,
                    "images": images,
                    "spotify_link": spotify_link,
                    "artists": artists,
                })
            search_results[search_type + 's'] = final_items

        return search_results

spotify_search = SpotifySearch()
