const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  name: String,
  items: Array,
  members: Array,
  owner: { name: String, id: String },
  createdOn: Date,
  deletedOn: Date,
  deleted: Boolean
})

const List = mongoose.model('List', ListSchema)
module.exports = List
