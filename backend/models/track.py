#!/usr/bin/python3
from config import db
from models.base_model import BaseModel


class Track(BaseModel, db.Model):
    __tablename__ = "Track"

    id = db.Column(db.String(60), primary_key=True)

    def __init__(self, *args, **kwargs):
        super().__init__()
        for key, value in kwargs.items():
            setattr(self, key, value)