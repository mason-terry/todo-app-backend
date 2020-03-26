from flask import Blueprint, jsonify, request
from bson.json_util import dumps
from app.db import mongo

bp = Blueprint('todos', __name__, url_prefix='/todos')


@bp.route('/', methods=['GET'])
def todos():
    todos = mongo.db.todos.find({})
    res = dumps(todos)
    return jsonify(res), 200
