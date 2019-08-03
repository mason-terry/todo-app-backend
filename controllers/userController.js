const { UserModel } = require('../models')
const { encryptPassword, comparePassword } = require('../util/bcrypt')
const { getToken, verifyToken } = require('../util/token')

module.exports = {
  getUsers: async (req, res) => {
    const users = await UserModel.find({})

    res.status(200).send(users)
  },
  getUser: async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)

    if (!user) {
      res
        .status(400)
        .send({ success: false, message: `We don't seem to have this user in our system...` })
    } else {
      res.status(200).send(user)
    }
  },
  addUser: async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const username = req.body.username
    const password = await encryptPassword(req.body.password)
    const createdOn = new Date()

    const newUser = await new UserModel({
      name,
      email,
      username,
      password,
      createdOn
    })

    newUser.save(error => {
      if (error) res.status(400).send({ sucesss: false, message: `Something went wrong: ${error}` })
      res.status(200).send({
        success: true,
        message: 'User added successfully!'
      })
    })
  },
  updateUser: async (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const email = req.body.email
    const username = req.body.username
    const password = await encryptPassword(req.body.password)
    const updatedOn = new Date()

    await UserModel.findByIdAndUpdate(id, {
      name,
      email,
      username,
      password,
      updatedOn
    })

    res.status(200).send({
      success: true,
      message: 'User updated successfully!'
    })
  },
  login: async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await UserModel.findOne({ username })
    if (!user) {
      console.log('no user found')
      res.status(200).send({
        success: false,
        message: `We couldn't find that usename in our system...`
      })
      return
    }
    const validPassword = await comparePassword(password, user.password)

    if (validPassword) {
      const token = await getToken(user)
      res.status(200).send({
        user: user,
        success: true,
        message: 'User logged in successfully!',
        token
      })
    } else {
      res.status(200).send({
        success: false,
        message: `That doesn't seem to be the correct password...`
      })
    }
  },
  verifyToken: async (req, res) => {
    const token = req.headers.token
    const verified = await verifyToken(token)
    res.status(200).send(verified)
  }
}
