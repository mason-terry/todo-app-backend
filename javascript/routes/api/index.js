const router = require('express').Router()
const todoRoutes = require('./todoRoutes')
const userRoutes = require('./userRoutes')
const listRoutes = require('./listRoutes')

router.use('/todos', todoRoutes)

router.use('/users', userRoutes)

router.use('/lists', listRoutes)

module.exports = router
