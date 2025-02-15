const connection = require('../data/db.js')

// Index
function index(req, res) {
    const sql = `SELECT todos.*, tasks.*
                FROM todos
                LEFT JOIN tasks ON todos.id = tasks.todo_id
                ORDER BY todos.id, tasks.added_at ASC`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results)
    })
}

// Store
function store(req, res) {
    const { title } = req.body

    // Validazione
    let error = []

    if (!title || typeof title !== 'string' || title.length > 255) {
        error.push('Title must be a string of max 255 characters')
    }

    if (error.length > 0) {
        return res.status(400).json({ error: error })
    }


    const sql = `INSERT INTO todos (title) VALUES (?)`

    connection.query(sql, [title], (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(201).json({ message: 'Task created successfully' })
    })
}

// Update (modificare il nome colonna)
function update(req, res) {
    const id = req.params.id
    const { title } = req.body


    // Validazione
    let error = []

    if (isNaN(parseInt(id))) {
        error.push('Invalid id')
    }

    if (!title || typeof title !== 'string' || title.length > 255) {
        error.push('Title must be a string of max 255 characters')
    }

    if (error.length > 0) {
        return res.status(400).json({ error: error })
    }

    const sql = `UPDATE todos SET title = ? WHERE id = ?`

    connection.query(sql, [title, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Resource not found' })
        res.status(200).json({ message: 'Task updated successfully' })
    })
}

// Destroy (To Do table)
function destroy(req, res) {
    const id = req.params.id

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' })
    }

    const sql = `DELETE FROM todos WHERE id = ?`

    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Resource not found' })
        res.sendStatus(204)
    })
}


module.exports = { index, store, update, destroy, }