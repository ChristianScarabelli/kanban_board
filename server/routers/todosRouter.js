const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todosController.js')


// Index
router.get('/', todosController.index)

// Store
router.post('/', todosController.store)

// Update (modificare l'intera risorsa => title)
router.put('/:id', todosController.update)

// Destroy
router.delete('/:id', todosController.destroy)

module.exports = router