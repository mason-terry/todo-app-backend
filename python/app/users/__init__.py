from flask import Blueprint

bp = Blueprint('users', __name__, url_prefix='/users')


@bp.route('/', methods=('GET'))
def users():
    return 'Getting users'
