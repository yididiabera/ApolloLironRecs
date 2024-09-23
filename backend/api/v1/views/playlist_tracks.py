#!/usr/bin/python3
from api.v1.views import app_view
from flask import request, jsonify
from models.track import Track
from models import storage


@app_view.route("/users/<user_id>/playlists/<playlist_id>/tracks", methods=["GET"])
def get_playlist_tracks(user_id, playlist_id):
    '''Get playlist tracks route'''

    user = storage.get("User", user_id, None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    playlist = storage.get("Playlist", playlist_id, None)
    if not playlist:
        return jsonify({"error": "Playlist not found"}), 404
    
    tracks = playlist.musics
    tracks_list = []

    for track in tracks:
        tracks_list.append(track.to_dict())
    
    return jsonify(tracks_list)


@app_view.route("/users/<user_id>/playlists/<playlist_id>/tracks/add_track", methods=["POST"])
def add_track_to_playlist(user_id, playlist_id):
    '''Add track to playlist route'''

    user = storage.get("User", user_id, None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    playlist = storage.get("Playlist", playlist_id, None)
    if not playlist:
        return jsonify({"error": "Playlist not found"}), 404

    data = request.get_json()

    track_id = data.get("trackId")

    if not track_id:
        return jsonify({"error": "Missing data"}), 400

    if track_id in [track.id for track in playlist.musics]:
        return jsonify({"error": "Track already in playlist"}), 400
    
    track = storage.get('Track', track_id, None)
    if track:
        new_track = track
        playlist.musics.append(new_track)
    else:
        new_track = Track(id=track_id)
        playlist.musics.append(new_track)

    try:
        new_track.save_db()
    except Exception as e:
        return jsonify({"error": "Could not add track to playlist"}), 400

    return jsonify({"message": "Track added to playlist"}), 201

@app_view.route("/users/<user_id>/playlists/<playlist_id>/tracks/<track_id>", methods=["DELETE"])
def delete_track_from_playlist(user_id, playlist_id, track_id):
    '''Delete track from playlist route'''

    user = storage.get("User", user_id, None)
    if not user:
        return jsonify({"error": "User not found"}), 404

    playlist = storage.get("Playlist", playlist_id, None)
    if not playlist:
        return jsonify({"error": "Playlist not found"}), 404

    track = storage.get("Track", track_id, None)
    if not track:
        return jsonify({"error": "Track not found"}), 404

    if track not in playlist.musics:
        return jsonify({"error": "Track not in playlist"}), 400

    try:
        playlist.musics.remove(track)
        track.delete()
    except Exception as e:
        return jsonify({"error": "Could not delete track from playlist"}), 400

    return jsonify({"message": "Track deleted from playlist"}), 200