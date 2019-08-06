const router = require('express').Router()
const { userController, listController } = require('../../controllers')

router
  .route('/')
  .get(userController.getUsers)
  .post(userController.addUser)

router.route('/verify').get(userController.verifyToken)

router
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)

router.route('/:id/lists').get(listController.getLists)

router.route('/login').post(userController.login)

module.exports = router
