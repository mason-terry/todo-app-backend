const router = require('express').Router()
const { listController, todoController } = require('../../controllers')

router
  .route('/')
  .get(listController.getLists)
  .post(listController.addList)

router
  .route('/:id')
   .get(listController.getList)
   .post(listController.deleteList)

router.route('/:id/todos').get(todoController.getTodos)

module.exports = router
