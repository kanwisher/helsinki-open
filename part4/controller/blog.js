/* eslint-disable callback-return */
const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

router.post('/', async (req, res, next) => {

  const blog = new Blog(req.body)
  try {
    const result = await blog.save();
    res.status(201).json(result)
  } catch (err) {
    err.statusCode = 400
    next(err)
  }
})

module.exports = router