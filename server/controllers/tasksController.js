const connection = require('../data/db.js')

// Store
function store(req, res) {
    const { todo_id } = req.params
    const { description, priority, completed } = req.body

    const sql = `INSERT INTO tasks (todo_id, description, priority, completed) VALUES (?, ?, ?, ?)`
    connection.query(sql, [todo_id, description, priority, completed], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(201).json({ message: 'Task added succesfully' })
    })
}

// Update (modificare l'intera risorsa)
function update(req, res) {
    const { todo_id, id } = req.params
    const { description, priority, completed } = req.body

    const sql = `UPDATE tasks SET description = ?, priority = ?, completed = ? WHERE id = ? AND todo_id = ?`
    connection.query(sql, [description, priority, completed, id, todo_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Resource not found' })
        res.status(200).json({ message: 'Task updated successfully' })
    })
}

// Modify (modifiche parziali)
function modify(req, res) {
    const { todo_id, id } = req.params
    const updates = req.body

    const sql = `UPDATE tasks SET ? WHERE id = ? AND todo_id = ?`
    connection.query(sql, [updates, id, todo_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Resource not found' })
        res.status(200).json({ message: 'Task updated successfully' })
    })
}

// Destroy
function destroy(req, res) {
    const { todo_id, id } = req.params

    const sql = `DELETE FROM tasks WHERE id = ? AND todo_id = ?`

    connection.query(sql, [id, todo_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Resource not found' })
        res.sendStatus(204)
    })
}

module.exports = { store, update, modify, destroy }