require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./controller/blog')
const cors = require('cors')
const mongoose = require('mongoose')
const isTest = process.env.NODE_ENV === 'test'
const mongoUrl = isTest ? process.env.TEST_MONGO_URI : process.env.MONGO_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())
app.use('/api/blog', router)

module.exports = app
