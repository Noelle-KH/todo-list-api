const Todo = require('../models/todo')

const todoController = {
  getAllTodo: (req, res, next) => {
    const userId = req.user._id
    return Todo.find({ userId })
      .then(todos => {
        if (!todos) return next({ status: 404, message: 'Todo Not found' })
        res.json({
          status: 'Success',
          data: todos
        })
      })
      .catch(error => next(error))
  },
  getTodo: (req, res, next) => {
    const userId = req.user._id
    const _id = req.params.id
    return Todo.findOne({ _id, userId })
      .then(todo => {
        if (!todo) return next({ status: 404, message: 'Todo Not found' })
        res.json({
          status: 'Success',
          data: todo
        })
      })
      .catch(error => next(error))
  },
  addNewTodo: (req, res, next) => {
    const userId = req.user._id
    const name = req.body.name
    return Todo.create({ name, userId })
      .then(newTodo => res.status(201).json({
        status: 'Success',
        data: newTodo
      }))
      .catch(error => next(error))
  },
  updateTodo: (req, res, next) => {
    const userId = req.user._id
    const _id = req.params.id
    const name = req.body.name
    return Todo.findOne({ _id, userId })
      .then(todo => {
        if (!todo) return next({ status: 404, message: 'Todo Not found' })
        todo.name = name
        todo.save()
        res.json({
          status: 'Success',
          data: todo
        })
      })
      .catch(error => next(error))
  },
  deleteTodo: (req, res, next) => {
    const userId = req.user._id
    const _id = req.params.id
    return Todo.findOne({ _id, userId })
      .then(todo => {
        if (!todo) return next({ status: 404, message: 'Todo Not found' })
        todo.remove()
        res.json({
          status: 'Success',
          data: todo
        })
      })
      .catch(error => next(error))
  }
}

module.exports = todoController
