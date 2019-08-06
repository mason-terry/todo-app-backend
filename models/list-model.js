const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  name: String,
  members: Array,
  owner: { type: Schema.ObjectId, ref: 'User', index: true },
  createdOn: Date,
  updatedOn: Date,
  deletedOn: Date,
  deleted: Boolean
})

const List = mongoose.model('List', ListSchema)
module.exports = List
