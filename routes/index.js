const router = require('express').Router()
const users = require('./modules/users')
const todos = require('./modules/todos')
const { authenticate } = require('../middleware/auth')

router.use('/api/todos', authenticate, todos)
router.use('/api/users', users)

module.exports = router
