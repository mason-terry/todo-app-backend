from flask import Blueprint, request
from flask_cors import CORS
from bson.json_util import dumps
from app.db import mongo


bp = Blueprint('users', __name__, url_prefix='/users')
CORS(bp)


@bp.route('/', methods=['GET'])
def users():
    users = mongo.db.users.find({})
    res = dumps(users)
    return res, 200


@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        user = mongo.db.users.find_one({'username': username})
        if user == None:
            return {'success': False, 'message': 'We could not find anyone with that username'}, 200

        return {'success': True, 'user': user}, 200
