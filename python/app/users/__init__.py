from flask import Blueprint, jsonify, request
from bson.json_util import dumps
from app.db import mongo

bp = Blueprint('users', __name__, url_prefix='/users')


@bp.route('/', methods=['GET'])
def users():
    users = mongo.db.users.find({})
    res = dumps(users)
    return jsonify(res), 200
