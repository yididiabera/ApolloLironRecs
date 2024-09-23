#!/usr/bin/python3
from api.v1.views import app_view
from flask import request, jsonify
from api.spotify_api.requests.spotify_search import spotify_search


@app_view.route('/search', methods=['POST'])
def search():
    data = request.get_json()

    search_type = data.get('searchType')
    search_query = data.get('searchQuery')
    limit = data.get('limit', 20)

    if not search_type or not search_query:
        return jsonify({"error": "Missing data"}), 400
    
    search_results = spotify_search.search(search_query, search_type, limit)

    return jsonify(search_results)

# Get genres route
@app_view.route('/genres', methods=['GET'])
def genres():
    from api.spotify_api.requests.genres import get_genres

    genres = get_genres.genres()

    return jsonify(genres)
