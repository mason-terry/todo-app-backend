''' flask app with mongo '''
from app.controllers import *
import os
import json
import datetime
from bson.objectid import ObjectId
from flask import Flask
from flask_pymongo import PyMongo


class JSONEncoder(json.JSONEncoder):
    ''' extend json-encoder class '''

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncode.default(self, o)


''' create flask object '''
app = Flask(__name__)

''' add mongo url to flask config to make connection '''
# app.config['MONGO_URI'] = os.environ.get('DB')
app.config['MONGO_URI'] = 'mongodb://mongodb27017/todo'
mongo = PyMongo(app)

''' use the modified encoder class to handl ObjectId & datetime object while jsonifying the response '''
app.json_encoder = JSONEncoder
