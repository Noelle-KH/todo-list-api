const router = require('express').Router()
const userController = require('../../controller/user-controller')
const validator = require('../../middleware/validator')

router.post('/login', userController.loginUser)
router.post('/register', validator, userController.registerUser)

module.exports = router
