#!/usr/bin/python3
'''Lyrics routes'''
from api.v1.views import app_view
from flask import request, jsonify
import lyricsgenius
from dotenv import load_dotenv
import os
import time

load_dotenv()
GENIUS_TOKEN = os.getenv("GENIUS_TOKEN")

@app_view.route("/lyrics", methods=["POST"])
def get_lyrics():
    data = request.get_json()

    artist_name = data.get("artistName")
    song_name = data.get("songName")

    genius = lyricsgenius.Genius(GENIUS_TOKEN)
    attempt = 0
    max_attempts = 5
    song = None

    while attempt < max_attempts:
        try:
            song = genius.search_song(song_name, artist_name)
            if song:
                song_lyrics = song.lyrics

                start_index = song_lyrics.find("Lyrics")
                lyrics = song_lyrics[start_index:]
                return jsonify({"lyrics": lyrics})
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {str(e)}")
            time.sleep(2 ** attempt)  # Exponential backoff
            attempt += 1

    return jsonify({"error": "Failed to retrieve lyrics after several attempts"}), 500
