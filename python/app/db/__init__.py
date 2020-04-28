import os
import json
import datetime
from bson.objectid import ObjectId
from flask import Flask
from flask_pymongo import PyMongo


class JSONEncoder(json.JSONEncoder):
    ''' extend json-encoder class'''

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        if isinstance(o, bytes):
            return str(o)
        return json.JSONEncoder.default(self, o)


# create the flask object
app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost:27017/todo'
mongo = PyMongo(app)

app.json_encoder = JSONEncoder
