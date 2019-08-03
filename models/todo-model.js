const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
  item: String,
  list: { type: Schema.ObjectId, ref: 'List', index: true },
  createdOn: Date,
  editedOn: Date,
  completedOn: Date,
  completed: Boolean,
  deletedOn: Date,
  deleted: Boolean,
  user: { type: Schema.ObjectId, ref: 'User', index: true }
})

const Todo = mongoose.model('Todo', TodoSchema)
module.exports = Todo
