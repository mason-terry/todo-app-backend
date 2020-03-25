from flask import Blueprint

bp = Blueprint('lists', __name__, url_prefix='/lists')


@bp.route('/', methods=('GET'))
def todos():
    return 'Getting lists'
