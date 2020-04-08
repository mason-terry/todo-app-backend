from flask import Blueprint, request
from flask_cors import CORS
from bson.json_util import dumps
from app.db import mongo
from bcrypt import hashpw, checkpw, gensalt


bp = Blueprint('users', __name__, url_prefix='/users')
CORS(bp)


@bp.route('/', methods=['GET'])
def users():
    users = mongo.db.users.find({})
    res = dumps(users)
    return res, 200


@bp.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    user = mongo.db.users.find_one({'username': username})
    if user == None:
        return {'success': False, 'message': 'We could not find anyone with that username'}, 200

    # pw_check = checkpw(password, user['password'])
    print('=' * 20)
    # print('pw_check', pw_check)
    print('password in db', user['password'])
    print('password from user', password)
    print('=' * 20)

    return {'success': True, 'user': user}, 200
