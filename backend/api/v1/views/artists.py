#!/usr/bin/python3
'''Artists routes'''
from api.v1.views import app_view
from api.spotify_api.requests.artist import artist
from flask import request, jsonify


@app_view.route("/artists/<artist_id>", methods=["GET"])
def get_artist(artist_id):
    '''Get artist route'''

    artist_data = artist.get_artist(artist_id)
    if "error" in artist_data:
        return jsonify({"error": "Failed to retrieve data"}), 500

    return jsonify(artist_data)

@app_view.route("/artists/<artist_id>/albums", methods=["GET"])
def get_artist_albums(artist_id):
    '''Get artist albums route'''

    limit = request.args.get("limit", 20)
    artist_albums = artist.get_artist_albums(artist_id, limit)
    if "error" in artist_albums:
        return jsonify({"error": "Failed to retrieve data"}), 500

    return jsonify(artist_albums)

@app_view.route("/artists/<artist_id>/top-tracks", methods=["GET"])
def get_artist_top_tracks(artist_id):
    '''Get artist top tracks route'''

    artist_top_tracks = artist.get_artist_top_tracks(artist_id)
    if "error" in artist_top_tracks:
        return jsonify({"error": "Failed to retrieve data"}), 500

    return jsonify(artist_top_tracks)

@app_view.route("/artists/<artist_id>/related-artists", methods=["GET"])
def get_related_artists(artist_id):
    '''Get related artists route'''

    related_artists = artist.get_artist_related_artists(artist_id)
    if "error" in related_artists:
        return jsonify({"error": "Failed to retrieve data"}), 500

    return jsonify(related_artists)