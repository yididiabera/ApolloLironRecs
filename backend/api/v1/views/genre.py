from api.v1.views import app_view
from api.spotify_api.requests.genres import get_genres
from flask import jsonify


@app_view.route('/genres', methods=['GET'])
def retrive_genres():
    return jsonify(get_genres.genres())