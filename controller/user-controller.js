const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const User = require('../models/user')

const userController = {
  loginUser: (req, res, next) => {
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
  },
  registerUser: (req, res, next) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    const message = errors.array().map(error => error.msg)
    if (!errors.isEmpty()) {
      return next({ status: 400, message })
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
  }
}

module.exports = userController
