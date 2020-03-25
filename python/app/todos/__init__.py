from flask import Blueprint

bp = Blueprint('todos', __name__, url_prefix='/todos')


@bp.route('/', methods=('GET'))
def todos():
    return 'Getting todos'
