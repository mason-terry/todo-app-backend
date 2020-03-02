from flask import Flask
from bson import ObjectId
from bson.json_util import dumps
from pymongo import MongoClient
import os

app = Flask(__name__)
title = 'Todo app with Flask and MongoDB'
heading = 'Todo app with Flask and MongoDB'

# Set up MongoDB connection
client = MongoClient('mongodb://127.0.0.1:27017')
db = client.todo

# API welcome
@app.route('/')

def welcome():
  return 'Welcome to our Todo API!'

''' USERS '''
@app.route('/users')

def fetch_users():
  users = db.users.find({})
  response = dumps(users)
  return response

@app.route('/users/create', methods=['POST'])

def create_user():
  return 'creating user'

@app.route('/users/update/<user>', methods=['PUT'])

def update_user():
  return 'updating user'


''' LISTS '''
@app.route('/lists')

def fetch_lists():
  lists = db.lists.find({})
  response = dumps(lists)
  return response

@app.route('/lists/create', methods=['POST'])

def create_list():
  return 'creating list'

@app.route('/lists/update/<list>', methods=['PUT'])

def update_list():
  return 'updating list'

''' TODOS '''
@app.route('/todos')

def fetch_todos():
  todos = db.todos.find({})
  response = dumps(todos)
  return response

@app.route('/todos/create', methods=['POST'])

def create_todo():
  return 'creating todo'

@app.route('/todos/update/<todo>', methods=['PUT'])

def update_todo():
  return 'updating todo'

if __name__ == '__main__':
  print('App running')
  app.run()
