#!/usr/bin/python3
import uuid
from datetime import datetime


t_format = "%Y-%m-%dT%H:%M:%S"

class BaseModel:
    def __init__(self):
        self.id = str(uuid.uuid4())
        self.created_at = datetime.utcnow().strftime(t_format)
    
    def __str__(self):
        class_info = ""

        for key, value in self.__dict__.items():
            if key == "_sa_instance_state":
                continue
            class_info += "{}: {}\n".format(key, value)
        
        return class_info

    
    def to_dict(self):
        dir = {}

        for key, value in self.__dict__.items():
            if key == "_sa_instance_state" or key == "password":
                continue
            dir[key] = value

        return dir
    
    def save_db(self):
        from models import storage
        storage.new(self)
        storage.save()
    
    def delete(self):
        from models import storage
        storage.delete(self)
        storage.save()
