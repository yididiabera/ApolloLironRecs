#!/usr/bin/python3
from api.v1.views import app_view
from flask import request, jsonify
from api.spotify_api.requests.album import album


@app_view.route('/albums/<album_id>', methods=['GET'])
def get_album_from_spotify(album_id):
    album_data = album.get_album(album_id)
    if "error" in album_data:
        return jsonify({"error": "Failed to retrieve data"}), 500

    return jsonify(album_data)

@app_view.route('/albums/new-releases', methods=['GET'])
def get_new_releases_from_spotify():
    new_releases = album.get_new_release_albums()
    if "error" in new_releases:
        return jsonify({"error": "Failed to retrieve data"}), 500

    return jsonify(new_releases)