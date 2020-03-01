const router = require('express').Router()
const { todoController } = require('../../controllers')

router
  .route('/')
  .get(todoController.getTodos)
  .post(todoController.addTodo)

router
  .route('/:id')
  .get(todoController.getTodo)
  .put(todoController.updateTodo)

router.route('/:id/complete').put(todoController.completeTodo)

router.route('/:id/delete').put(todoController.deleteTodo)

module.exports = router
