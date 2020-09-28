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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndRemove(id)
  res.sendStatus(204)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const blog = req.body

  await Blog.findByIdAndUpdate(id, blog)
  res.sendStatus(204)
})
module.exports = router