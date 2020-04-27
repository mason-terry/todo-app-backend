from flask import Blueprint, request, jsonify
from flask_cors import CORS
from bson.json_util import dumps
from app.db import mongo
from bcrypt import hashpw, checkpw, gensalt
import jwt

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
    if user is None:
        return {'success': False, 'message': 'We could not find anyone with that username'}, 200

    pw_check = checkpw(password.encode('utf8'),
                       user['password'].encode('utf8'))

    if pw_check is True:
        token = jwt.encode(
            {'username': user['username']}, 'ocuqpvgtta', algorithm='HS256')
        print('token', token)
        token_formatted = token
        return {'success': True, 'message': 'User successfully logged in!', 'user': user, 'token': token_formatted}, 200
    else:
        return {'success': False, 'message': 'The password you entered is not correct'}, 200


@bp.route('/verify', methods=['GET'])
def verify():
    token = request.headers['token']
    print('token', token)
    verified = jwt.decode(token, 'ocuqpvgtta', algorithms=['HS256'])
    return {'success': True, 'message': 'User successfully logged in!', 'user': verified}, 200
