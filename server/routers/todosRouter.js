const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todosController.js')
const tasksController = require('../controllers/tasksController.js')

// To Do
// Index
router.get('/', todosController.index)

// Store
router.post('/', todosController.store)

// Update (modificare l'intera risorsa => title)
router.put('/:id', todosController.update)

// Destroy
router.delete('/:id', todosController.destroy)


// Task annidate per risorsa Taks
// Store
router.post('/:todo_id/tasks', tasksController.store)

// Modify (modifiche parziali task)
router.patch('/:todo_id/tasks/:id', tasksController.modify)

// Destroy task
router.delete('/:todo_id/tasks/:id', tasksController.destroy)

module.exports = router