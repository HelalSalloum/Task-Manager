const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const { connect } = require('mongoose')
require('dotenv').config()
// middleware
app.use(express.static('./public'))
app.use(express.json())
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
// routes

app.use('/api/v1/tasks' , tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port , console.log(`server is listening on port ${port}...`))
    } catch(error) {
        console.log(error)
    }
}

start()
