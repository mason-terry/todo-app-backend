const { TodoModel } = require('../models')
const { verifyToken } = require('../util/token')

module.exports = {
  getTodos: async (req, res) => {
    const token = req.headers.token
    if (!token) {
      console.log('no token')
      return
    }
    const verified = await verifyToken(token)

    if (verified) {
      const todos = await TodoModel.find({ deleted: { $ne: true } })
      res.status(200).send(todos)
    } else {
      res
        .status(403)
        .send({ success: false, message: `I'm sorry, you are not allowed to look at this page...` })
    }
  },
  addTodo: async (req, res) => {
    const item = req.body.item
    const createdOn = new Date()

    const newTodo = await new TodoModel({
      item,
      createdOn
    })

    newTodo.save(error => {
      if (error) res.status(400).send({ success: false, mesage: `Something went wrong: ${error}` })
      res.status(200).send({
        success: true,
        message: 'Todo saved successfully!'
      })
    })
  },
  getTodo: async (req, res) => {
    const id = req.params.id

    const todo = await TodoModel.findById(id)

    res.status(200).send(todo)
  },
  updateTodo: async (req, res) => {
    const id = req.params.id
    const item = req.body.item
    const editedOn = new Date()

    await TodoModel.findByIdAndUpdate(id, {
      item,
      editedOn
    })

    res.status(200).send({
      sucess: true,
      message: 'Todo updated successfully!'
    })
  },
  completeTodo: async (req, res) => {
    const id = req.params.id
    const completedOn = new Date()
    const completed = true

    await TodoModel.findByIdAndUpdate(id, {
      completed,
      completedOn
    })

    res.status(200).send({
      success: true,
      message: 'Todo completed successfully!'
    })
  },
  deleteTodo: async (req, res) => {
    const id = req.params.id
    const deletedOn = new Date()
    const deleted = true

    await TodoModel.findByIdAndUpdate(id, {
      deleted,
      deletedOn
    })

    res.status(200).send({
      success: true,
      message: 'Todo deleted successfully!'
    })
  }
}
