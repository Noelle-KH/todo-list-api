const router = require('express').Router()
const Todo = require('../../models/todo')

router.route('/')
  .get((req, res) => {
    const userId = req.user._id
    return Todo.find({ userId })
      .then(todos => {
        if (!todos) return res.sendStatus(204)
        res.json({
          status: 'Success',
          data: todos
        })
      })
      .catch(error => res.status(500).json({
        status: 'Error',
        message: error.message
      }))
  })
  .post((req, res) => {
    const userId = req.user._id
    const name = req.body.name
    return Todo.create({ name, userId })
      .then(newTodo => res.status(201).json({
        status: 'Success',
        data: newTodo
      }))
      .catch(error => res.status(500).json({
        status: 'Error',
        message: error.message
      }))
  })

router.route('/:id')
  .get((req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Todo.findOne({ _id, userId })
      .then(todo => {
        if (!todo) return res.status(400).json({
          status: 'Error',
          message: 'Todo not found'
        })
        res.json({
          status: 'Success',
          data: todo
        })
      })
      .catch(error => res.status(500).json({
        status: 'Error',
        message: error.message
      }))
  })
  .put((req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const name = req.body.name
    return Todo.findOne({ _id, userId })
      .then(todo => {
        if (!todo) return res.status(400).json({
          status: 'Error',
          message: 'Todo not found'
        })
        todo.name = name
        todo.save()
        res.json({
          status: 'Success',
          data: todo
        })
      })
      .catch(error => {
        res.json({
          status: 'Error',
          message: error.message
        })
      })
  })
  .delete((req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Todo.findOne({ _id, userId })
      .then(todo => {
        if (!todo) return res.status(400).json({
          status: 'Error',
          message: 'Todo not found'
        })
        todo.remove()
        res.json({
          status: 'Success',
          data: todo
        })
      })
      .catch(error => res.json({
        status: 'Error',
        message: error.message
      }))
  })
module.exports = router