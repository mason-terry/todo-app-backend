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

# Fetching users
@app.route('/users')

def fetch_users():
  users = db.users.find({})
  response = dumps(users)
  return response

# Fetching lists
@app.route('/lists')

def fetch_lists():
  lists = db.lists.find({})
  response = dumps(lists)
  return response

# Fetching todos
@app.route('/todos')

def fetch_todos():
  todos = db.todos.find({})
  response = dumps(todos)
  return response

if __name__ == '__main__':
  print('App running')
  app.run()
