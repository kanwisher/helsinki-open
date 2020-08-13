const express = require('express')
const app = express()
const router = require('./controller/blog')
const cors = require('cors')
const mongoose = require('mongoose')
const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())
app.use('/api/blog', router)

module.exports = app
