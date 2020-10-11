require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')
const blogRouter = require('./controller/blog')
const userRouter = require('./controller/user')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const isTest = process.env.NODE_ENV === 'test'
const mongoUrl = isTest ? process.env.TEST_MONGO_URI : process.env.MONGO_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)
app.use((err, req, res, next) => {
  // logger.error(err.message)
  res.status(err.statusCode).json({ error: err.message })
})

module.exports = app
