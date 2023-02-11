const router = require('express').Router()
const todoController = require('../../controller/todo-controller')

router.route('/')
  .get(todoController.getAllTodo)
  .post(todoController.addNewTodo)

router.route('/:id')
  .get(todoController.getTodo)
  .put(todoController.updateTodo)
  .delete(todoController.deleteTodo)

module.exports = router
