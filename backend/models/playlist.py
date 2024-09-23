#!/usr/bin.python3
from config import db
from models.base_model import BaseModel


playlist_track = db.Table('playlist_track',
    db.Column('playlist_id', db.String(60), db.ForeignKey('Playlist.id'), primary_key=True),
    db.Column('track_id', db.String(60), db.ForeignKey('Track.id'), primary_key=True)
)


class Playlist(BaseModel, db.Model):
    __tablename__ = "Playlist"

    id = db.Column(db.String(60), primary_key=True)
    name = db.Column(db.String(60), nullable=False, unique=True)
    description = db.Column(db.String(60), nullable=False)
    user_id = db.Column(db.String(60), db.ForeignKey("User.id"), nullable=False)
    musics = db.relationship("Track", secondary="playlist_track", backref="playlist")

    def __init__(self, *args, **kwargs):
        super().__init__()
        for key, value in kwargs.items():
            setattr(self, key, value)
