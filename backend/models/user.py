#!/usr/bin/python3
import bcrypt
from models.base_model import BaseModel
from config import db


class User(BaseModel, db.Model):
    __tablename__ = "User"

    id = db.Column(db.String(60), primary_key=True)
    email = db.Column(db.String(60), unique=True, nullable=False)
    full_name = db.Column(db.String(60), nullable=False)
    image = db.Column(db.String(255), nullable=True)

    playlists = db.relationship("Playlist", backref="user", cascade="all, delete")

    def __init__(self, *args, **kwargs):
        super().__init__()
        for key, value in kwargs.items():
            if key == "password":
                value = self.hash_password(value)
            setattr(self, key, value)
    
    def hash_password(self, value):
        value = bcrypt.hashpw(value.encode(), bcrypt.gensalt())

        return value

    def verify_password(self, password):
        return bcrypt.checkpw(password.encode(), self.password)
