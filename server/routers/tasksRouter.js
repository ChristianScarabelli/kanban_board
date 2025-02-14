const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasksController.js')

// Store
router.post('/', tasksController.store)

// Update (modificare l'intera risorsa)
router.put('/:id', tasksController.update)

// Modify (modifiche parziali)
router.patch('/:id', tasksController.modify)

// Destroy
router.delete('/:id', tasksController.destroy)

module.exports = router