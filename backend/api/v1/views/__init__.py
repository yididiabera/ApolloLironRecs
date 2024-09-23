#!/usr/bin/python3
from flask import Blueprint

app_view = Blueprint("app_view", __name__, url_prefix="/api/v1")


from api.v1.views.users import *
from api.v1.views.user_playlists import *
from api.v1.views.albums import *
from api.v1.views.search import *
from api.v1.views.playlist_tracks import *
from api.v1.views.tracks import *
from api.v1.views.artists import *
from api.v1.views.lyrics import *
from api.v1.views.genre import *