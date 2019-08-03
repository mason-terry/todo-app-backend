const router = require('express').Router()
const { listController } = require('../../controllers')

router
  .route('/')
  .get(listController.getLists)
  .post(listController.addList)

router.route('/:id').post(listController.getUserLists)

module.exports = router
