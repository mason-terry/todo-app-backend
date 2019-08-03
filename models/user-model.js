const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  lists: Array,
  username: String,
  password: String,
  email: String,
  createdOn: Date,
  updatedOn: Date
})

const User = mongoose.model('User', UserSchema)
module.exports = User
