const router = require('express').Router()
const { userController } = require('../../controllers')

router
  .route('/')
  .get(userController.getUsers)
  .post(userController.addUser)

router.route('/verify').get(userController.verifyToken)

router
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)

router.route('/login').post(userController.login)

module.exports = router
