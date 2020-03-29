from flask import Blueprint, jsonify, request
from flask_cors import cross_origin, CORS
from bson.json_util import dumps
from app.db import mongo

bp = Blueprint('users', __name__, url_prefix='/users')
CORS(bp)


@bp.route('/', methods=['GET'])
@cross_origin()
def users():
    users = mongo.db.users.find({})
    res = dumps(users)
    return jsonify(res), 200
