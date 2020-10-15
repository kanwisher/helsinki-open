require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')
const { jwtExtractor } = require('./utils/middleware')
const blogRouter = require('./controller/blog')
const userRouter = require('./controller/user')
const loginRouter = require('./controller/login')
const cors = require('cors')
const mongoose = require('mongoose')
const isTest = process.env.NODE_ENV === 'test'
const mongoUrl = isTest ? process.env.TEST_MONGO_URI : process.env.MONGO_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())
app.use(jwtExtractor)
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use((err, req, res, next) => {
  // logger.error(err.message)
  res.status(err.statusCode).json({ error: err.message })
})

module.exports = app
