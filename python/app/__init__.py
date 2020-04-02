import os
from app import users, lists, todos, db
from flask_cors import CORS


def create_app(test_config=None):
    # create and configure the app
    # app = Flask(__name__, instance_relative_config=True)
    app = db.app
    CORS(app)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # register blueprints
    app.register_blueprint(users.bp)
    app.register_blueprint(lists.bp)
    app.register_blueprint(todos.bp)

    @app.route('/', methods=['GET'])
    def welcome():
        greeting = 'Welcome to the API'
        return greeting, 200

    return app
