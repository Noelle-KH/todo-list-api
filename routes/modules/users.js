const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../../models/user')


router.post('/register', (req, res) => {
  const { email, password, confirmPassword } = req.body
  if (!email || !password) return res.status(400).json({
    status: 'Error',
    message: 'Email和密碼都是必填'
  })

  if (password.length < 6 || password.length > 20) return res.status(400).json({
    status: 'Error',
    message: '密碼長度需要介於 6 - 20 位'
  })

  if (password !== confirmPassword) return res.status(400).json({
    status: 'Error',
    message: '密碼和確認密碼不相符'
  })

  return User.create({ email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) })
    .then((newUser) => res.status(201).json({
      status: 'Success',
      message: '註冊會員成功',
      data: newUser
    }))
    .catch(error => res.status(500).json({
      status: 'Error',
      message: error.message
    }))
})

module.exports = router
