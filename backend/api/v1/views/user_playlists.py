#!/usr/bin/python3
'''User playlists routes'''
from api.v1.views import app_view
from flask import request, jsonify
from models import storage
from models.playlist import Playlist


# Get all playlists route
@app_view.route("/users/<user_id>/playlists", methods=["GET"])
def playlists(user_id):
    '''Get all playlists route'''

    user = storage.get("User", user_id, None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    all_playlists = storage.get("User", user_id, None).playlists
    playlists_list = []

    for playlist in all_playlists:
        playlists_list.append(playlist.to_dict())
    
    return jsonify(playlists_list)

# Create playlist route
@app_view.route("/users/<user_id>/playlists/create_playlist", methods=["POST"])
def create_playlist(user_id):
    '''Create playlist route'''

    user = storage.get("User", user_id, None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()

    name = data.get("name")
    description = data.get("description")

    if not name or not description:
        return jsonify({"error": "Missing data"}), 400

    new_playlist = Playlist(name=name, description=description, user_id=user_id)
    dic = new_playlist.to_dict()

    try:
        new_playlist.save_db()
    except:
        return jsonify({"error": "Could not create playlist"}), 400
    
    return jsonify(dic), 201

# Get playlist by id route
@app_view.route("/users/<user_id>/playlists/<playlist_id>", methods=["GET"])
def get_playlist(user_id, playlist_id):
    '''Get playlist by id route'''

    user = storage.get("User", user_id, None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    playlist = storage.get("Playlist", playlist_id, None)

    if not playlist:
        return jsonify({"error": "Playlist not found"}), 404

    return jsonify(playlist.to_dict())

# Delete playlist route
@app_view.route("/users/<user_id>/playlists/<playlist_id>", methods=["DELETE"])
def delete_playlist(user_id, playlist_id):
    '''Delete playlist by id route'''

    user = storage.get("User", user_id, None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    playlist = storage.get("Playlist", playlist_id, None)

    if not playlist:
        return jsonify({"error": "Playlist not found"}), 404
    
    if playlist.name == "Liked Songs":
        return jsonify({"error": "Cannot delete Liked Songs playlist"}), 400

    try:
        user.playlists.remove(playlist)
        playlist.delete()
    except:
        return jsonify({"error": "Could not delete playlist"}), 400
    
    return jsonify({"message": "Playlist Deleted!"}), 200

# Update playlist route
@app_view.route("/users/<user_id>/playlists/<playlist_id>", methods=["PATCH"])
def update_playlist(user_id, playlist_id):
    '''Update playlist by id route'''

    user = storage.get("User", user_id, None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    playlist = storage.get("Playlist", playlist_id, None)

    if not playlist:
        return jsonify({"error": "Playlist not found"}), 404

    data = request.get_json()

    name = data.get("name", playlist.name)
    description = data.get("description", playlist.description)
    
    playlist.id = playlist_id
    playlist.name = name
    playlist.description = description
    
    dic = playlist.to_dict()

    try:
        playlist.save_db()
    except:
        return jsonify({"error": "Could not update playlist"}), 400
    
    return jsonify(dic), 200


# create liked song playlist
@app_view.route("/users/<user_id>/playlists/create_liked_songs_playlist", methods=["POST"])
def create_liked_songs_playlist(user_id):
    '''Create liked songs playlist route'''
    data = request.get_json()
    
    id = data.get("id")
    if not id:
        return jsonify({"error": "Missing data"}), 400

    user = storage.get("User", user_id, None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    for playlist in user.playlists:
        if playlist.name == "Liked Songs":
            return jsonify(playlist.to_dict()), 200

    liked_songs_playlist = Playlist(id=id, name="Liked Songs", description="Your liked songs playlist", user_id=user_id)
    dic = liked_songs_playlist.to_dict()

    try:
        liked_songs_playlist.save_db()
    except:
        return jsonify({"error": "Could not create liked songs playlist"}), 400
    
    return jsonify(dic), 201