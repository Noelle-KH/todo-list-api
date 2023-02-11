const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/user')

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) return next(error)

    if (!user) {
      return next({ status: 400, message: info.message })
    }

    req.login(user, { session: false }, (error) => {
      if (error) return next(error)
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
      return res.status(200).json({
        status: 'Success',
        message: 'Logged in successfully.',
        data: {
          token
        }
      })
    })
  })(req, res, next)
})

router.post('/register', (req, res, next) => {
  const { email, password, confirmPassword } = req.body

  if (!email || !password) {
    return next({ status: 400, message: 'Email and password are required.' })
  }

  if (password.length < 6 || password.length > 20) {
    return next({ status: 400, message: 'Password length should between 6 - 20.' })
  }

  if (password !== confirmPassword) {
    return next({ status: 400, message: 'Password and confirm password not the same.' })
  }

  return User.findOne({ email })
    .then(user => {
      if (user) {
        return next({ status: 400, message: 'User is already exist, please use login feature.' })
      }
      return User.create({ email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) })
        .then((newUser) => res.status(201).json({
          status: 'Success',
          message: 'Registered successfully',
          data: newUser
        }))
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

module.exports = router
