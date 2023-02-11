const router = require('express').Router()
const users = require('./modules/users')
const todos = require('./modules/todos')
const { authenticate } = require('../middleware/auth')
const { errorHandler } = require('../middleware/error-handler')

router.use('/api/todos', authenticate, todos)
router.use('/api/users', users)
router.use(errorHandler)

module.exports = router
