from flask import Blueprint, request, jsonify
from flask_cors import CORS
from bson.json_util import dumps
from app.db import mongo
from bcrypt import hashpw, checkpw, gensalt
import jwt
import base64

bp = Blueprint('users', __name__, url_prefix='/users')
CORS(bp)


@bp.route('/<string:user_id>', methods=['GET'])
def user(user_id):
    user = mongo.db.users.find_one({'_id': user_id})
    res = dumps(user)
    return res, 200


@bp.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    user = mongo.db.users.find_one({'username': username})
    user_id = dumps(user['_id'])
    if user is None:
        return {'success': False, 'message': 'We could not find anyone with that username'}, 200

    pw_check = checkpw(password.encode('utf8'),
                       user['password'].encode('utf8'))

    if pw_check is True:
        token = jwt.encode({'user_id': user_id}, 'ocuqpvgtta',
                           algorithm='HS256').decode('utf8')
        return {'success': True, 'message': 'User successfully logged in!', 'user': user, 'token': token}, 200
    else:
        return {'success': False, 'message': 'The password you entered is not correct'}, 200


@bp.route('/verify', methods=['GET'])
def verify():
    token = request.headers['Token']
    verified = jwt.decode(token, 'ocuqpvgtta', algorithms=['HS256'])
    print('verified', verified)
    # user = mongo.db.users.find_one(
    # {'_id': dumps(verified['user_id']['user_id'])})
    # print('user', user)
    if verified:
        return {'success': True, 'message': 'User successfully logged in!', 'user': user}, 200
    else:
        return {'success': False, 'message': 'Your token does not seem to be valid'}, 404
