const express = require('express')
const app = express()
const port = process.env.PORT

// Middleware
const cors = require('cors')
const errorsHandler = require('./middlewares/errorsHandler.js')
const notFound = require('./middlewares/notFound.js')
const trimStrings = require('./middlewares/trimStrings.js')

const todosRouter = require('./routers/todosRouter.js')
const tasksRouter = require('./routers/tasksRouter.js')


// Uso i middlewares generali
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json())
app.use(trimStrings)

// Routes
app.get('/', (req, res) => {
    res.send('Server of my App')
})

// Rotta todos
app.use('/todos', todosRouter, tasksRouter)

app.use(errorsHandler)
app.use(notFound)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})