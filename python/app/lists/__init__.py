from flask import Blueprint, request
from bson.json_util import dumps
from app.db import mongo

bp = Blueprint('lists', __name__, url_prefix='/lists')


@bp.route('/', methods=['GET'])
def lists():
    lists = mongo.db.lists.find({})
    res = dumps(lists)
    return res, 200
