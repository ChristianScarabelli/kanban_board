const connection = require('../data/db.js')

// Store
function store(req, res) {
    const { todo_id, title, description, priority, completed } = req.body

    const sql = `INSERT INTO tasks (todo_id, title, description, priority, completed) VALUES (?, ?, ?, ?, ?)`
    connection.query(sql, [todo_id, title, description, priority, completed], (err, results) => {
        if (err) return res.status(500).json({ error: error.message })
        res.status(201).json({ message: 'Task added succesfully' })
    })
}

// Update (modificare l'intera risorsa)
function update(req, res) {
    const { id } = req.params
    const { title, description, priority, completed } = req.body

    const sql = `UPDATE tasks SET title = ?, description = ?, priority = ?, completed = ? WHERE id = ?`
    connection.query(sql, [title, description, priority, completed, id], (err, results) => {
        if (err) return res.status(500).json({ error: error.message })
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Resource not found' })
        res.status(200).json({ message: 'Task updated successfully' })
    })
}

// Modify (modifiche parziali)
function modify(req, res) {
    const { id } = req.params
    const updates = req.body

    const sql = `UPDATE tasks SET ? WHERE id = ?`
    connection.query(sql, [updates, id], (err, results) => {
        if (err) return res.status(500).json({ error: error.message })
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Resource not found' })
        res.status(200).json({ message: 'Task updated successfully' })
    })
}

// Destroy
function destroy(req, res) {
    const { id } = req.params

    const sql = `DELETE FROM tasks WHERE id = ?`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: error.message })
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Resource not found' })
        res.sendStatus(204)
    })
}

module.exports = { store, update, modify, destroy }