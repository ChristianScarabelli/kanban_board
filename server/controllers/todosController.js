const connection = require('../data/db.js')

// Index
function index(req, res) {
    const sql = `
        SELECT 
            t.id, 
            t.title, 
            t.created_at,
            COALESCE(tasks_json.tasks, '[]') AS tasks
        FROM todos AS t
        LEFT JOIN (
            SELECT 
                ordered_tasks.todo_id,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', ordered_tasks.id,
                        'description', ordered_tasks.description,
                        'priority', ordered_tasks.priority,
                        'completed', ordered_tasks.completed,
                        'added_at', ordered_tasks.added_at
                    )
                ) AS tasks
            FROM (
                SELECT * FROM tasks ORDER BY added_at  
            ) AS ordered_tasks
            GROUP BY ordered_tasks.todo_id
        ) tasks_json ON t.id = tasks_json.todo_id
        ORDER BY t.id;
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            // Converte il JSON in array prima di inviarlo al frontend
            const todos = results.map(todo => ({
                ...todo,
                tasks: JSON.parse(todo.tasks)
            }));
            res.json(todos);
        }
    });
}


// Store
function store(req, res) {
    const { title } = req.body

    // validazione

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

    const sql = `DELETE FROM todos WHERE id = ?`

    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Resource not found' })
        res.sendStatus(204)
    })
}


module.exports = { index, store, update, destroy, }