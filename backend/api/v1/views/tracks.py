#!/usr/bin/python3
from api.v1.views import app_view
from flask import request, jsonify
from api.spotify_api.requests.track import track, recommendations


@app_view.route('/tracks/<track_id>', methods=['GET'])
def get_track_from_spotify(track_id):
    track_data = track.get_track(track_id)
    if "error" in track_data:
        return jsonify({"error": "Failed to retrieve data"}), 500

    return jsonify(track_data)

@app_view.route('/tracks/recommendations', methods=['POST'])
def get_recommendations_from_spotify():
    data = request.get_json()

    seed_artists = data.get("seedArtists", [])
    seed_genres = data.get("seedGenres", [])
    seed_tracks = data.get("seedTracks", [])

    if len(seed_artists) == 0 and  len(seed_tracks) == 0:
        if len(seed_genres) == 0:
            return jsonify({"error": "Missing data"}), 400
        
        recommendations_data = recommendations.get_recommendation_genre(seed_genres)
    else:
        recommendations_data = recommendations.get_recommendation(seed_artists, seed_genres, seed_tracks)
    
    if "error" in recommendations_data:
        return jsonify({"error": "Failed to retrieve data"}), 500

    return jsonify(recommendations_data)