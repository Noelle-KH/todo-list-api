const router = require('express').Router()
const userController = require('../../controller/user-controller')

router.post('/login', userController.loginUser)
router.post('/register', userController.registerUser)

module.exports = router
